"use client";

import { motion } from "framer-motion";

export default function FloralBorderLayout({ template, formData }: { template: any, formData: any }) {
  return (
    <div className="relative min-h-full bg-[#fffcf5] p-8 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Floral Decorative Corners */}
      <div className="absolute -top-10 -left-10 w-48 h-48 opacity-20 pointer-events-none">
        <img src="https://www.transparentpng.com/download/floral/floral-free-download-transparent-31.png" className="w-full h-full object-contain rotate-90" />
      </div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-20 pointer-events-none">
        <img src="https://www.transparentpng.com/download/floral/floral-free-download-transparent-31.png" className="w-full h-full object-contain -rotate-90" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border-2 border-gold-200 p-8 rounded-full aspect-[4/5] flex flex-col items-center justify-center relative z-10"
      >
        <p className="text-gold-600 font-medium tracking-[0.3em] uppercase text-xs mb-6">You are invited to</p>
        
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2 leading-tight">
          {formData.partner1} <span className="text-gold-500 italic font-light">&</span> {formData.partner2}
        </h1>
        
        <p className="text-stone-500 font-serif italic text-lg mb-8">Wedding Celebration</p>

        <div className="w-12 h-[1px] bg-gold-300 mb-8"></div>

        <div className="space-y-2">
          <p className="text-stone-900 font-medium tracking-widest">{formData.date}</p>
          <p className="text-stone-500 text-sm uppercase tracking-widest">{formData.time}</p>
        </div>

        <p className="mt-8 text-stone-600 max-w-[200px] leading-relaxed text-sm">
          {formData.venue}
        </p>

        <p className="mt-10 text-[10px] text-gold-600 font-bold uppercase tracking-widest">Formal Attire</p>
      </motion.div>
    </div>
  );
}
