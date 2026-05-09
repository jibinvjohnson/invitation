import { createClient } from "@/lib/supabase/server";
import { DataService } from "@/lib/data-service";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart } from "lucide-react";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ search?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const { slug } = resolvedParams;
  const searchFilter = resolvedSearch.search;

  const supabase = await createClient();

  // Fetch categories to find current one
  const categories = await DataService.getCategories(supabase);
  const category = categories.find((c: any) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Fetch templates for this category
  const templates = await DataService.getTemplates(supabase, {
    category: slug,
    search: searchFilter
  });

  return (
    <div className="min-h-screen bg-[#fdfbf7] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-stone-900 mb-4">{category.name} Invitations</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">Browse our beautiful collection of {category.name.toLowerCase()} templates.</p>
        </div>

        {/* Search */}
        <div className="flex justify-end mb-12">
          <form className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              name="search"
              defaultValue={searchFilter || ""}
              placeholder="Search templates..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-full focus:ring-2 focus:ring-gold-500 outline-none text-sm"
            />
          </form>
        </div>

        {/* Grid */}
        {templates && templates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {templates.map((template: any) => (
              <Link href={`/templates/${template.id}`} key={template.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-stone-100">
                  <Image
                    src={template.image_url}
                    alt={template.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  {template.is_premium && (
                    <div className="absolute top-4 left-4 bg-gold-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow-md">
                      Premium
                    </div>
                  )}
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                    <Heart size={20} />
                  </button>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-gold-600 transition-colors">{template.title}</h3>
                  <p className="text-sm text-stone-500 mt-1">{template.categories?.name} • ₹{template.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-stone-900 mb-2">No templates found</h3>
            <p className="text-stone-500 mb-6">We couldn't find any templates in this category.</p>
            <Link href="/templates" className="px-6 py-2 bg-stone-900 text-white rounded-full font-medium hover:bg-gold-600 transition-colors">
              View All Templates
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
