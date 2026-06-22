"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Trash2, LayoutGrid, Shuffle } from "lucide-react";

interface GardenItem {
  id: number;
  emoji: string;
  x: number; // percentage
  y: number; // percentage
  rotation: number;
  scale: number;
}

const ROBLOX_ITEMS = ["🍎", "🍇", "⚔️", "🛡️", "🛏️", "👑", "💎", "⭐", "🦖", "🎮"];

export default function RobloxGarden() {
  const [items, setItems] = useState<GardenItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click on canvas to spawn item
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid spawning items if clicking on control buttons
    if ((e.target as HTMLElement).closest(".control-btn")) return;

    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Pick random item
    const randomEmoji = ROBLOX_ITEMS[Math.floor(Math.random() * ROBLOX_ITEMS.length)];
    const randomRotation = Math.floor(Math.random() * 60) - 30; // -30 to 30 deg
    const randomScale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2

    const newItem: GardenItem = {
      id: Date.now() + Math.random(),
      emoji: randomEmoji,
      x,
      y,
      rotation: randomRotation,
      scale: randomScale,
    };

    setItems((prev) => [...prev, newItem]);
  };

  // Scatter all items randomly
  const handleScatter = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        x: Math.random() * 85 + 5, // keep inside borders
        y: Math.random() * 75 + 10,
        rotation: Math.floor(Math.random() * 360),
      }))
    );
  };

  // Tidy up all items into a nice grid
  const handleTidy = () => {
    if (items.length === 0) return;

    // Grid details
    const cols = Math.ceil(Math.sqrt(items.length));
    const rows = Math.ceil(items.length / cols);
    const colStep = 90 / (cols + 1);
    const rowStep = 80 / (rows + 1);

    setItems((prev) =>
      prev.map((item, index) => {
        const col = (index % cols) + 1;
        const row = Math.floor(index / cols) + 1;
        return {
          ...item,
          x: 5 + col * colStep,
          y: 10 + row * rowStep,
          rotation: 0,
        };
      })
    );
  };

  // Clear garden
  const handleClear = () => {
    setItems([]);
  };

  return (
    <div className="w-full flex flex-col h-[380px] bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-inner relative">
      {/* Canvas Area */}
      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        className="flex-1 w-full relative cursor-crosshair overflow-hidden select-none"
        style={{
          backgroundImage: "radial-gradient(#d4cbb8 0.5px, transparent 0.5px)",
          backgroundSize: "16px 16px",
        }}
      >
        {items.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-stone-400 dark:text-stone-600 p-6 text-center">
            <Sparkles className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-xs font-semibold uppercase tracking-wider">Taman Mabar BGST</p>
            <p className="text-[10px] mt-1 font-medium max-w-[240px]">
              Klik di mana saja di dalam kotak ini untuk menanam item mabar Roblox (Buah, Senjata, Kasur, Diamond)
            </p>
          </div>
        )}

        {/* Garden items */}
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: item.scale,
              opacity: 1,
              x: `${item.x}%`,
              y: `${item.y}%`,
              rotate: item.rotation,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
            }}
            className="absolute -ml-4 -mt-4 text-3xl pointer-events-none"
            style={{
              left: 0,
              top: 0,
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* Control bar */}
      <div className="px-4 py-2 bg-stone-100 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-850 flex items-center justify-between z-10">
        <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          Jumlah Item: {items.length}
        </span>
        <div className="flex gap-2">
          {items.length > 0 && (
            <>
              <button
                onClick={handleScatter}
                className="control-btn h-7 px-2.5 rounded bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-800 text-[10px] font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1 shadow-sm hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
                title="Hamburkan Item"
              >
                <Shuffle className="w-3.5 h-3.5" />
                Hamburkan
              </button>
              <button
                onClick={handleTidy}
                className="control-btn h-7 px-2.5 rounded bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-800 text-[10px] font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1 shadow-sm hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
                title="Rapikan Item"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Rapikan
              </button>
              <button
                onClick={handleClear}
                className="control-btn h-7 px-2.5 rounded bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-[10px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 shadow-sm hover:bg-rose-100/55 active:scale-95 transition-all cursor-pointer"
                title="Bersihkan Semua"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
