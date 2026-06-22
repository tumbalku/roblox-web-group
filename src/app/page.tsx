import Hero from "@/components/Hero";
import MemberGallery from "@/components/MemberGallery";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      
      {/* Sticky Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/40 px-6 py-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            BGST GROUP
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-bold text-slate-650 dark:text-slate-350">
          <a href="#" className="hover:text-orange-550 transition-colors">Home</a>
          <a href="#members" className="hover:text-orange-555 transition-colors">Members</a>
          <a href="#about" className="hover:text-orange-555 transition-colors">Tentang Kami</a>
        </nav>
      </header>

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <MemberGallery />
        <About />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
