"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Gamepad2, Calendar, Sparkles } from "lucide-react";

export default function GalleryPage() {
  const screenshotHistory = [
    {
      title: "Kumpul Pertama di Lobi Mabar",
      date: "20 Juni 2026",
      game: "Roblox Lobby",
      imageSrc: "/roblox_group_hangout.png",
      description: "Momen kebersamaan pertama kali saat berkumpul merancang taktik mabar clan BGST."
    },
    {
      title: "Kemenangan Sengit BedWars",
      date: "15 Juni 2026",
      game: "BedWars",
      imageSrc: "/roblox_bedwars_battle.png",
      description: "Kerja sama tim yang luar biasa di detik-detik terakhir hingga merebut kemenangan beruntun."
    },
    {
      title: "Menaklukkan Sea Beast Blox Fruits",
      date: "10 Juni 2026",
      game: "Blox Fruits",
      imageSrc: "/roblox_blox_fruits.png",
      description: "Bahu-membahu menumbangkan bos laut besar untuk mencari buah iblis legendaris."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/40 px-6 py-4 flex items-center justify-between select-none">
        <Link href="/" className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-250 hover:text-orange-500 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Beranda
        </Link>
        <span className="text-sm font-black bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent uppercase">
          Dokumentasi Mabar
        </span>
        <div className="w-12 h-4" /> {/* Spacer to align title centered */}
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl mx-auto py-12 px-6 w-full">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 dark:bg-orange-400/10 border border-orange-500/20 dark:border-orange-400/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3 text-orange-500" />
            Gameplay History
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
            Foto Sejarah Mabar
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium leading-relaxed max-w-md mx-auto">
            Album kenangan dokumentasi mabar sederhana kelompok bermain kami. Setiap gambar menceritakan keseruan petualangan bersama.
          </p>
        </div>

        {/* Gallery List (Clean vertical scrapbook or card list) */}
        <div className="space-y-8">
          {screenshotHistory.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/40 dark:border-slate-800/40 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row hover:shadow-md transition-all duration-300"
            >
              
              {/* Image Frame */}
              <div className="w-full md:w-1/2 h-56 md:h-64 relative bg-slate-900/10 overflow-hidden">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover hover:scale-[1.02] transition-transform duration-500 select-none"
                  priority={index === 0}
                />
              </div>

              {/* Details (Right side) */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  
                  {/* Tags */}
                  <div className="flex gap-4 items-center mb-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase select-none">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gamepad2 className="w-3.5 h-3.5 text-orange-500" />
                      {item.game}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 leading-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-slate-650 dark:text-slate-400 leading-relaxed font-semibold">
                    {item.description}
                  </p>

                </div>

                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide pt-4 border-t border-slate-100 dark:border-slate-800/80 select-none">
                  Memori Mabar BGST
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </main>

      {/* Simple Footer */}
      <footer className="py-8 text-center text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase select-none border-t border-slate-200/20 dark:border-slate-800/20">
        © {new Date().getFullYear()} BGST • Memori Mabar
      </footer>

    </div>
  );
}
