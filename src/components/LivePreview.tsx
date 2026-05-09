"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ClassicLayout from "./layouts/ClassicLayout";
import CollageLayout from "./layouts/CollageLayout";
import RippedPaperLayout from "./layouts/RippedPaperLayout";
import SplitMinimalLayout from "./layouts/SplitMinimalLayout";
import FloralBorderLayout from "./layouts/FloralBorderLayout";
import GoldFoilLayout from "./layouts/GoldFoilLayout";
import FloatingMusicPlayer from "./FloatingMusicPlayer";

type Props = {
  template: any;
  formData: any;
};

export default function LivePreview({ template, formData }: Props) {
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("mobile");

  const renderLayout = () => {
    switch (template.layout_type) {
      case "collage":
        return <CollageLayout template={template} formData={formData} />;
      case "ripped_paper":
        return <RippedPaperLayout template={template} formData={formData} />;
      case "split_minimal":
        return <SplitMinimalLayout template={template} formData={formData} />;
      case "floral_border":
        return <FloralBorderLayout template={template} formData={formData} />;
      case "gold_foil":
        return <GoldFoilLayout template={template} formData={formData} />;
      default:
        return <ClassicLayout template={template} formData={formData} />;
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-center gap-4 mb-6">
        <button 
          onClick={() => setPreviewMode('mobile')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${previewMode === 'mobile' ? 'bg-stone-900 text-white shadow-lg' : 'bg-white text-stone-600 border border-stone-200'}`}
        >
          Mobile View
        </button>
        <button 
          onClick={() => setPreviewMode('desktop')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${previewMode === 'desktop' ? 'bg-stone-900 text-white shadow-lg' : 'bg-white text-stone-600 border border-stone-200'}`}
        >
          Desktop View
        </button>
      </div>

      <div className={`relative transition-all duration-700 
        ${previewMode === 'mobile' ? 'aspect-[9/19] max-w-[375px]' : 'aspect-video max-w-full'}
        mx-auto rounded-[2rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl bg-white 
        border-4 lg:border-[12px] border-stone-900 group`}>
        
        {/* Phone Notch - Hidden on very small screens or if not in mobile mode */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 lg:w-32 h-4 lg:h-6 bg-stone-900 rounded-b-2xl z-50"></div>
        
        <div className="w-full h-full overflow-y-auto scrollbar-hide bg-stone-50 relative">
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>
          
          {renderLayout()}
        </div>

        <FloatingMusicPlayer />

        {/* Floating Badge */}
        {template.is_premium && (
          <div className="absolute top-10 left-6 z-40 bg-gold-600 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider shadow-lg">
            PREMIUM DESIGN
          </div>
        )}
      </div>
    </div>
  );
}
