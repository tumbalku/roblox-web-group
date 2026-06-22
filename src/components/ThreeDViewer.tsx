"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { Loader2, AlertCircle, RotateCcw } from "lucide-react";

interface ThreeDViewerProps {
  userId: number;
}

export default function ThreeDViewer({ userId }: ThreeDViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const isIdleRef = useRef<boolean>(true);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingStatus, setLoadingStatus] = useState<string>("Inisialisasi renderer...");
  const [error, setError] = useState<string | null>(null);

  // Helper to parse the base path from the MTL url to bypass CORS for textures
  const getResourcePath = (mtlProxyUrl: string) => {
    try {
      const urlParam = new URL(window.location.origin + mtlProxyUrl).searchParams.get("url");
      if (urlParam) {
        const originalUrl = new URL(urlParam);
        const basePath = `${originalUrl.protocol}//${originalUrl.hostname}/`;
        return `/api/roblox/proxy?url=${encodeURIComponent(basePath)}`;
      }
    } catch (e) {
      console.error("Error parsing MTL URL for resource path", e);
    }
    return "/api/roblox/proxy?url=https%3A%2F%2Ft6.rbxcdn.com%2F";
  };

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let animationFrameId: number;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 450;

    // 1. Setup Scene
    scene = new THREE.Scene();
    scene.background = null; // Transparent background to show CSS gradient

    // 2. Setup Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 10);

    // 3. Setup Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // 4. Setup Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't go too far below ground

    // Reset idle timer on user interaction
    const handleUserInteraction = () => {
      isIdleRef.current = false;
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        isIdleRef.current = true;
      }, 3000);
    };

    controls.addEventListener("change", handleUserInteraction);

    // 5. Setup Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(5, 10, 7);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xaaccff, 0.4);
    dirLight2.position.set(-5, 5, -5);
    scene.add(dirLight2);

    // 6. Setup Floor Grid (Playful circular grid)
    const gridHelper = new THREE.GridHelper(10, 10, 0xffa07a, 0xffe4e1);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // 7. Load Roblox 3D Model
    let isMounted = true;
    let pollInterval: NodeJS.Timeout;

    const fetch3DModel = async () => {
      try {
        setLoadingStatus("Menghubungi Roblox API...");
        const response = await fetch(`/api/roblox/avatar-3d?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error("Gagal mengambil data model 3D.");
        }

        const data = await response.json();

        if (data.state === "Pending") {
          setLoadingStatus("Sedang merender model di server Roblox...");
          pollInterval = setTimeout(fetch3DModel, 2000);
          return;
        }

        if (data.state === "Failed" || !data.obj || !data.mtl) {
          throw new Error("Roblox gagal merender model 3D.");
        }

        if (!isMounted) return;

        setLoadingStatus("Mengunduh model dan tekstur...");

        // Load material (.mtl) first
        const mtlLoader = new MTLLoader();
        mtlLoader.setResourcePath(getResourcePath(data.mtl));

        mtlLoader.load(
          data.mtl,
          (materials) => {
            if (!isMounted) return;
            materials.preload();

            // Load model (.obj) with materials applied
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.load(
              data.obj,
              (object) => {
                if (!isMounted) return;

                // Center object and place it on the grid
                const box = new THREE.Box3().setFromObject(object);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                object.position.x += -center.x;
                object.position.y += -box.min.y; // feet on the grid (y = 0)
                object.position.z += -center.z;

                scene.add(object);
                modelRef.current = object;

                // Frame camera around the model
                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.35;
                
                camera.position.set(0, size.y * 0.6, cameraZ);
                camera.lookAt(0, size.y * 0.5, 0);
                controls.target.set(0, size.y * 0.5, 0);
                controls.update();

                setLoading(false);
              },
              (xhr) => {
                if (xhr.total > 0) {
                  const percent = Math.round((xhr.loaded / xhr.total) * 100);
                  setLoadingStatus(`Mengunduh model: ${percent}%`);
                }
              },
              (err) => {
                console.error("Error loading OBJ file:", err);
                setError("Gagal merender struktur model 3D.");
                setLoading(false);
              }
            );
          },
          (xhr) => {
            if (xhr.total > 0) {
              const percent = Math.round((xhr.loaded / xhr.total) * 100);
              setLoadingStatus(`Mengunduh material: ${percent}%`);
            }
          },
          (err) => {
            console.error("Error loading MTL file:", err);
            setError("Gagal mengunduh material pakaian dan tekstur.");
            setLoading(false);
          }
        );
      } catch (err: any) {
        console.error("Fetch model error:", err);
        setError(err.message || "Gagal menghubungkan ke server.");
        setLoading(false);
      }
    };

    fetch3DModel();

    // 8. Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (modelRef.current && isIdleRef.current) {
        // Slow playful rotation when idle
        modelRef.current.rotation.y += 0.006;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      controls.removeEventListener("change", handleUserInteraction);
      cancelAnimationFrame(animationFrameId);
      if (pollInterval) clearTimeout(pollInterval);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      
      // Dispose materials & geometries
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose());
        } else {
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [userId]);

  const handleResetCamera = () => {
    isIdleRef.current = true;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] rounded-2xl overflow-hidden bg-slate-950/20 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-inner"
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center gap-3 backdrop-blur-sm z-10 text-white">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
          <p className="text-sm font-medium tracking-wide text-orange-100">{loadingStatus}</p>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center p-6 text-center gap-3 z-10 text-white">
          <AlertCircle className="w-12 h-12 text-rose-500 animate-bounce" />
          <h4 className="font-bold text-lg text-rose-300">Gagal Memuat Avatar 3D</h4>
          <p className="text-sm text-slate-300 max-w-xs">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-xs font-semibold rounded-full shadow-md"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Control overlay hint */}
      {!loading && !error && (
        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md border border-white/5 px-3 py-1.5 rounded-full flex gap-4 items-center shadow-lg text-[10px] text-slate-300 pointer-events-none select-none z-10">
          <span>🖱️ Drag untuk memutar</span>
          <span>📜 Scroll untuk zoom</span>
        </div>
      )}

      {/* Auto-rotate enable/reset button */}
      {!loading && !error && (
        <button
          onClick={handleResetCamera}
          className="absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all z-10"
          title="Aktifkan Putar Otomatis"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
