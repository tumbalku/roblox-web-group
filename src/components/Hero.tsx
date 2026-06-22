"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Award, ShieldAlert, Sparkles, Flame } from "lucide-react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

function AnimatedCounter({ value, duration = 1.5, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-6 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-amber-50 via-orange-100 to-orange-200/50 dark:from-slate-900 dark:via-orange-950/20 dark:to-slate-950">
      
      {/* Dynamic Animated Blobs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-orange-400/20 dark:bg-orange-500/10 blur-[80px] animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-yellow-300/30 dark:bg-yellow-500/5 blur-[100px] animate-pulse" style={{ animationDuration: "8s", animationDelay: "2s" }} />
        <div className="absolute top-[40%] right-[30%] w-[15vw] h-[15vw] rounded-full bg-amber-400/25 dark:bg-amber-600/5 blur-[50px] animate-pulse" style={{ animationDuration: "10s", animationDelay: "1s" }} />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Floating Accent Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-400/10 border border-orange-500/20 dark:border-orange-400/25 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
          Official Website Grup Roblox
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 dark:from-orange-500 dark:via-amber-400 dark:to-yellow-300 bg-clip-text text-transparent drop-shadow-sm select-none"
        >
          BGST GROUP
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Komunitas <span className="text-orange-600 dark:text-orange-400 font-bold border-b-2 border-orange-400/30">Bagus, Sopan, dan Terpelajar</span>. Wadah berkumpulnya para gamer Roblox sejati untuk seru-seruan bareng!
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-20"
        >
          <button
            onClick={handleScrollToMembers}
            className="w-full sm:w-auto h-14 px-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:scale-[1.03] active:scale-95 transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 group cursor-pointer"
          >
            Lihat Members
            <Users className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a
            href="https://www.roblox.com/groups/12345"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-14 px-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-bold hover:bg-slate-50 dark:hover:bg-slate-850 hover:scale-[1.03] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            Join Group di Roblox
            <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
          </a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {/* Stat Card 1 */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/5 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mx-auto mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-1">
              <AnimatedCounter value={250} suffix="+" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Members</p>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/5 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mx-auto mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-1">
              <AnimatedCounter value={99} suffix="%" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Keseruan</p>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/5 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-yellow-550/10 flex items-center justify-center text-amber-600 dark:text-yellow-400 mx-auto mb-3">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-1">
              <AnimatedCounter value={12} suffix="k+" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Total Kunjungan</p>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/5 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-550 mx-auto mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-1">
              <AnimatedCounter value={2024} duration={1.2} />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Didirikan</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
