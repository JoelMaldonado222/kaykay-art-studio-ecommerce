import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ✅ Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const lang = searchParams.get("lang"); // expected "en" or "es"

        // ✅ Build base query
        let query = supabase.from("lessons").select("*");

        // ✅ Filter by language if specified
        if (lang === "en" || lang === "es") {
            query = query.eq("language", lang);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Supabase query error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // ✅ Always return structured data for frontend
        return NextResponse.json({ lessons: data || [] }, { status: 200 });
    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
