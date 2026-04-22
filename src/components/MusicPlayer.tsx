import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface Track {
  id: number;
  title: string;
  artist: string;
  color: string;
  duration: string;
}

export const DUMMY_TRACKS: Track[] = [
  { id: 1, title: 'Neon Pulse', artist: 'AI Synth', color: 'from-neon-pink to-neon-purple', duration: '3:45' },
  { id: 2, title: 'Midnight Drive', artist: 'Lofi Core', color: 'from-neon-cyan to-blue-600', duration: '4:20' },
  { id: 3, title: 'Digital Dream', artist: 'Techno Mind', color: 'from-neon-green to-teal-600', duration: '2:58' },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Frequency Unit 01</h2>
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1 h-3 bg-neon-cyan/30 rounded-full overflow-hidden">
               <motion.div 
                animate={{ height: isPlaying ? ['20%', '100%', '40%'] : '20%' }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                className="w-full bg-neon-cyan"
               />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack.id}
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.2, opacity: 0, rotate: 10 }}
            className={`w-48 h-48 rounded-2xl bg-gradient-to-br ${currentTrack.color} shadow-2xl relative group overflow-hidden`}
          >
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
             <div className="absolute inset-0 flex items-center justify-center">
                <Music className="w-16 h-16 text-white/40 group-hover:text-white/80 transition-colors" />
             </div>
             {/* Neon Rim Glow */}
             <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        <div className="text-center space-y-1">
          <motion.h3 
            key={currentTrack.title}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-semibold tracking-tight"
          >
            {currentTrack.title}
          </motion.h3>
          <p className="text-sm text-white/50 font-mono uppercase tracking-widest">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Progress Bar (Mock) */}
        <div className="space-y-2">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden relative">
            <motion.div 
              animate={{ width: isPlaying ? '100%' : '30%' }}
              transition={{ duration: isPlaying ? 100 : 0.5, ease: "linear" }}
              className={`h-full bg-gradient-to-r ${currentTrack.color}`} 
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-white/30">
            <span>01:24</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-8">
          <button onClick={handlePrev} className="p-2 text-white/60 hover:text-white transition-colors">
            <SkipBack className="w-6 h-6" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-full glass-panel flex items-center justify-center border-white/20 hover:border-white/40 hover:scale-105 transition-all group"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-neon-cyan" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 text-neon-pink translate-x-0.5" fill="currentColor" />
            )}
          </button>
          <button onClick={handleNext} className="p-2 text-white/60 hover:text-white transition-colors">
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
