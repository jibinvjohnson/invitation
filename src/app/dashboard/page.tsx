import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ExternalLink, Calendar, CreditCard } from "lucide-react";

export default async function UserDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/dashboard");
  }

  // Fetch user orders
  const { data: orders } = await supabase
    .from("orders")
    .select("*, templates(title, image_url)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#fdfbf7] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">My Invitations</h1>
          <p className="text-stone-600">View and manage your custom digital invites.</p>
        </header>

        {orders && orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-300 group">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-stone-50">
                  <img 
                    src={order.templates?.image_url} 
                    alt={order.templates?.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-stone-900 uppercase tracking-widest border border-stone-200">
                    {order.status}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">{order.templates?.title}</h3>
                    <p className="text-sm text-stone-500 mt-1 flex items-center gap-2">
                      <Calendar size={14} /> 
                      Ordered on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-stone-600">
                      <CreditCard size={16} />
                      <span className="text-sm font-medium">₹{order.amount}</span>
                    </div>
                    <Link 
                      href={`/templates/${order.template_id}`}
                      className="text-gold-600 hover:text-gold-700 text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      View Invite <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-stone-200">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="text-stone-300" size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">No invitations yet</h3>
            <p className="text-stone-500 mb-8 max-w-sm mx-auto">Start creating your first premium digital invitation today.</p>
            <Link href="/templates" className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gold-600 transition-all">
              Browse Templates
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
