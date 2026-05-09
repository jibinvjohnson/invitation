"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  template: any;
  formData: any;
};

export default function SplitMinimalLayout({ template, formData }: Props) {
  return (
    <div className="min-h-full flex flex-col md:flex-row bg-[#1a1a1a]">
      <div className="h-[50vh] md:h-auto md:w-1/2 relative grayscale">
        <Image src={template.image_url} alt="Cover" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="flex-1 p-12 flex flex-col justify-center text-white space-y-12">
        <motion.div
          key={JSON.stringify(formData)}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-6"
        >
          <div className="space-y-1">
            <p className="text-gold-500 uppercase tracking-widest text-xs font-bold">The Wedding Of</p>
            <h2 className="text-4xl lg:text-6xl font-serif leading-tight">
              {formData.partner1Name} <br />
              & {formData.partner2Name}
            </h2>
          </div>

          <div className="h-px w-12 bg-gold-500"></div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
               <span className="text-5xl font-serif italic text-gold-500">
                 {new Date(formData.eventDate || Date.now()).getDate()}
               </span>
               <div className="text-xs uppercase tracking-tighter opacity-70">
                 {new Date(formData.eventDate || Date.now()).toLocaleDateString('en-US', { month: 'long' })} <br />
                 {new Date(formData.eventDate || Date.now()).getFullYear()}
               </div>
            </div>
            
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              {formData.venue} <br />
              Starting at {formData.eventTime}
            </p>
          </div>

          <p className="text-stone-500 text-sm italic">
            "{formData.customMessage}"
          </p>
        </motion.div>
      </div>
    </div>
  );
}
