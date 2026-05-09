import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { count: orderCount } = await supabase.from("orders").select("*", { count: 'exact', head: true });
  const { count: templateCount } = await supabase.from("templates").select("*", { count: 'exact', head: true });
  const { count: userCount } = await supabase.from("profiles").select("*", { count: 'exact', head: true });

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*, profiles(full_name, email), templates(title)")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 text-sm font-medium mb-2">Total Orders</p>
          <p className="text-3xl font-bold text-stone-900">{orderCount || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 text-sm font-medium mb-2">Total Templates</p>
          <p className="text-3xl font-bold text-stone-900">{templateCount || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 text-sm font-medium mb-2">Total Customers</p>
          <p className="text-3xl font-bold text-stone-900">{userCount || 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50">
          <h2 className="font-semibold text-stone-900">Recent Orders</h2>
        </div>
        <div className="divide-y divide-stone-200">
          {recentOrders && recentOrders.length > 0 ? recentOrders.map((order: any) => (
            <div key={order.id} className="p-6 flex items-center justify-between">
              <div>
                <p className="font-medium text-stone-900">{order.templates?.title}</p>
                <p className="text-sm text-stone-500">{order.profiles?.full_name} • {order.profiles?.email}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-stone-900">₹{order.amount}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          )) : (
            <div className="p-6 text-center text-stone-500">No recent orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
