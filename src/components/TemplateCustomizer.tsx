"use client";

import { useState } from "react";
import CustomizationForm from "./CustomizationForm";
import LivePreview from "./LivePreview";

type Props = {
  template: any;
  user: any | null;
};

export default function TemplateCustomizer({ template, user }: Props) {
  const [formData, setFormData] = useState({
    partner1Name: "Partner 1",
    partner2Name: "Partner 2",
    eventDate: "2026-12-31",
    eventTime: "18:00",
    venue: "Grand Palace Hotel, NYC",
    language: "English",
    musicRequirements: "",
    customMessage: "We invite you to share our joy as we celebrate our union.",
    fontStyle: "Classic Serif",
    colorTheme: "Gold & White",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Live Preview Panel */}
      <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] mb-12 lg:mb-0">
        <LivePreview template={template} formData={formData} />
      </div>

      {/* Details & Form Panel */}
      <div>
        <div className="mb-6">
          <p className="text-gold-600 font-medium mb-2">{template.categories?.name}</p>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-stone-900 mb-4">{template.title}</h1>
          <p className="text-2xl font-bold text-stone-900 mb-6">₹{template.price}</p>
          <p className="text-stone-600 leading-relaxed mb-8">{template.description}</p>
        </div>

        <CustomizationForm 
          template={template} 
          user={user} 
          formData={formData} 
          handleChange={handleChange} 
        />
      </div>
    </div>
  );
}
