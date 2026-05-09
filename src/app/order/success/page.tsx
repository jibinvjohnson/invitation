"use client";

import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-stone-100 text-center">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="text-green-600" size={40} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Order Confirmed!</h1>
        <p className="text-stone-600 mb-8">
          Thank you for choosing InviteNest. Your payment was successful and your order has been received.
        </p>

        <div className="bg-stone-50 p-4 rounded-2xl mb-8">
          <p className="text-sm text-stone-600 mb-2">
            Our team will begin customizing your premium invitation. We usually deliver within 24 hours.
          </p>
          <p className="text-sm font-medium text-stone-900">
            Check your WhatsApp for updates!
          </p>
        </div>

        <div className="space-y-4">
          <button 
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-xl font-medium transition-colors"
            onClick={() => {
              const waUrl = `https://wa.me/919876543210?text=Hi InviteNest! I just placed an order. Please update me on the status.`;
              if (typeof window !== 'undefined') window.open(waUrl, "_blank");
            }}
          >
            <MessageCircle size={20} />
            Contact us on WhatsApp
          </button>
          <Link href="/templates" className="block w-full px-6 py-3 border border-stone-200 rounded-xl font-medium text-stone-700 hover:bg-stone-50 transition-colors">
            Browse More Templates
          </Link>
        </div>
      </div>
    </div>
  );
}
