"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Sparkles, Flame } from "lucide-react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleScrollToMembers = () => {
    const element = document.getElementById("members");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center py-16 px-6 bg-gradient-to-b from-amber-50/50 to-orange-100/20 dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800/40">
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        
        {/* Simple Accent Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 dark:bg-orange-400/10 border border-orange-500/20 dark:border-orange-400/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-6"
        >
          <Sparkles className="w-3 h-3 text-orange-500" />
          Tempat Kumpul Mabar
        </motion.div>

        {/* Group Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-500 dark:to-amber-400 bg-clip-text text-transparent select-none"
        >
          BGST GROUP
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base md:text-lg text-slate-650 dark:text-slate-400 max-w-xl mx-auto mb-8 font-medium leading-relaxed"
        >
          Komunitas kecil yang <span className="text-orange-500 font-semibold">Bagus, Sopan, dan Terpelajar</span>. Tempat nongkrong santai buat mabar Roblox bareng teman-teman terdekat tanpa toxic!
        </motion.p>

        {/* Inline Bullet Badges (YAGNI alternative to giant stats grid) */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center justify-center gap-4 text-xs font-bold text-slate-550 dark:text-slate-500 mb-8 select-none"
        >
          <span className="flex items-center gap-1">👥 7 Anggota</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1">📅 Sejak 2024</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1">🛡️ No Toxic</span>
        </motion.div>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <button
            onClick={handleScrollToMembers}
            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Lihat Anggota
            <Users className="w-4 h-4" />
          </button>
          
          <a
            href="https://www.roblox.com/groups/12345"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-250 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-850 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Join Group di Roblox
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
