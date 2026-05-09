"use client";

import { motion } from "framer-motion";
import ClassicLayout from "./layouts/ClassicLayout";
import CollageLayout from "./layouts/CollageLayout";
import RippedPaperLayout from "./layouts/RippedPaperLayout";
import SplitMinimalLayout from "./layouts/SplitMinimalLayout";

type Props = {
  template: any;
  formData: any;
};

export default function LivePreview({ template, formData }: Props) {
  const renderLayout = () => {
    switch (template.layout_type) {
      case "collage":
        return <CollageLayout template={template} formData={formData} />;
      case "ripped_paper":
        return <RippedPaperLayout template={template} formData={formData} />;
      case "split_minimal":
        return <SplitMinimalLayout template={template} formData={formData} />;
      default:
        return <ClassicLayout template={template} formData={formData} />;
    }
  };

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative bg-white border border-stone-100 group">
      {/* Phone Frame Mockup for Luxury Feel */}
      <div className="absolute inset-0 z-50 pointer-events-none border-[12px] border-stone-900 rounded-[3rem] hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-stone-900 rounded-b-2xl"></div>
      </div>
      
      <div className="w-full h-full overflow-y-auto scrollbar-hide bg-stone-50">
        {renderLayout()}
      </div>

      {/* Floating Badge */}
      {template.is_premium && (
        <div className="absolute top-6 left-6 z-40 bg-gold-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg">
          PREMIUM DESIGN
        </div>
      )}
    </div>
  );
}
