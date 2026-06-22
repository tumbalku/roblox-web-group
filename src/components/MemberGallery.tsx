"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, FolderClosed, Users, Gamepad2, Sparkles, Shield, Heart } from "lucide-react";
import memberData from "../data/members.json";
import ThreeDViewer from "./ThreeDViewer";
import RobloxGarden from "./RobloxGarden";

interface Member {
  robloxUserId: number;
  role: string;
  joinDate: string;
  bio: string;
  status: string; // Online, Offline, In Game
}

interface RobloxUserInfo {
  userId: number;
  username: string;
  displayName: string;
  avatar2dUrl: string;
  fallback?: boolean;
}

// Single Member Card Component (Used inside the Finder Workspace)
function MemberCard({
  member,
  onClick,
  onLoadedInfo,
  cachedUserInfo,
}: {
  member: Member;
  onClick: (info: RobloxUserInfo) => void;
  onLoadedInfo: (userId: number, info: RobloxUserInfo) => void;
  cachedUserInfo?: RobloxUserInfo;
}) {
  const [userInfo, setUserInfo] = useState<RobloxUserInfo | null>(cachedUserInfo || null);
  const [loading, setLoading] = useState(!cachedUserInfo);

  useEffect(() => {
    if (cachedUserInfo) {
      setUserInfo(cachedUserInfo);
      setLoading(false);
      return;
    }

    const fetchInfo = async () => {
      try {
        const res = await fetch(`/api/roblox/member-info?userId=${member.robloxUserId}`);
        if (res.ok) {
          const data = await res.json();
          setUserInfo(data);
          onLoadedInfo(member.robloxUserId, data);
        }
      } catch (e) {
        console.error("Gagal memuat info member", e);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, [member.robloxUserId, onLoadedInfo, cachedUserInfo]);

  const getRoleBadgeStyle = (role: string) => {
    switch (role.toLowerCase()) {
      case "owner":
        return "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-455 border-rose-200 dark:border-rose-900";
      case "co-owner":
        return "bg-purple-555/5 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900";
      case "chief admin":
        return "bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900";
      case "head developer":
        return "bg-sky-50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900";
      default:
        return "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "online":
        return "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]";
      case "in game":
        return "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)] animate-pulse";
      default:
        return "bg-stone-400 shadow-[0_0_4px_rgba(120,113,108,0.5)]";
    }
  };

  if (loading || !userInfo) {
    return (
      <div className="bg-white/40 dark:bg-stone-900/30 border border-stone-200/50 dark:border-stone-800/40 p-4 rounded-xl flex flex-col items-center gap-3 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-850" />
        <div className="h-4 w-20 bg-stone-200 dark:bg-stone-800 rounded-full" />
        <div className="h-3 w-16 bg-stone-100 dark:bg-stone-855 rounded-full" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      onClick={() => onClick(userInfo)}
      className="bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 p-4 rounded-xl text-center flex flex-col items-center cursor-pointer shadow-sm hover:shadow-md hover:border-orange-500/20 transition-all group select-none"
    >
      <div className="relative mb-3">
        <div className="w-16 h-16 rounded-full overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userInfo.avatar2dUrl}
            alt={userInfo.displayName}
            className="w-full h-full object-cover select-none"
          />
        </div>
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-stone-900 ${getStatusColor(
            member.status
          )}`}
          title={`Status: ${member.status}`}
        />
      </div>

      <h3 className="font-bold text-stone-800 dark:text-stone-200 group-hover:text-orange-500 transition-colors text-xs line-clamp-1">
        {userInfo.displayName}
      </h3>
      <p className="text-[9px] text-stone-400 dark:text-stone-500 font-bold mb-2">
        @{userInfo.username}
      </p>

      <div
        className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded border ${getRoleBadgeStyle(
          member.role
        )}`}
      >
        {member.role}
      </div>
    </motion.div>
  );
}

// Main Member Gallery & Finder Metaphor
export default function MemberGallery() {
  const [activeTab, setActiveTab] = useState<"anggota" | "game" | "dokumentasi" | "taman">("anggota");
  const [selectedMember, setSelectedMember] = useState<{
    member: Member;
    userInfo: RobloxUserInfo;
  } | null>(null);

  const [loadedUsers, setLoadedUsers] = useState<Record<number, RobloxUserInfo>>({});

  const handleLoadedInfo = useCallback((userId: number, info: RobloxUserInfo) => {
    setLoadedUsers((prev) => {
      if (prev[userId] && prev[userId].username === info.username && prev[userId].avatar2dUrl === info.avatar2dUrl) {
        return prev;
      }
      return { ...prev, [userId]: info };
    });
  }, []);

  const handleCardClick = (member: Member, userInfo: RobloxUserInfo) => {
    setSelectedMember({ member, userInfo });
  };

  const close3DModal = () => {
    setSelectedMember(null);
  };

  // Mock static items for Games Tab
  const favoriteGames = [
    { name: "Blox Fruits", desc: "Berpetualang melintasi lautan luas demi melatih kekuatan bela diri dan memperebutkan Buah Iblis legendaris.", genre: "RPG / Adventure", emoji: "🍇" },
    { name: "BedWars", desc: "Pertempuran sengit berebut taktis menghancurkan kasur lawan sambil melindungi kasur sendiri.", genre: "Action / PvP", emoji: "⚔️" },
    { name: "Murder Mystery 2", desc: "Bekerja sama menebak siapa pembunuh misterius atau bertahan hidup di tengah kepanikan.", genre: "Survival / Mystery", emoji: "🛡️" }
  ];

  // Screenshot history images for Documentation Tab
  const galleryScreenshots = [
    { title: "Kumpul Pertama Lobi", date: "20 Jun 2026", src: "/roblox_group_hangout.png", desc: "Kebersamaan awal merancang markas." },
    { title: "Kemenangan BedWars", date: "15 Jun 2026", src: "/roblox_bedwars_battle.png", desc: "Kerja tim ketat hingga detik akhir." },
    { title: "Buru Sea Beast Fruits", date: "10 Jun 2026", src: "/roblox_blox_fruits.png", desc: "Memburu monster laut legendaris." }
  ];

  return (
    <section id="members" className="py-16 px-6 max-w-5xl mx-auto z-10">
      
      {/* Jendela Utama macOS Finder Explorer */}
      <div className="w-full bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-800 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row min-h-[500px]">
        
        {/* Sidebar Kiri Jendela (Navigation Pane) */}
        <div className="w-full md:w-56 bg-stone-50 dark:bg-stone-950 border-r border-stone-200 dark:border-stone-850 p-4 flex flex-col justify-between shrink-0">
          <div>
            {/* Window control buttons (red, yellow, green) */}
            <div className="flex items-center gap-1.5 mb-6 select-none">
              <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20" />
            </div>

            <p className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3 px-2 select-none">
              Workspace Explorer
            </p>

            <nav className="space-y-1 select-none">
              <button
                onClick={() => setActiveTab("anggota")}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "anggota"
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850"
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                Anggota Grup
              </button>
              <button
                onClick={() => setActiveTab("game")}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "game"
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850"
                }`}
              >
                <Gamepad2 className="w-4 h-4 shrink-0" />
                Game Favorit
              </button>
              <button
                onClick={() => setActiveTab("dokumentasi")}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "dokumentasi"
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850"
                }`}
              >
                <FolderClosed className="w-4 h-4 shrink-0" />
                Dokumentasi Mabar
              </button>
              <button
                onClick={() => setActiveTab("taman")}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "taman"
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850"
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                Taman Mabar Sandbox
              </button>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-6 mt-6 border-t border-stone-200 dark:border-stone-850 select-none">
            <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
              <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Mabar Tanpa Toxic
              </span>
            </div>
            <p className="text-[8px] text-stone-400 dark:text-stone-600 font-bold mt-1 leading-relaxed">
              Komunitas kecil beranggotakan teman dekat mabar sejak 2024.
            </p>
          </div>

        </div>

        {/* Content Pane (Right side) */}
        <div className="flex-1 p-6 flex flex-col bg-white dark:bg-stone-900/40">
          
          {/* Path Navigation Bar */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 dark:text-stone-500 mb-6 select-none border-b border-stone-100 dark:border-stone-800 pb-3">
            <span>Workspace</span>
            <span>&gt;</span>
            <span className="text-stone-600 dark:text-stone-400">BGST Group</span>
            <span>&gt;</span>
            <span className="text-orange-500 uppercase">
              {activeTab}
            </span>
          </div>

          {/* Dynamic Content Switching */}
          <div className="flex-1 flex flex-col justify-start">
            
            {/* Tab: Anggota */}
            {activeTab === "anggota" && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-base font-bold text-stone-800 dark:text-stone-100">
                    Anggota Resmi Clan ({memberData.members.length})
                  </h2>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold">
                    Klik kartu salah satu teman untuk meluncurkan peninjau Avatar 3D & detail profil lengkap.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {memberData.members.map((member) => (
                    <MemberCard
                      key={member.robloxUserId}
                      member={member}
                      onClick={(info) => handleCardClick(member, info)}
                      onLoadedInfo={handleLoadedInfo}
                      cachedUserInfo={loadedUsers[member.robloxUserId]}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Game Favorit */}
            {activeTab === "game" && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-base font-bold text-stone-800 dark:text-stone-100">
                    Game Mabar Terpopuler
                  </h2>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold">
                    Beberapa game Roblox yang paling sering kami mainkan bersama-sama saat berkumpul.
                  </p>
                </div>

                <div className="space-y-3">
                  {favoriteGames.map((game, i) => (
                    <div 
                      key={i} 
                      className="p-4 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl flex items-start gap-3 shadow-inner hover:border-orange-500/20 transition-colors"
                    >
                      <span className="text-3xl select-none">{game.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-stone-800 dark:text-stone-100 text-xs">
                            {game.name}
                          </h3>
                          <span className="px-1.5 py-0.5 text-[8px] font-black uppercase bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded">
                            {game.genre}
                          </span>
                        </div>
                        <p className="text-[10px] md:text-[11px] text-stone-500 dark:text-stone-400 font-medium leading-relaxed mt-1">
                          {game.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Dokumentasi Mabar */}
            {activeTab === "dokumentasi" && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-base font-bold text-stone-800 dark:text-stone-100">
                    Galeri Kenangan Mabar
                  </h2>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold">
                    Koleksi screenshot mabar yang merepresentasikan momen-momen seru petualangan kami.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {galleryScreenshots.map((item, i) => (
                    <div 
                      key={i} 
                      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className="h-28 w-full bg-stone-900/10 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={item.src} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between gap-2 select-none">
                          <span className="text-[8px] font-bold text-orange-500 uppercase">{item.date}</span>
                        </div>
                        <h4 className="font-bold text-[11px] text-stone-800 dark:text-stone-200 mt-1">
                          {item.title}
                        </h4>
                        <p className="text-[9px] text-stone-400 dark:text-stone-500 font-bold mt-0.5 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Taman Mabar Sandbox */}
            {activeTab === "taman" && (
              <div className="space-y-4 flex-1 flex flex-col justify-start">
                <div className="mb-1 select-none">
                  <h2 className="text-base font-bold text-stone-800 dark:text-stone-100">
                    Taman Mabar Sandbox
                  </h2>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold">
                    Area interaktif. Silakan bermain dengan mengeklik permukaan kotak di bawah untuk menanam item mabar.
                  </p>
                </div>
                
                <RobloxGarden />
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Modal 3D Avatar (Retro macOS Alert Dialog metaphor) */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-[2px]">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close3DModal}
              className="absolute inset-0 cursor-zoom-out"
            />

            {/* Alert Dialog Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-stone-900 border border-stone-800 dark:border-stone-700 overflow-hidden w-full max-w-2xl shadow-xl relative z-10 flex flex-col md:flex-row rounded-xl"
            >
              {/* Custom Retro Top Bar Alert */}
              <div className="absolute top-0 inset-x-0 h-8 bg-stone-100 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-3 select-none">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400 border border-red-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-yellow-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 border border-green-500/20" />
                </div>
                <span className="text-[9px] font-black text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                  Profil Anggota
                </span>
                <button 
                  onClick={close3DModal}
                  className="bg-stone-200 dark:bg-stone-800 hover:bg-rose-500 hover:text-white transition-colors px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer"
                >
                  Tutup
                </button>
              </div>

              {/* Left Side Canvas Viewer */}
              <div className="w-full md:w-1/2 p-5 pt-12 flex flex-col justify-center bg-stone-50/50 dark:bg-stone-950/20 border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-1 text-[9px] font-black text-orange-500 dark:text-orange-400 uppercase tracking-wider mb-2 select-none">
                  <Shield className="w-3.5 h-3.5" />
                  Visualisasi Avatar 3D
                </div>
                <ThreeDViewer 
                  userId={selectedMember.userInfo.userId} 
                  avatar2dUrl={selectedMember.userInfo.avatar2dUrl} 
                />
              </div>

              {/* Right Side Bio Details */}
              <div className="w-full md:w-1/2 p-6 pt-12 flex flex-col justify-between max-h-[440px] overflow-y-auto select-text">
                <div>
                  
                  {/* Status Indicator */}
                  <div className="flex gap-2 items-center mb-3 select-none">
                    <span className={`h-2.5 w-2.5 rounded-full ${
                      selectedMember.member.status === "Online"
                        ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                        : selectedMember.member.status === "In Game"
                        ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)] animate-pulse"
                        : "bg-stone-450"
                    }`} />
                    <span className="text-[9px] font-black text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      Status: {selectedMember.member.status}
                    </span>
                  </div>

                  {/* Header Title Name */}
                  <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
                    {selectedMember.userInfo.displayName}
                  </h3>
                  <p className="text-[10px] text-stone-450 dark:text-stone-500 font-bold mb-4">
                    @{selectedMember.userInfo.username} (ID: {selectedMember.userInfo.userId})
                  </p>

                  <hr className="border-stone-200 dark:border-stone-800 mb-4" />

                  {/* Details Data Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4 select-none">
                    <div>
                      <div className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-0.5">
                        Jabatan Grup
                      </div>
                      <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                        {selectedMember.member.role}
                      </span>
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-0.5">
                        Aktif Sejak
                      </div>
                      <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                        {new Date(selectedMember.member.joinDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Biography Paragraph */}
                  <div className="mb-6">
                    <div className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1.5 select-none">
                      Biografi Anggota
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed font-semibold bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 p-3 rounded-xl shadow-inner">
                      {selectedMember.member.bio || "Tidak ada biografi tertulis."}
                    </p>
                  </div>
                </div>

                {/* External Roblox Link Action */}
                <a
                  href={`https://www.roblox.com/users/${selectedMember.userInfo.userId}/profile`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-10 rounded-lg bg-stone-900 dark:bg-stone-100 hover:bg-orange-500 dark:hover:bg-orange-500 text-white dark:text-stone-900 hover:text-white transition-all shadow flex items-center justify-center gap-1.5 text-xs font-bold select-none cursor-pointer"
                >
                  Roblox Profile
                  <User className="w-3.5 h-3.5" />
                </a>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
