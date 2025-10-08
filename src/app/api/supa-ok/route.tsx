import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "missing";
    const hasKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    return NextResponse.json({
        ok: true,
        supabaseUrlStartsWith: url.slice(0, 30) + "...",
        hasAnonKey: hasKey,
        note: "Client initialized successfully.",
    });
}
