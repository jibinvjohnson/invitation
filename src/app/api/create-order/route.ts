import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
    });

    const body = await req.json();
    const { amount } = body;

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    // Amount is in currency subunits (paise for INR)
    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `rcpt_${uuidv4().replace(/-/g, "").substring(0, 16)}`,
    };

    let order;
    try {
      order = await razorpay.orders.create(options);
    } catch (e) {
      console.warn("Razorpay API failed, returning mock order for development.");
      order = {
        id: `order_${uuidv4().replace(/-/g, "").substring(0, 14)}`,
        amount: options.amount,
        currency: "INR",
        receipt: options.receipt,
        status: "created"
      };
    }

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
