import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, ShoppingBag, Users, LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  let user = null;

  try {
    const { data } = await supabase.auth.getUser();
    user = data?.user;
  } catch(e) {}

  // Uncomment when real db is set
  // if (!user) {
  //   redirect("/auth/login");
  // }
  // const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-stone-200 fixed h-full flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-stone-200">
          <Link href="/admin" className="font-serif text-xl font-bold text-stone-900">
            InviteNest <span className="text-gold-600">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-stone-600 rounded-xl hover:bg-stone-50 hover:text-gold-600 transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/templates" className="flex items-center gap-3 px-4 py-3 text-stone-600 rounded-xl hover:bg-stone-50 hover:text-gold-600 transition-colors">
            <ImageIcon size={20} />
            <span className="font-medium">Templates</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-stone-600 rounded-xl hover:bg-stone-50 hover:text-gold-600 transition-colors">
            <ShoppingBag size={20} />
            <span className="font-medium">Orders</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
