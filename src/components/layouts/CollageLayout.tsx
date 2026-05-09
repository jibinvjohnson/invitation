"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  template: any;
  formData: any;
};

export default function CollageLayout({ template, formData }: Props) {
  const theme = template.theme_colors || { primary: "#D4AF37", secondary: "#FFFFFF" };

  return (
    <div className="min-h-full bg-stone-50 p-6 flex flex-col items-center">
      <div className="grid grid-cols-2 gap-3 w-full mb-8">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg transform -rotate-2">
          <Image src={template.image_url} alt="Photo 1" fill className="object-cover" />
        </div>
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg translate-y-8 transform rotate-3">
          <Image src="/hero.png" alt="Photo 2" fill className="object-cover" />
        </div>
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg -translate-y-4">
          <Image src="/christian.png" alt="Photo 3" fill className="object-cover" />
        </div>
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg transform -rotate-3 translate-y-4">
          <Image src="/hindu.png" alt="Photo 4" fill className="object-cover" />
        </div>
      </div>

      <motion.div 
        key={JSON.stringify(formData)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mt-12 space-y-4"
      >
        <h2 className="font-serif text-3xl text-stone-900">
          {formData.partner1Name} <br />
          <span className="text-gold-600 font-light">&</span> <br />
          {formData.partner2Name}
        </h2>
        <div className="w-8 h-px bg-gold-400 mx-auto"></div>
        <p className="text-stone-500 uppercase tracking-widest text-xs">{formData.eventDate} • {formData.eventTime}</p>
        <p className="text-stone-800 font-medium">{formData.venue}</p>
      </motion.div>
    </div>
  );
}
