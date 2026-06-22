"use client";

import { motion } from "framer-motion";
import { History, Target, Gamepad2, Heart, ExternalLink } from "lucide-react";

export default function About() {
  const favoriteGames = [
    {
      name: "Blox Fruits",
      genre: "RPG / Adventure",
      rating: "⭐ 4.8",
      visits: "35B+",
      description: "Berburu buah iblis legendaris dan berlayar bersama anggota grup mengarungi samudra luas.",
      color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-500"
    },
    {
      name: "BedWars",
      genre: "Action / PvP",
      rating: "⭐ 4.6",
      visits: "7B+",
      description: "Uji kekompakan tim dalam mempertahankan bed dan menghancurkan bed musuh bersama clan.",
      color: "from-red-500/10 to-orange-500/10 border-red-500/20 text-red-500"
    },
    {
      name: "Murder Mystery 2",
      genre: "Survival / Horror",
      rating: "⭐ 4.7",
      visits: "12B+",
      description: "Game deduksi sosial terfavorit untuk menebak siapa Murderer di antara kita sembari bersenang-senang.",
      color: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-500"
    }
  ];

  return (
    <section id="about" className="py-24 px-6 bg-slate-55/40 dark:bg-slate-900/10 border-y border-slate-100 dark:border-slate-800/60 relative overflow-hidden">
      
      {/* Background Subtle Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] right-[-10%] w-[25vw] h-[25vw] rounded-full bg-orange-300/10 dark:bg-orange-500/5 blur-[70px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-amber-200/10 dark:bg-yellow-500/5 blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-350 bg-clip-text text-transparent">
            Tentang Grup Kami
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium">
            Mengenal lebih dekat BGST Group, sejarah pembentukan, visi kami, serta berbagai game Roblox terpopuler yang biasa kami mainkan bersama.
          </p>
        </div>

        {/* History and Mission Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          
          {/* Card 1: Sejarah */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 p-8 rounded-3xl shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              Sejarah Singkat
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
              BGST Group didirikan pada awal tahun 2024 oleh sekelompok sahabat dekat yang memiliki kegemaran sama dalam menjelajahi dunia Roblox. Dimulai dari server Discord kecil beranggotakan beberapa orang, kini kami berkembang menjadi komunitas solid yang berfokus pada kebersamaan, persahabatan, dan kesopanan dalam bermain game.
            </p>
          </motion.div>

          {/* Card 2: Visi */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 p-8 rounded-3xl shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-550 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Visi & Komitmen
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
              Visi kami adalah menciptakan ekosistem bermain yang **fun (menyenangkan), supportif, dan ramah** bagi seluruh gamer Roblox. Kami menjunjung tinggi nilai-nilai perilaku sopan, terpelajar, dan saling menghormati, baik di dalam permainan maupun di forum komunitas eksternal. No toxic, just pure gaming fun!
            </p>
          </motion.div>

        </div>

        {/* Favorite Games Section */}
        <div>
          <div className="flex items-center gap-2.5 mb-8 justify-center md:justify-start select-none">
            <Gamepad2 className="w-5 h-5 text-orange-500" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Game Favorit Grup
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {favoriteGames.map((game, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`bg-gradient-to-br border p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-300 ${game.color}`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200/40 dark:bg-slate-850/40 text-slate-600 dark:text-slate-300 border border-slate-200/20">
                      {game.genre}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {game.rating}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                    {game.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">
                    {game.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-200/10 text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 select-none">
                  <span>Roblox Visits</span>
                  <span className="text-slate-800 dark:text-slate-200 font-black text-xs">{game.visits}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
