"use client";

import { motion } from "framer-motion";
import { Info, Gamepad2 } from "lucide-react";

export default function About() {
  const favoriteGames = ["Blox Fruits", "BedWars", "Murder Mystery 2"];

  return (
    <section id="about" className="py-16 px-6 bg-slate-50/50 dark:bg-slate-900/10 border-t border-slate-100 dark:border-slate-800/40 relative overflow-hidden">
      
      <div className="max-w-3xl mx-auto relative z-10 text-center md:text-left">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
            Tentang BGST
          </h2>
        </div>

        {/* Unified Story & Description */}
        <div className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm mb-6 max-w-3xl mx-auto">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4 mx-auto md:mx-0">
            <Info className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 text-center md:text-left">
            Siapa Kami?
          </h3>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-405 leading-relaxed font-semibold">
            BGST Group dibentuk pada awal tahun 2024 sebagai wadah berkumpulnya sekelompok teman dekat untuk mabar dan bersenang-senang di Roblox. Komitmen kami sederhana: menciptakan suasana bermain yang seru, mendukung satu sama lain, dan bebas dari drama toxic. Kami menjunjung tinggi persahabatan, kesopanan, dan sportivitas di setiap game yang kami mainkan bersama.
          </p>
        </div>

        {/* Clean Badges for Favorite Games (YAGNI alternative to complex cards grid) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-3xl mx-auto pt-2 text-xs font-bold text-slate-500 dark:text-slate-400 select-none">
          <span className="flex items-center gap-1.5 text-orange-500 uppercase tracking-wider text-[10px]">
            <Gamepad2 className="w-3.5 h-3.5" />
            Game Favorit:
          </span>
          <div className="flex flex-wrap gap-2 justify-center">
            {favoriteGames.map((game, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300"
              >
                🎮 {game}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
