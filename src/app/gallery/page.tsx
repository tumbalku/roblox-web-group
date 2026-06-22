"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Volume2, VolumeX, HelpCircle, X, Sparkles, Move } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CanvasItem {
  id: number;
  type: "photo" | "quote" | "text" | "stats";
  title: string;
  date?: string;
  game?: string;
  imageSrc?: string;
  content?: string;
  x: number; // pixel X coordinate on canvas
  y: number; // pixel Y coordinate on canvas
  rotation: number; // rotation in degrees
}

export default function GalleryPage() {
  // Canvas offsets
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<CanvasItem | null>(null);

  // Drag state trackers
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const dragDistance = useRef(0); // to distinguish click vs drag

  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Scattered elements across the 2D plane
  const canvasItems: CanvasItem[] = [
    {
      id: 1,
      type: "photo",
      title: "Kumpul Pertama di Lobi Mabar",
      date: "20 Juni 2026",
      game: "Roblox Lobby",
      imageSrc: "/roblox_group_hangout.png",
      content: "Momen kebersamaan pertama kali saat berkumpul merancang taktik mabar clan BGST.",
      x: 0,
      y: 0,
      rotation: 2
    },
    {
      id: 2,
      type: "quote",
      title: "Kutipan Terpelajar",
      content: '"Main Roblox itu bukan soal menang atau kalah, tapi seberapa keras kita tertawa saat kasur BedWars dihancurkan di menit ke-3." — BGST Owner',
      x: -450,
      y: -250,
      rotation: -4
    },
    {
      id: 3,
      type: "photo",
      title: "Kemenangan Sengit BedWars",
      date: "15 Juni 2026",
      game: "BedWars",
      imageSrc: "/roblox_bedwars_battle.png",
      content: "Kerja sama tim luar biasa di detik-detik terakhir hingga merebut kemenangan beruntun melawan pro player.",
      x: 500,
      y: -200,
      rotation: -3
    },
    {
      id: 4,
      type: "stats",
      title: "Statistik Mabar",
      content: "🍎 Fruits Eaten: 420+\n⚔️ Swords Swung: 9999+\n🛏️ Beds Broken: 87\n🎮 Toxic Players Defeated: All of them",
      x: -350,
      y: 300,
      rotation: 3
    },
    {
      id: 5,
      type: "photo",
      title: "Menaklukkan Sea Beast",
      date: "10 Juni 2026",
      game: "Blox Fruits",
      imageSrc: "/roblox_blox_fruits.png",
      content: "Bahu-membahu menumbangkan bos laut besar demi mencari buah iblis legendaris untuk clan.",
      x: 400,
      y: 350,
      rotation: 4
    },
    {
      id: 6,
      type: "text",
      title: "Visi Kami",
      content: "BGST didirikan bukan untuk menjadi clan Roblox terbesar, tapi kelompok bermain paling akrab. 7 anggota, 1 misi: bersenang-senang tanpa toxic.",
      x: 100,
      y: -400,
      rotation: 1
    },
    {
      id: 7,
      type: "quote",
      title: "Sea Beast Mystery",
      content: '"Kemarin siapa yang diam-diam ngambil buah iblis merah pas semuanya lagi sibuk pvp sama bos?" — Head Developer',
      x: -850,
      y: 50,
      rotation: -5
    },
    {
      id: 8,
      type: "photo",
      title: "Taktik BedWars Berjalan Mulus",
      date: "18 Juni 2026",
      game: "BedWars",
      imageSrc: "/roblox_bedwars_battle.png",
      content: "Satu menjaga kasur, dua menyerang lurus, satu memutar dari atas awan. Kemenangan mutlak terpelajar.",
      x: -800,
      y: -350,
      rotation: 6
    },
    {
      id: 9,
      type: "stats",
      title: "Log Clan 2026",
      content: "• Didirikan: Awal 2024\n• Anggota: 7 Teman Dekat\n• Toxic level: 0%\n• Jam Mabar Favorit: 20.00 - Lelah",
      x: 950,
      y: 80,
      rotation: -2
    }
  ];

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent dragging if clicking button/modal
    if ((e.target as HTMLElement).closest(".ui-overlay") || (e.target as HTMLElement).closest(".modal-container")) return;

    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { x: pan.x, y: pan.y };
    dragDistance.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    
    dragDistance.current += Math.sqrt(dx * dx + dy * dy);

    setPan({
      x: panStart.current.x + dx,
      y: panStart.current.y + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers (Mobile compatibility)
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest(".ui-overlay") || (e.target as HTMLElement).closest(".modal-container")) return;

    setIsDragging(true);
    const touch = e.touches[0];
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    panStart.current = { x: pan.x, y: pan.y };
    dragDistance.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.x;
    const dy = touch.clientY - dragStart.current.y;

    dragDistance.current += Math.sqrt(dx * dx + dy * dy);

    setPan({
      x: panStart.current.x + dx,
      y: panStart.current.y + dy
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Click handler for items (only triggers if drag distance is small)
  const handleItemClick = (item: CanvasItem) => {
    if (dragDistance.current < 8) {
      if (item.type === "photo") {
        setSelectedPhoto(item);
      }
    }
  };

  // Audio Play/Pause Toggle
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.play().catch(err => console.log("Audio play blocked: ", err));
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  // Center canvas on page load
  useEffect(() => {
    setPan({ x: 0, y: 0 });

    // Audio auto load
    const audio = new Audio("https://assets.mixkit.co/music/preview/mixkit-retro-gaming-landscape-1383.mp3");
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  return (
    <div 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`fixed inset-0 bg-stone-950 text-stone-200 select-none overflow-hidden paper-grain canvas-grid-bg ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      
      {/* Dynamic 2D Drag-and-Pan Canvas Wrapper */}
      <div 
        className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
          !isDragging ? "canvas-smooth-drag" : ""
        }`}
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`
        }}
      >
        
        {/* Origin point marker (subtle pixel dot) */}
        <div className="absolute w-2 h-2 rounded-full bg-orange-500/10 pointer-events-none" />

        {/* Scattered items */}
        {canvasItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="absolute pointer-events-auto cursor-pointer group select-none"
            style={{
              transform: `translate3d(${item.x}px, ${item.y}px, 0) rotate(${item.rotation}deg)`,
              willChange: "transform"
            }}
          >
            
            {/* TYPE: PHOTO (Polaroid Card) */}
            {item.type === "photo" && (
              <div className="bg-white border border-stone-200/90 rounded p-3 shadow-2xl w-52 transition-transform duration-300 hover:scale-105 hover:rotate-0 hover:z-30">
                <div className="w-full h-36 relative bg-stone-900 overflow-hidden">
                  <Image
                    src={item.imageSrc || ""}
                    alt={item.title}
                    fill
                    sizes="200px"
                    className="object-cover pointer-events-none"
                  />
                </div>
                <div className="pt-3 pb-1 select-none">
                  <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest block">
                    {item.game}
                  </span>
                  <h4 className="font-serif text-[11px] font-bold text-stone-900 leading-snug line-clamp-1 mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-[8px] font-bold text-stone-400 mt-1 uppercase">
                    {item.date}
                  </p>
                </div>
              </div>
            )}

            {/* TYPE: QUOTE (Serif Minimal Card) */}
            {item.type === "quote" && (
              <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 shadow-xl w-64 transition-transform duration-300 hover:scale-105 hover:rotate-0 hover:z-30">
                <p className="font-serif text-stone-300 text-xs italic leading-relaxed text-center">
                  {item.content}
                </p>
                <div className="text-[8px] font-black text-center text-orange-500 uppercase tracking-widest mt-3">
                  {item.title}
                </div>
              </div>
            )}

            {/* TYPE: STATS (Terminal Output Card) */}
            {item.type === "stats" && (
              <div className="bg-stone-950 border border-stone-850 rounded-xl p-4 shadow-xl w-56 font-mono text-[10px] text-stone-400 transition-transform duration-300 hover:scale-105 hover:rotate-0 hover:z-30">
                <div className="flex justify-between items-center border-b border-stone-850 pb-2 mb-2">
                  <span className="text-orange-500 font-bold uppercase tracking-wider text-[8px]">
                    SYSTEM STATS
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  </div>
                </div>
                <pre className="whitespace-pre-line leading-relaxed font-semibold">
                  {item.content}
                </pre>
              </div>
            )}

            {/* TYPE: TEXT (General Info Card) */}
            {item.type === "text" && (
              <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 shadow-xl w-60 transition-transform duration-300 hover:scale-105 hover:rotate-0 hover:z-30">
                <h4 className="font-bold text-[10px] text-orange-500 uppercase tracking-widest mb-1.5 text-center">
                  {item.title}
                </h4>
                <p className="text-[10px] text-stone-405 font-medium leading-relaxed text-center">
                  {item.content}
                </p>
              </div>
            )}

          </div>
        ))}

      </div>

      {/* Persistent UI Overlays (Fixed in Viewport) */}
      <div className="ui-overlay absolute inset-x-0 top-0 p-6 flex justify-between items-center pointer-events-none z-40">
        
        {/* Back Link Button */}
        <Link 
          href="/" 
          className="pointer-events-auto flex items-center gap-1.5 text-[10px] font-bold text-stone-400 hover:text-orange-500 uppercase tracking-widest transition-colors select-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Beranda
        </Link>

        {/* Title / Info Toggle Button */}
        <button
          onClick={() => setShowInfo(true)}
          className="pointer-events-auto h-8 px-4 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/30 hover:bg-stone-900 text-[10px] font-black uppercase text-stone-300 hover:text-orange-500 tracking-wider flex items-center gap-1 shadow-sm transition-all select-none cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Tentang Memori
        </button>

        {/* Ambient Sound Controller */}
        <button
          onClick={toggleMute}
          className="pointer-events-auto h-8 w-8 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/30 hover:bg-stone-900 text-stone-300 hover:text-orange-500 flex items-center justify-center transition-all select-none cursor-pointer shadow-sm"
          title={isMuted ? "Play Music" : "Mute Music"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
        </button>

      </div>

      {/* Bottom Hint Banner */}
      <div className="ui-overlay absolute bottom-6 inset-x-0 flex flex-col items-center pointer-events-none select-none z-40">
        <div className="px-4 py-2 rounded-full bg-stone-900/80 border border-stone-850 backdrop-blur flex items-center gap-2 text-stone-400 shadow-xl pointer-events-auto">
          <Move className="w-3.5 h-3.5 text-orange-500" />
          <span className="text-[9px] font-bold uppercase tracking-widest">
            Klik-Tahan & Geser untuk Menjelajah Memori
          </span>
        </div>
      </div>

      {/* Side Brand watermark */}
      <div className="absolute bottom-6 right-6 select-none opacity-40 font-mono text-[9px] font-bold tracking-[0.25em] uppercase pointer-events-none">
        BGST™ GALLERY
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL (For Photos) */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-sm modal-container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 cursor-zoom-out"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden w-full max-w-2xl shadow-2xl relative z-10 flex flex-col md:flex-row"
            >
              
              {/* Close light box button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 bg-stone-950/80 hover:bg-rose-500 hover:text-white p-1.5 rounded-full transition-all text-stone-400 z-20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* High resolution photo */}
              <div className="w-full md:w-3/5 h-64 md:h-[350px] relative bg-stone-950 select-none">
                <Image
                  src={selectedPhoto.imageSrc || ""}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Description side panel */}
              <div className="w-full md:w-2/5 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 items-center text-[8px] font-black text-orange-500 uppercase tracking-widest select-none">
                    <Sparkles className="w-3 h-3" />
                    {selectedPhoto.game}
                  </div>
                  
                  <h3 className="text-base font-serif font-bold text-white mt-2 leading-snug">
                    {selectedPhoto.title}
                  </h3>
                  
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1 select-none">
                    {selectedPhoto.date}
                  </p>

                  <p className="text-xs text-stone-400 leading-relaxed font-semibold mt-4">
                    {selectedPhoto.content}
                  </p>
                </div>

                <div className="text-[8px] font-bold text-stone-500 uppercase tracking-wider pt-6 select-none">
                  Memori Mabar BGST
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ABOUT / MEMORY fullscreen overlay (Info Triggered) */}
      <AnimatePresence>
        {showInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-950/95 backdrop-blur-md modal-container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInfo(false)}
              className="absolute inset-0 cursor-zoom-out"
            />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="relative max-w-md w-full text-center z-10 select-text px-4"
            >
              {/* Close info button */}
              <button
                onClick={() => setShowInfo(false)}
                className="absolute top-[-30px] right-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-serif font-black tracking-tight text-white mb-6">
                Tentang Album Galeri
              </h2>

              <p className="text-xs md:text-sm text-stone-400 leading-relaxed font-semibold mb-6">
                Album ini didedikasikan untuk mendokumentasikan memori mabar clan BGST sejak awal didirikan pada tahun 2024.
              </p>

              <p className="text-xs md:text-sm text-stone-400 leading-relaxed font-semibold mb-8">
                Tarik halaman kanvas ke segala arah untuk menavigasi tumpukan memori, membaca catatan mabar, atau melihat statistik lucu yang terjadi selama petualangan kami di Roblox.
              </p>

              <div className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] select-none border-t border-stone-850 pt-6">
                BGST • Bagus, Sopan, Terpelajar
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
