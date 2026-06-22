"use client";

import { motion } from "framer-motion";
import { MessageSquare, Flame, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-900 select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Branding Info */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent uppercase">
              BGST Group
            </span>
            <span className="text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-full bg-slate-900 text-orange-400 border border-orange-400/20">
              v1.0
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-medium">
            Komunitas gamer Roblox Indonesia yang Bagus, Sopan, dan Terpelajar. Bersenang-senang secara sehat dan suportif.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://discord.gg/bgstgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-900 hover:bg-orange-500 border border-slate-800 hover:border-orange-500 text-slate-350 hover:text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
            title="Join Server Discord Kami"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
          <a
            href="https://www.roblox.com/groups/12345"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-900 hover:bg-orange-500 border border-slate-800 hover:border-orange-500 text-slate-350 hover:text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
            title="Kunjungi Grup Roblox"
          >
            <Flame className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/tumbalku/roblox-web-group"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-900 hover:bg-orange-500 border border-slate-800 hover:border-orange-500 text-slate-350 hover:text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
            title="Source Code Repository"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </div>

      </div>

      <hr className="border-slate-900 my-10 max-w-6xl mx-auto" />

      {/* Copyright info */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-semibold tracking-wide text-slate-600 dark:text-slate-500 uppercase">
        <p>© {currentYear} BGST Group. Hak Cipta Dilindungi.</p>
        <p className="flex items-center gap-1">
          Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse fill-rose-500" /> untuk Komunitas Roblox
        </p>
      </div>

    </footer>
  );
}
