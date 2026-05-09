"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  template: any;
  formData: any;
};

export default function RippedPaperLayout({ template, formData }: Props) {
  return (
    <div className="min-h-full bg-white flex flex-col">
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image src={template.image_url} alt="Cover" fill className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0% 100%, 5% 80%, 10% 100%, 15% 75%, 20% 100%, 25% 85%, 30% 100%, 35% 70%, 40% 100%, 45% 80%, 50% 100%, 55% 75%, 60% 100%, 65% 85%, 70% 100%, 75% 70%, 80% 100%, 85% 80%, 90% 100%, 95% 75%, 100% 100%)" }}></div>
      </div>

      <div className="flex-1 p-8 text-center space-y-10 relative">
        <motion.div
          key={formData.partner1Name}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-serif italic text-stone-900">{formData.partner1Name}</h1>
          <p className="text-gold-600 font-light text-2xl">&</p>
          <h1 className="text-5xl font-serif italic text-stone-900">{formData.partner2Name}</h1>
        </motion.div>

        <div className="relative inline-block px-12 py-6 border-x border-stone-200">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-stone-300"></div>
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-px bg-stone-300"></div>
           <p className="text-xl font-medium tracking-tight text-stone-800 uppercase">
             {new Date(formData.eventDate || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
           </p>
           <p className="text-stone-500 mt-1">{formData.eventTime}</p>
        </div>

        <div className="space-y-4">
          <p className="text-stone-600 max-w-xs mx-auto leading-relaxed">{formData.venue}</p>
          <div className="pt-8 opacity-40">
            <p className="text-[10px] tracking-[0.4em] uppercase">Premium Nest Design</p>
          </div>
        </div>
      </div>
    </div>
  );
}
