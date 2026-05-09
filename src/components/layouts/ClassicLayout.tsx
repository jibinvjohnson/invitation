"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  template: any;
  formData: any;
};

export default function ClassicLayout({ template, formData }: Props) {
  const theme = template.theme_colors || { primary: "#D4AF37", secondary: "#FFFFFF" };
  const fontStyle = template.font_style || "serif";

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 text-center" style={{ backgroundColor: theme.secondary }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={JSON.stringify(formData)}
        className="max-w-md w-full space-y-8"
      >
        <div className="relative aspect-square w-48 mx-auto mb-12">
          <Image
            src={template.image_url}
            alt="Venue"
            fill
            className="object-cover rounded-full border-4 shadow-xl"
            style={{ borderColor: theme.primary }}
          />
        </div>

        <div className="space-y-4">
          <p className="uppercase tracking-[0.3em] text-xs font-semibold" style={{ color: theme.primary }}>
            Save the Date
          </p>
          <h1 className="text-4xl md:text-5xl font-serif" style={{ color: "#1c1917" }}>
            {formData.partner1Name} <span className="text-2xl font-light italic">&</span> {formData.partner2Name}
          </h1>
        </div>

        <div className="py-8 border-y" style={{ borderColor: `${theme.primary}20` }}>
          <p className="text-xl font-medium text-stone-800">
            {new Date(formData.eventDate || Date.now()).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-stone-500 mt-2">{formData.eventTime}</p>
        </div>

        <div className="space-y-2">
          <p className="font-serif text-lg text-stone-900">{formData.venue}</p>
          <p className="text-stone-500 text-sm max-w-xs mx-auto italic">
            "{formData.customMessage || "We invite you to celebrate with us!"}"
          </p>
        </div>

        <div className="pt-8">
          <div className="w-12 h-px mx-auto mb-4" style={{ backgroundColor: theme.primary }}></div>
          <p className="text-xs uppercase tracking-widest text-stone-400">InviteNest Premium</p>
        </div>
      </motion.div>
    </div>
  );
}
