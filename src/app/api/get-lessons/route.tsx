import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang"); // expected "en" or "es"

    let query = supabase.from("lessons").select("*");
    if (lang === "en" || lang === "es") {
        query = query.eq("language", lang);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}
