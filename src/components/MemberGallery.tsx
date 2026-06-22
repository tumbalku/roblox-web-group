"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, Calendar, User, FileText, ArrowRight, ExternalLink, Shield } from "lucide-react";
import memberData from "../data/members.json";
import ThreeDViewer from "./ThreeDViewer";

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

// Single Member Card Component
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

  // Role Badge Styling Mapper
  const getRoleBadgeStyle = (role: string) => {
    switch (role.toLowerCase()) {
      case "owner":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-450 border-rose-500/25";
      case "co-owner":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25";
      case "chief admin":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25";
      case "head developer":
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25";
      default:
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25";
    }
  };

  // Status Dot Color Mapper
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "online":
        return "bg-green-500 shadow-green-500/50";
      case "in game":
        return "bg-cyan-500 shadow-cyan-500/50 animate-pulse";
      default:
        return "bg-slate-400 shadow-slate-400/50";
    }
  };

  if (loading || !userInfo) {
    // Shimmer Skeleton Loader
    return (
      <div className="bg-white/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/40 p-5 rounded-3xl flex flex-col items-center gap-4 animate-pulse">
        <div className="w-28 h-28 rounded-full bg-slate-300 dark:bg-slate-800" />
        <div className="h-5 w-24 bg-slate-300 dark:bg-slate-800 rounded-full" />
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => onClick(userInfo)}
      className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/50 p-5 rounded-3xl text-center flex flex-col items-center cursor-pointer shadow-sm hover:shadow-xl hover:border-orange-500/30 dark:hover:border-orange-500/20 transition-all group"
    >
      {/* 2D Roblox Avatar with status indicator */}
      <div className="relative mb-4">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-orange-500/10 group-hover:border-orange-500/30 transition-all bg-gradient-to-tr from-orange-100 to-amber-50 dark:from-slate-800 dark:to-slate-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userInfo.avatar2dUrl}
            alt={userInfo.displayName}
            className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform"
          />
        </div>
        {/* Status indicator dot */}
        <span
          className={`absolute bottom-1 right-2 w-4 h-4 rounded-full border-2 border-white dark:border-slate-950 shadow-md ${getStatusColor(
            member.status
          )}`}
          title={`Status: ${member.status}`}
        />
      </div>

      {/* Profile Details */}
      <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-450 transition-colors line-clamp-1">
        {userInfo.displayName}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-4 select-none">
        @{userInfo.username}
      </p>

      {/* Role Badge */}
      <div
        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getRoleBadgeStyle(
          member.role
        )}`}
      >
        {member.role}
      </div>
    </motion.div>
  );
}

// Main Member Gallery
export default function MemberGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedMember, setSelectedMember] = useState<{
    member: Member;
    userInfo: RobloxUserInfo;
  } | null>(null);

  // Cache loaded user info so modal can use it immediately
  const [loadedUsers, setLoadedUsers] = useState<Record<number, RobloxUserInfo>>({});

  const handleLoadedInfo = useCallback((userId: number, info: RobloxUserInfo) => {
    setLoadedUsers((prev) => {
      if (prev[userId] && prev[userId].username === info.username && prev[userId].avatar2dUrl === info.avatar2dUrl) {
        return prev;
      }
      return { ...prev, [userId]: info };
    });
  }, []);

  // Get distinct roles for dropdown filter
  const roles = ["All", ...Array.from(new Set(memberData.members.map((m) => m.role)))];

  // Filter list based on search and role filters
  const filteredMembers = memberData.members.filter((member) => {
    const info = loadedUsers[member.robloxUserId];
    const matchesSearch = info
      ? info.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.robloxUserId.toString().includes(searchTerm)
      : member.robloxUserId.toString().includes(searchTerm);

    const matchesRole = roleFilter === "All" || member.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleCardClick = (member: Member, userInfo: RobloxUserInfo) => {
    setSelectedMember({ member, userInfo });
  };

  const close3DModal = () => {
    setSelectedMember(null);
  };

  return (
    <section id="members" className="py-24 px-6 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-350 bg-clip-text text-transparent">
          Galeri Member
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium">
          Daftar anggota resmi grup beserta avatar Roblox 2D real-time mereka. Klik salah satu card untuk memutar avatar dalam model 3D interaktif!
        </p>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 w-full">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Cari berdasarkan Display Name, Username, atau User ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-450 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 shadow-sm transition-all"
          />
        </div>

        {/* Role Dropdown */}
        <div className="relative w-full md:w-56 flex items-center">
          <Filter className="absolute left-4 w-4 h-4 text-slate-450 dark:text-slate-500 pointer-events-none" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full h-12 pl-11 pr-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 text-sm text-slate-850 dark:text-slate-100 focus:outline-none focus:border-orange-500/50 appearance-none shadow-sm transition-all cursor-pointer font-medium"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                Role: {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredMembers.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.robloxUserId}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <MemberCard
                  member={member}
                  onClick={(info) => handleCardClick(member, info)}
                  onLoadedInfo={handleLoadedInfo}
                  cachedUserInfo={loadedUsers[member.robloxUserId]}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-900/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl py-16 text-center text-slate-500 select-none">
          <User className="w-12 h-12 text-slate-400 dark:text-slate-700 mx-auto mb-3 animate-bounce" />
          <p className="text-sm font-semibold">Tidak ada member yang cocok dengan kriteria pencarian.</p>
        </div>
      )}

      {/* Modal 3D Avatar Detail */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            
            {/* Modal backdrop wrapper for close on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close3DModal}
              className="absolute inset-0 cursor-zoom-out"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl relative z-10 flex flex-col md:flex-row"
            >
              
              {/* Close Button */}
              <button
                onClick={close3DModal}
                className="absolute top-4 right-4 bg-slate-100 dark:bg-slate-800/80 hover:bg-rose-500 hover:text-white p-2 rounded-full shadow-md active:scale-95 transition-all text-slate-500 dark:text-slate-300 z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 3D Visualizer Canvas (Left side) */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-slate-100 via-orange-100/30 to-orange-100/5 dark:from-slate-950 dark:via-orange-950/5 dark:to-slate-900 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1 text-[11px] font-bold text-orange-500 dark:text-orange-400 uppercase tracking-wide mb-3 select-none">
                  <Shield className="w-3.5 h-3.5" />
                  Roblox Avatar 3D Viewer
                </div>
                <ThreeDViewer userId={selectedMember.userInfo.userId} avatar2dUrl={selectedMember.userInfo.avatar2dUrl} />
              </div>

              {/* Member Profile Details (Right side) */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between max-h-[550px] overflow-y-auto">
                <div>
                  
                  {/* Status Tag */}
                  <div className="flex gap-2.5 items-center mb-4 select-none">
                    <span className="flex h-3 w-3 relative">
                      {selectedMember.member.status !== "Offline" && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      )}
                      <span
                        className={`relative inline-flex rounded-full h-3 w-3 ${
                          selectedMember.member.status === "Online"
                            ? "bg-green-500"
                            : selectedMember.member.status === "In Game"
                            ? "bg-cyan-500"
                            : "bg-slate-400"
                        }`}
                      />
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {selectedMember.member.status}
                    </span>
                  </div>

                  {/* Member Name */}
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {selectedMember.userInfo.displayName}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-6">
                    @{selectedMember.userInfo.username} (ID: {selectedMember.userInfo.userId})
                  </p>

                  <hr className="border-slate-100 dark:border-slate-800 mb-6" />

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-4 mb-6 select-none">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                        <Shield className="w-3.5 h-3.5" />
                        Role Grup
                      </div>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {selectedMember.member.role}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Tanggal Join
                      </div>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {new Date(selectedMember.member.joinDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Biography */}
                  <div className="mb-8">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 select-none">
                      <FileText className="w-3.5 h-3.5" />
                      Biografi
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                      {selectedMember.member.bio}
                    </p>
                  </div>
                </div>

                {/* Open Profile Button */}
                <a
                  href={`https://www.roblox.com/users/${selectedMember.userInfo.userId}/profile`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2 select-none active:scale-[0.98]"
                >
                  Lihat Profil Lengkap
                  <ExternalLink className="w-4 h-4" />
                </a>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
