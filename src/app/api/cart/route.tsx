import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// -------------------
// GET /api/cart?user_id=...
// -------------------
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get("user_id");

        if (!user_id) {
            return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("cart_items")
            .select(
                `
        id,
        user_id,
        quantity,
        created_at,
        lessons:lesson_id (
          id,
          title,
          language,
          level,
          image_path,
          youtube_url,
          is_paid,
          price
        )
      `
            )
            .eq("user_id", user_id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase GET error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ items: data }, { status: 200 });
    } catch (err) {
        console.error("Unhandled GET error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// -------------------
// POST /api/cart
// body: { user_id, lesson_id, quantity? }
// -------------------
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { user_id, lesson_id, quantity = 1 } = body || {};

        if (!user_id || !lesson_id) {
            return NextResponse.json(
                { error: "user_id and lesson_id are required" },
                { status: 400 }
            );
        }

        // Check if already exists
        const { data: existing, error: findErr } = await supabase
            .from("cart_items")
            .select("id, quantity")
            .eq("user_id", user_id)
            .eq("lesson_id", lesson_id)
            .maybeSingle();

        if (findErr) {
            console.error("Supabase select error:", findErr.message);
            return NextResponse.json({ error: findErr.message }, { status: 500 });
        }

        if (existing) {
            // Update existing item
            const { error: updErr } = await supabase
                .from("cart_items")
                .update({ quantity: (existing.quantity ?? 0) + quantity })
                .eq("id", existing.id);

            if (updErr) {
                console.error("Supabase update error:", updErr.message);
                return NextResponse.json({ error: updErr.message }, { status: 500 });
            }

            return NextResponse.json({ ok: true, updated: true });
        }

        // Otherwise insert a new item
        const { error: insErr } = await supabase.from("cart_items").insert({
            user_id,
            lesson_id,
            quantity,
        });

        if (insErr) {
            console.error("Supabase insert error:", insErr.message);
            return NextResponse.json({ error: insErr.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true, created: true });
    } catch (err) {
        console.error("Unhandled POST error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// -------------------
// DELETE /api/cart
// body: { user_id, lesson_id? }
// -------------------
export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { user_id, lesson_id } = body || {};

        if (!user_id) {
            return NextResponse.json({ error: "user_id required" }, { status: 400 });
        }

        let query = supabase.from("cart_items").delete().eq("user_id", user_id);

        if (lesson_id) {
            query = query.eq("lesson_id", lesson_id);
        }

        const { error } = await query;

        if (error) {
            console.error("Supabase delete error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
        console.error("Unhandled DELETE error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
