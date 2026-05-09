"use client";

import { motion } from "framer-motion";

export default function GoldFoilLayout({ template, formData }: { template: any, formData: any }) {
  return (
    <div className="relative min-h-full bg-stone-900 flex flex-col items-center justify-center p-12 text-center">
      {/* Luxury Background Patterns */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full"
      >
        <div className="w-16 h-16 mx-auto mb-10 border border-gold-400 rounded-full flex items-center justify-center text-gold-400 font-serif text-2xl italic">
          {formData.partner1?.[0]}{formData.partner2?.[0]}
        </div>

        <h2 className="text-gold-400 font-medium tracking-[0.5em] uppercase text-[10px] mb-8">Save The Date</h2>

        <h1 className="text-5xl font-serif text-white mb-6 tracking-tight">
          {formData.partner1} <br/>
          <span className="text-gold-500 font-light italic text-4xl">&</span> <br/>
          {formData.partner2}
        </h1>

        <div className="bg-gold-500/10 border-y border-gold-500/30 py-4 my-10">
          <p className="text-gold-400 font-bold tracking-[0.2em]">{formData.date}</p>
        </div>

        <p className="text-stone-400 text-sm font-light leading-loose tracking-widest max-w-[250px] mx-auto uppercase">
          {formData.venue}
        </p>

        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="mt-16 text-gold-500 text-xs font-bold tracking-widest border-b border-gold-500 pb-1 inline-block"
        >
          STRICTLY INVITATION ONLY
        </motion.div>
      </motion.div>
    </div>
  );
}
