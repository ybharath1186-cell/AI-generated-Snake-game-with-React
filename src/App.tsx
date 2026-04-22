/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Github, Twitter, Info } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#050505] overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-30 select-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-pink/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-cyan/20 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 h-16 border-b border-white/10 flex items-center justify-between px-8 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-neon-pink to-neon-cyan flex items-center justify-center p-[1px]">
             <div className="w-full h-full bg-[#050505] rounded flex items-center justify-center">
                 <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
             </div>
          </div>
          <h1 className="font-mono text-sm font-bold tracking-[0.4em] uppercase text-white/90">Neon Rhythm</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
           <a href="#" className="font-mono text-[10px] text-white/50 uppercase tracking-widest hover:text-neon-cyan transition-colors">Archive</a>
           <a href="#" className="font-mono text-[10px] text-white/50 uppercase tracking-widest hover:text-neon-pink transition-colors">Lab</a>
           <a href="#" className="font-mono text-[10px] text-white/50 uppercase tracking-widest hover:text-white transition-colors">About</a>
        </nav>

        <div className="flex items-center space-x-4 text-white/40">
           <button className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></button>
           <button className="hover:text-white transition-colors"><Github className="w-4 h-4" /></button>
           <div className="w-px h-4 bg-white/10 mx-2" />
           <button className="hover:text-white transition-colors"><Info className="w-4 h-4" /></button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row relative z-10">
        {/* Left Side: Game */}
        <section className="flex-1 lg:border-r border-white/10 flex items-center justify-center min-h-[500px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full"
          >
            <SnakeGame />
          </motion.div>
        </section>

        {/* Right Side: Music Player */}
        <section className="w-full lg:w-[400px] xl:w-[480px] flex items-center justify-center bg-white/[0.02]">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full h-full"
          >
            <MusicPlayer />
          </motion.div>
        </section>
      </main>

      {/* Footer Info */}
      <footer className="h-12 border-t border-white/5 px-8 flex items-center justify-between font-mono text-[9px] text-white/20 uppercase tracking-[0.2em] relative z-10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center space-x-6">
           <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
              <span>Core Stable</span>
           </div>
           <span>Latency: 22ms</span>
           <span>Uptime: 99.98%</span>
        </div>
        <div className="flex items-center space-x-6">
           <span>Build: 4.22.2026.A</span>
           <span>Device: 0x8A2F</span>
        </div>
      </footer>
    </div>
  );
}
