"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, FileText, ExternalLink, Shield } from "lucide-react";
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
        return "bg-rose-550/10 text-rose-500 border-rose-500/20";
      case "co-owner":
        return "bg-purple-550/10 text-purple-500 border-purple-500/20";
      case "chief admin":
        return "bg-orange-555/10 text-orange-500 border-orange-500/20";
      case "head developer":
        return "bg-sky-550/10 text-sky-500 border-sky-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
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
      <div className="bg-white/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/40 p-4 rounded-2xl flex flex-col items-center gap-3 animate-pulse">
        <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-3 w-28 bg-slate-100 dark:bg-slate-800 rounded-full" />
        <div className="h-5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => onClick(userInfo)}
      className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/40 dark:border-slate-800/40 p-5 rounded-2xl text-center flex flex-col items-center cursor-pointer shadow-sm hover:shadow-md hover:border-orange-500/20 transition-all group"
    >
      {/* 2D Roblox Avatar with status indicator */}
      <div className="relative mb-3">
        <div className="w-20 h-20 rounded-full overflow-hidden border border-orange-500/15 group-hover:border-orange-500/25 transition-all bg-gradient-to-tr from-orange-50 to-amber-50/20 dark:from-slate-800 dark:to-slate-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userInfo.avatar2dUrl}
            alt={userInfo.displayName}
            className="w-full h-full object-cover select-none"
          />
        </div>
        <span
          className={`absolute bottom-0 right-1 w-3 h-3 rounded-full border border-white dark:border-slate-950 shadow-sm ${getStatusColor(
            member.status
          )}`}
          title={`Status: ${member.status}`}
        />
      </div>

      {/* Profile Details */}
      <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-orange-500 transition-colors text-sm line-clamp-1">
        {userInfo.displayName}
      </h3>
      <p className="text-[10px] text-slate-450 dark:text-slate-500 font-medium mb-3 select-none">
        @{userInfo.username}
      </p>

      {/* Role Badge */}
      <div
        className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide rounded-full border ${getRoleBadgeStyle(
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

  const handleCardClick = (member: Member, userInfo: RobloxUserInfo) => {
    setSelectedMember({ member, userInfo });
  };

  const close3DModal = () => {
    setSelectedMember(null);
  };

  return (
    <section id="members" className="py-16 px-6 max-w-4xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">
          Anggota Grup
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium leading-relaxed">
          Daftar anggota resmi kelompok mabar kami. Klik salah satu kartu untuk melihat avatar 3D/2D yang interaktif!
        </p>
      </div>

      {/* Grid of Cards (Direct map, no redundant search/filter toolbar) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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

      {/* Modal 3D Avatar Detail */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close3DModal}
              className="absolute inset-0 cursor-zoom-out"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl overflow-hidden w-full max-w-3xl shadow-xl relative z-10 flex flex-col md:flex-row"
            >
              
              {/* Close Button */}
              <button
                onClick={close3DModal}
                className="absolute top-3 right-3 bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white p-1.5 rounded-full transition-all text-slate-500 dark:text-slate-400 z-20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* 3D Visualizer Canvas (Left side) */}
              <div className="w-full md:w-1/2 p-5 flex flex-col justify-center bg-slate-50/50 dark:bg-slate-950/40 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500 dark:text-orange-400 uppercase tracking-wider mb-2 select-none">
                  <Shield className="w-3 h-3" />
                  Roblox Avatar
                </div>
                <ThreeDViewer userId={selectedMember.userInfo.userId} avatar2dUrl={selectedMember.userInfo.avatar2dUrl} />
              </div>

              {/* Member Profile Details (Right side) */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between max-h-[500px] overflow-y-auto">
                <div>
                  
                  {/* Status Tag */}
                  <div className="flex gap-2 items-center mb-3 select-none">
                    <span className={`h-2.5 w-2.5 rounded-full ${
                      selectedMember.member.status === "Online"
                        ? "bg-green-500"
                        : selectedMember.member.status === "In Game"
                        ? "bg-cyan-500 animate-pulse"
                        : "bg-slate-400"
                    }`} />
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {selectedMember.member.status}
                    </span>
                  </div>

                  {/* Member Name */}
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    {selectedMember.userInfo.displayName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-4">
                    @{selectedMember.userInfo.username} (ID: {selectedMember.userInfo.userId})
                  </p>

                  <hr className="border-slate-100 dark:border-slate-800/80 mb-4" />

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-4 mb-4 select-none">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                        Role Grup
                      </div>
                      <span className="text-xs font-bold text-slate-750 dark:text-slate-200">
                        {selectedMember.member.role}
                      </span>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                        Tanggal Join
                      </div>
                      <span className="text-xs font-bold text-slate-750 dark:text-slate-200">
                        {new Date(selectedMember.member.joinDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Biography */}
                  <div className="mb-6">
                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 select-none">
                      <FileText className="w-3.5 h-3.5 inline mr-1" />
                      Biografi
                    </div>
                    <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      {selectedMember.member.bio}
                    </p>
                  </div>
                </div>

                {/* Open Profile Button */}
                <a
                  href={`https://www.roblox.com/users/${selectedMember.userInfo.userId}/profile`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-10 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 select-none active:scale-[0.98]"
                >
                  Lihat Profil Lengkap
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
