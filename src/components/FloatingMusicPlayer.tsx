"use client";

import { motion } from "framer-motion";
import { Music, Play, Pause, Volume2 } from "lucide-react";
import { useState } from "react";

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 bg-white/80 backdrop-blur-md border border-stone-200 p-2 rounded-full shadow-xl"
    >
      <div className="flex items-center gap-2 px-3">
        <div className={`w-1.5 h-1.5 rounded-full bg-gold-500 ${isPlaying ? 'animate-pulse' : ''}`}></div>
        <p className="text-[10px] font-medium text-stone-600 uppercase tracking-widest">
          {isPlaying ? "Playing Romantic Theme" : "Music Paused"}
        </p>
      </div>
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-gold-600 transition-colors shadow-lg shadow-stone-900/20"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
      </button>
    </motion.div>
  );
}
