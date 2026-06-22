"use client";

import { MessageSquare, Flame, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-10 px-6 border-t border-slate-900 select-none">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Branding Title */}
        <div className="flex items-center gap-2">
          <span className="text-base font-black tracking-wider bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent uppercase">
            BGST Group
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://discord.gg/bgstgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-orange-500 border border-slate-800 hover:border-orange-500 text-slate-400 hover:text-white flex items-center justify-center transition-all shadow-sm"
            title="Discord"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <a
            href="https://www.roblox.com/groups/12345"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-orange-500 border border-slate-800 hover:border-orange-500 text-slate-400 hover:text-white flex items-center justify-center transition-all shadow-sm"
            title="Grup Roblox"
          >
            <Flame className="w-4 h-4 text-orange-500" />
          </a>
          <a
            href="https://github.com/tumbalku/roblox-web-group"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-orange-500 border border-slate-800 hover:border-orange-500 text-slate-400 hover:text-white flex items-center justify-center transition-all shadow-sm"
            title="GitHub"
          >
            <svg
              className="w-4 h-4"
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

      <hr className="border-slate-900 my-6 max-w-4xl mx-auto" />

      {/* Copyright info */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-bold tracking-wide text-slate-650 dark:text-slate-500 uppercase">
        <p>© {currentYear} BGST. Hak Cipta Dilindungi.</p>
        <p className="flex items-center gap-1">
          Dibuat dengan <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> untuk Komunitas Roblox
        </p>
      </div>

    </footer>
  );
}
