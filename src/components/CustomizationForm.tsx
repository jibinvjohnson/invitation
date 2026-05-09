"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

type Props = {
  template: any;
  user: any | null;
  formData: any;
  handleChange: (e: any) => void;
};

export default function CustomizationForm({ template, user, formData, handleChange }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      alert("Please login to customize and order.");
      router.push(`/auth/login?next=/templates/${template.id}`);
      return;
    }

    setLoading(true);
    try {
      // 1. Create order on server (Razorpay)
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: template.id, amount: template.price }),
      });
      const order = await res.json();

      if (order.error) throw new Error(order.error);

      // 2. Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: order.amount,
        currency: order.currency,
        name: "InviteNest",
        description: `Customization for ${template.title}`,
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Save order to Supabase
          const { error: dbError } = await supabase.from("orders").insert({
            user_id: user.id,
            template_id: template.id,
            status: "paid",
            payment_id: response.razorpay_payment_id,
            payment_signature: response.razorpay_signature,
            payment_order_id: response.razorpay_order_id,
            amount: template.price,
            customization_data: formData,
          });

          if (dbError) {
            console.error("Failed to save order:", dbError);
            alert("Payment successful but failed to save order. Contact support.");
          } else {
            // Redirect to confirmation and open WhatsApp
            const text = `Hi InviteNest! I just placed an order. Payment ID: ${response.razorpay_payment_id}. Please prepare my invitation for ${formData.partner1Name} & ${formData.partner2Name}.`;
            const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
            window.open(waUrl, "_blank");
            router.push("/order/success");
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#d19a3b",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 mt-8">
      <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Customize Your Invite</h3>
      
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Partner 1 Name</label>
            <input required type="text" name="partner1Name" value={formData.partner1Name} onChange={handleChange} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Partner 2 Name</label>
            <input required type="text" name="partner2Name" value={formData.partner2Name} onChange={handleChange} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Event Date</label>
            <input required type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Event Time</label>
            <input required type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Venue Address</label>
          <textarea required name="venue" value={formData.venue} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Typography Style</label>
            <select name="fontStyle" value={formData.fontStyle || "Serif"} onChange={handleChange} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none">
              <option>Classic Serif</option>
              <option>Modern Minimal</option>
              <option>Elegant Script</option>
              <option>Bold Sans</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Color Theme</label>
            <select name="colorTheme" value={formData.colorTheme || "Gold & White"} onChange={handleChange} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none">
              <option>Gold & White</option>
              <option>Royal Red & Gold</option>
              <option>Midnight & Silver</option>
              <option>Pastel Rose</option>
              <option>Emerald & Gold</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Language</label>
            <select name="language" value={formData.language} onChange={handleChange} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none">
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Music / Song Preference</label>
            <input type="text" name="musicRequirements" value={formData.musicRequirements} onChange={handleChange} placeholder="e.g. A Thousand Years - Christina Perri" className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Custom Message / Vows</label>
          <textarea name="customMessage" value={formData.customMessage} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="Enter a personal message for your guests..."></textarea>
        </div>

        {/* Script tag for Razorpay checkout */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>

        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-500">Total Amount</p>
            <p className="text-2xl font-bold text-stone-900">₹{template.price}</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-stone-900 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg shadow-stone-900/20 disabled:opacity-50"
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            Pay & Order Now
          </button>
        </div>
      </form>
    </div>
  );
}
