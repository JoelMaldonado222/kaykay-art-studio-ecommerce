import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20" as any,
});

// ✅ POST /api/checkout
export async function POST(req: Request) {
    try {
        const { items } = await req.json();

        if (!items || !Array.isArray(items) || items.length === 0) {
            console.error("❌ No items provided:", items);
            return NextResponse.json(
                { error: "No items provided for checkout" },
                { status: 400 }
            );
        }

        console.log("🧾 Checkout items received:", items);

        // ✅ Build Stripe line items (with absolute image URLs)
        const lineItems = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title || "Untitled",
                    images: item.imageSrc
                        ? [`${process.env.NEXT_PUBLIC_SITE_URL}${item.imageSrc}`]
                        : [],
                },
                unit_amount: Math.round((item.price || 5) * 100), // fallback $5
            },
            quantity: item.qty || 1,
        }));

        console.log("📦 Stripe line items:", lineItems);

        // ✅ Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: lineItems,
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
        });

        console.log("✅ Stripe session created:", session.url);
        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error("❌ Stripe Checkout Error:", err.message);
        console.error("Full Error Object:", err);
        return NextResponse.json(
            { error: "Failed to create checkout session", details: err.message },
            { status: 500 }
        );
    }
}
