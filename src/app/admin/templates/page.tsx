import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

export default async function AdminTemplates() {
  const supabase = await createClient();

  const { data: templates } = await supabase
    .from("templates")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Manage Templates</h1>
        <Link 
          href="/admin/templates/new" 
          className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-xl hover:bg-gold-600 transition-colors"
        >
          <Plus size={18} />
          <span>New Template</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 font-medium text-stone-600">Template</th>
              <th className="px-6 py-4 font-medium text-stone-600">Category</th>
              <th className="px-6 py-4 font-medium text-stone-600">Price</th>
              <th className="px-6 py-4 font-medium text-stone-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {templates?.map((template) => (
              <tr key={template.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-16 relative rounded overflow-hidden bg-stone-200">
                    <Image src={template.image_url} alt={template.title} fill className="object-cover" />
                  </div>
                  <span className="font-medium text-stone-900">{template.title}</span>
                </td>
                <td className="px-6 py-4 text-stone-600">{template.categories?.name}</td>
                <td className="px-6 py-4 font-medium text-stone-900">₹{template.price}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/templates/${template.id}/edit`} className="text-stone-400 hover:text-gold-600">
                      <Edit size={18} />
                    </Link>
                    <button className="text-stone-400 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!templates || templates.length === 0) && (
          <div className="p-8 text-center text-stone-500">No templates found. Create one to get started.</div>
        )}
      </div>
    </div>
  );
}
