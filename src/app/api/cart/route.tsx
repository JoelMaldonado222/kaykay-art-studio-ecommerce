import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// -------------------
// GET /api/cart?user_id=...
// -------------------
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
        return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from("cart_items")
        .select("id, user_id, quantity, lesson:lessons(*)")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ items: data });
}

// -------------------
// POST /api/cart
// body: { user_id, lesson_id, quantity? }
// -------------------
export async function POST(req: Request) {
    const body = await req.json().catch(() => null);
    if (!body?.user_id || !body?.lesson_id) {
        return NextResponse.json(
            { error: "user_id and lesson_id required" },
            { status: 400 }
        );
    }

    const quantity = body.quantity && body.quantity > 0 ? body.quantity : 1;

    // Check if the item already exists for this user
    const { data: existing, error: findErr } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", body.user_id)
        .eq("lesson_id", body.lesson_id)
        .maybeSingle();

    if (findErr) {
        return NextResponse.json({ error: findErr.message }, { status: 500 });
    }

    if (existing) {
        // Update quantity if it already exists
        const { error: updErr } = await supabase
            .from("cart_items")
            .update({ quantity: existing.quantity + quantity })
            .eq("id", existing.id);

        if (updErr) {
            return NextResponse.json({ error: updErr.message }, { status: 500 });
        }
        return NextResponse.json({ ok: true, updated: true });
    }

    // Otherwise insert new row
    const { error: insErr } = await supabase
        .from("cart_items")
        .insert({
            user_id: body.user_id,
            lesson_id: body.lesson_id,
            quantity,
        });

    if (insErr) {
        return NextResponse.json({ error: insErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, created: true });


}
// -------------------
// DELETE /api/cart
// body: { user_id, lesson_id? }
// -------------------
export async function DELETE(req: Request) {
    const body = await req.json().catch(() => null);
    if (!body?.user_id) {
        return NextResponse.json({ error: "user_id required" }, { status: 400 });
    }

    let query = supabase.from("cart_items").delete().eq("user_id", body.user_id);

    if (body.lesson_id) {
        query = query.eq("lesson_id", body.lesson_id);
    }

    const { error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
}

