"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Terminal, Disc, FolderClosed, ExternalLink } from "lucide-react";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [terminalLine, setTerminalLine] = useState(0);

  const terminalCommands = [
    { cmd: "whoami", res: "Roblox Gamers - BGST Group" },
    { cmd: "members --total", res: "7 Active Friends" },
    { cmd: "status", res: "Online & ready for BedWars" }
  ];

  return (
    <section className="relative min-h-screen pt-24 pb-16 px-6 bg-stone-50 dark:bg-stone-950 paper-grain overflow-hidden border-b border-stone-200 dark:border-stone-850 flex flex-col items-center justify-center">
      
      {/* Title & Headline Header */}
      <div className="text-center max-w-2xl mx-auto z-20 mb-12 select-none">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-stone-800 to-stone-900 dark:from-stone-100 dark:to-stone-300 bg-clip-text text-transparent">
          BGST GROUP
        </h1>
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-orange-600 dark:text-orange-500 mt-3">
          I think, then I build (and game).
        </p>
        <p className="text-sm text-stone-600 dark:text-stone-400 font-medium max-w-md mx-auto mt-4 leading-relaxed">
          Tempat berkumpulnya kelompok bermain kami yang santai. Bagus, Sopan, dan Terpelajar.
        </p>
      </div>

      {/* Main Desktop Canvas Grid */}
      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Side: ID Badge and Vinyl (Desktop Composition) */}
        <div className="lg:col-span-4 flex flex-col md:flex-row lg:flex-col gap-8 justify-center items-center">
          
          {/* Lanyard ID Badge */}
          <div className="flex flex-col items-center shrink-0 badge-swing">
            {/* Lanyard Rope */}
            <div className="w-[12px] h-[60px] bg-stone-800 dark:bg-stone-750 relative shadow-md">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)"
              }} />
            </div>
            
            {/* Badge Case */}
            <div className="rounded-2xl p-[4px] -mt-3 shadow-lg bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 border border-white/10 w-[170px]">
              <div className="rounded-xl overflow-hidden flex flex-col bg-stone-900 border border-black/40">
                
                {/* Header */}
                <div className="relative px-3 pt-3 pb-2 text-center border-b border-stone-800" style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "8px 8px"
                }}>
                  <span className="text-[9px] font-black tracking-widest text-orange-500 uppercase">
                    MEMBER PASS
                  </span>
                  <h3 className="text-white font-extrabold text-sm tracking-wide mt-0.5">
                    BGST CLAN
                  </h3>
                </div>

                {/* Profile Avatar Frame */}
                <div className="p-3 flex flex-col items-center bg-stone-950">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-800 border-2 border-stone-700 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://images.rbxcdn.com/265d6c6e19c3ab737de85e783a4c2f6d.png" 
                      alt="Roblox" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-stone-300 mt-2">
                    7 Members Online
                  </span>
                  <span className="text-[8px] font-bold text-stone-500 uppercase tracking-widest mt-0.5">
                    Est. 2024
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Vinyl Record */}
          <div 
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative cursor-pointer group flex flex-col items-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm p-4 w-[170px] select-none"
          >
            {/* Record Sleeve Opening and Vinyl Disk */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className={`absolute w-24 h-24 rounded-full bg-stone-950 border-4 border-stone-800 shadow flex items-center justify-center ${
                isPlaying ? "vinyl-spin" : "group-hover:vinyl-spin"
              }`}>
                {/* Vinyl Grooves */}
                <div className="absolute inset-2 rounded-full border border-stone-800/40" />
                <div className="absolute inset-4 rounded-full border border-stone-800/30" />
                {/* Vinyl Label */}
                <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-stone-950 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />
                </div>
              </div>
            </div>

            <p className="font-bold text-[10px] text-stone-500 dark:text-stone-400 mt-3 text-center uppercase tracking-wider">
              {isPlaying ? "📻 Now Playing" : "🎵 Mabar Vibes"}
            </p>
            <p className="text-[8px] text-stone-400 dark:text-stone-600 mt-0.5 text-center font-bold">
              Click to Spin
            </p>
          </div>

        </div>

        {/* Center: Terminal CLI Window (Desktop mock) */}
        <div className="lg:col-span-5 w-full flex flex-col">
          <div className="w-full bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-800 rounded-xl overflow-hidden shadow-md flex flex-col">
            
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-stone-100 dark:bg-stone-950 border-b border-stone-200/60 dark:border-stone-850 select-none">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/30 cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/30 cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/30 cursor-pointer" />
              </div>
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 font-mono tracking-wide">
                guest@bgst-group — zsh
              </span>
              <div className="w-12" />
            </div>

            {/* Terminal Body */}
            <div className="p-4 font-mono text-xs text-stone-700 dark:text-stone-300 leading-relaxed min-h-[190px] select-text">
              <p className="text-stone-450 dark:text-stone-500 text-[10px] mb-2 select-none">
                Last login: {new Date().toLocaleDateString("id-ID")} on console
              </p>
              
              <div className="space-y-2">
                <div>
                  <span className="text-orange-500 font-bold">guest@bgst-group:~$</span> cat welcome.txt
                  <p className="text-stone-800 dark:text-stone-200 font-bold mt-0.5">
                    "Selamat datang di beranda BGST Group. Tempat nongkrong mabar anti-toxic."
                  </p>
                </div>

                {/* Animated Interactive Commands */}
                {terminalCommands.slice(0, terminalLine + 1).map((cmd, i) => (
                  <div key={i} className="animate-fadeIn">
                    <span className="text-orange-500 font-bold">guest@bgst-group:~$</span> {cmd.cmd}
                    <p className="text-stone-500 dark:text-stone-400 mt-0.5">{cmd.res}</p>
                  </div>
                ))}
              </div>

              {terminalLine < terminalCommands.length - 1 ? (
                <button
                  onClick={() => setTerminalLine((prev) => prev + 1)}
                  className="mt-3 px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 hover:bg-orange-500 hover:text-white border border-stone-200 dark:border-stone-700 text-[10px] text-stone-600 dark:text-stone-300 font-bold cursor-pointer transition-colors"
                >
                  Run next command
                </button>
              ) : (
                <div className="mt-4 flex items-center gap-1 text-[10px] text-stone-400 select-none">
                  <Terminal className="w-3.5 h-3.5" />
                  Terminal output complete.
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Side: Polaroid Photo Stack and Folder (Desktop Mock) */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center gap-8">
          
          {/* Polaroid Photo Stack */}
          <div className="relative w-44 h-48 group cursor-pointer select-none">
            
            {/* Photo 3 */}
            <div className="absolute inset-0 bg-white border border-stone-200 rounded p-2.5 shadow-md rotate-6 translate-y-2 translate-x-3 transition-transform duration-300 group-hover:rotate-[12deg] group-hover:translate-x-12">
              <div className="w-full h-28 bg-stone-900/10 relative overflow-hidden">
                <Image 
                  src="/roblox_blox_fruits.png" 
                  alt="Blox Fruits"
                  fill 
                  sizes="160px"
                  className="object-cover" 
                />
              </div>
              <p className="font-serif text-[10px] text-center text-stone-600 dark:text-stone-900 mt-2 font-bold tracking-wide">
                Sea Beast
              </p>
            </div>

            {/* Photo 2 */}
            <div className="absolute inset-0 bg-white border border-stone-200 rounded p-2.5 shadow-md -rotate-3 -translate-y-1 -translate-x-3 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:-translate-x-12">
              <div className="w-full h-28 bg-stone-900/10 relative overflow-hidden">
                <Image 
                  src="/roblox_bedwars_battle.png" 
                  alt="BedWars" 
                  fill
                  sizes="160px"
                  className="object-cover" 
                />
              </div>
              <p className="font-serif text-[10px] text-center text-stone-600 dark:text-stone-900 mt-2 font-bold tracking-wide">
                BedWars Win
              </p>
            </div>

            {/* Photo 1 (Top of stack) */}
            <div className="absolute inset-0 bg-white border border-stone-200 rounded p-2.5 shadow-md rotate-2 transition-transform duration-300 group-hover:translate-y-[-10px]">
              <div className="w-full h-28 bg-stone-900/10 relative overflow-hidden">
                <Image 
                  src="/roblox_group_hangout.png" 
                  alt="Mabar Lobby" 
                  fill
                  sizes="160px"
                  className="object-cover" 
                />
              </div>
              <p className="font-serif text-[10px] text-center text-stone-600 dark:text-stone-900 mt-2 font-bold tracking-wide">
                Kumpul Lobi
              </p>
            </div>

          </div>

          {/* Folder Icon (Links to Gallery) */}
          <Link 
            href="/gallery" 
            className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-500/20 transition-all select-none w-[170px]"
          >
            <FolderClosed className="w-9 h-9 text-amber-500" />
            <span className="font-bold text-[10px] text-stone-700 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1 justify-center">
              Album Galeri
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </span>
            <span className="text-[8px] text-stone-400 dark:text-stone-600 font-bold -mt-1 text-center">
              Lihat History Foto
            </span>
          </Link>

        </div>

      </div>

    </section>
  );
}
