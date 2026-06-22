import Hero from "@/components/Hero";
import MemberGallery from "@/components/MemberGallery";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 font-sans transition-colors duration-300">
      
      {/* Sticky Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-stone-950/70 backdrop-blur-md border-b border-stone-200/40 dark:border-stone-800/40 px-6 py-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            BGST GROUP
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-bold text-stone-600 dark:text-stone-400">
          <Link href="/" className="hover:text-orange-500 transition-colors">Beranda</Link>
          <a href="#members" className="hover:text-orange-500 transition-colors">Explorer</a>
          <Link href="/gallery" className="hover:text-orange-500 transition-colors">Galeri Mabar</Link>
        </nav>
      </header>

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <MemberGallery />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
