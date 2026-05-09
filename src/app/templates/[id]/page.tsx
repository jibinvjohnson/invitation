import { createClient } from "@/lib/supabase/server";
import { DataService } from "@/lib/data-service";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import TemplateCustomizer from "@/components/TemplateCustomizer";
import { Check } from "lucide-react";

export default async function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const supabase = await createClient();
  
  // Fetch template
  const template = await DataService.getTemplateById(supabase, id);

  if (!template) {
    notFound();
  }

  // Fetch related templates
  const relatedTemplates = await DataService.getTemplates(supabase, {
    category: template.categories?.slug,
    limit: 4
  });

  // Check auth status
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#fdfbf7] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TemplateCustomizer template={template} user={user} />

        {/* Related Templates */}
        {relatedTemplates && relatedTemplates.length > 0 && (
          <div className="mt-32 border-t border-stone-200 pt-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {relatedTemplates.map((rel: any) => (
                <Link href={`/templates/${rel.id}`} key={rel.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-stone-100">
                    <Image
                      src={rel.image_url}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    {rel.is_premium && (
                      <div className="absolute top-4 left-4 bg-gold-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow-md">
                        Premium
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-gold-600 transition-colors truncate">{rel.title}</h3>
                    <p className="text-sm text-stone-500 mt-1">{rel.categories?.name} • ₹{rel.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
