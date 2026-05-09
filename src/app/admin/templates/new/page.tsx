"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewTemplate() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    features: "RSVP Tracking, Mobile Optimized",
    font_style: "Playfair Display",
    is_premium: false,
    is_featured: false,
    is_trending: false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    supabase.from("categories").select("*").then(({ data }) => {
      if (data) {
        setCategories(data);
        if (data.length > 0) setFormData(f => ({ ...f, category_id: data[0].id }));
      }
    });
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let image_url = "/hero.png"; // Default fallback
      
      // Upload image if selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
          .from('templates')
          .upload(fileName, imageFile);
          
        if (uploadError) {
          console.warn("Storage upload failed, using fallback:", uploadError);
        } else {
          const { data: publicUrlData } = supabase.storage.from('templates').getPublicUrl(fileName);
          image_url = publicUrlData.publicUrl;
        }
      }

      // Insert template
      const { error: insertError } = await supabase.from("templates").insert({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: formData.category_id,
        features: formData.features.split(",").map(f => f.trim()),
        font_style: formData.font_style,
        is_premium: formData.is_premium,
        is_featured: formData.is_featured,
        is_trending: formData.is_trending,
        image_url,
        preview_image_url: image_url // Mock for now
      });

      if (insertError) throw insertError;
      
      alert("Template created successfully!");
      router.push("/admin/templates");
      router.refresh();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/templates" className="text-stone-400 hover:text-stone-900">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-serif font-bold text-stone-900">Add New Template</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
          <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
            <select required value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none bg-white">
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Price (₹)</label>
            <input required type="number" min="0" step="1" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
          <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Features (comma separated)</label>
            <input required type="text" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="RSVP, Custom Music" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Font Style</label>
            <input required type="text" value={formData.font_style} onChange={e => setFormData({...formData, font_style: e.target.value})} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="e.g. Playfair Display" />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 p-4 bg-stone-50 rounded-xl border border-stone-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData.is_premium} onChange={e => setFormData({...formData, is_premium: e.target.checked})} className="w-4 h-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded" />
            <span className="text-sm font-medium text-stone-900">Premium Template</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} className="w-4 h-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded" />
            <span className="text-sm font-medium text-stone-900">Featured Template</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData.is_trending} onChange={e => setFormData({...formData, is_trending: e.target.checked})} className="w-4 h-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded" />
            <span className="text-sm font-medium text-stone-900">Trending Template</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Thumbnail Image</label>
          <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-stone-50 transition-colors cursor-pointer relative">
            <input type="file" required accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setImageFile(e.target.files?.[0] || null)} />
            <Upload size={32} className="text-stone-400 mb-3" />
            <p className="text-sm font-medium text-stone-900">{imageFile ? imageFile.name : "Click to upload or drag and drop"}</p>
            <p className="text-xs text-stone-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-stone-900 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg shadow-stone-900/20 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Save Template"}
          </button>
        </div>
      </form>
    </div>
  );
}
