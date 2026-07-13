import { createClient } from '@supabase/supabase-js'

export async function handler(event) {
    try {
        if (event.httpMethod !== "GET") {
            return { statusCode: 405, body: "Method Not Allowed" };
        }

        const supabaseUrl = process.env.SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_KEY
        
        if (!supabaseUrl || !supabaseKey) {
            console.error("❌ Missing Supabase credentials");
            return { statusCode: 500, body: "Server configuration error" };
        }

        const supabase = createClient(supabaseUrl, supabaseKey)

        const { data, error } = await supabase
            .from("n8nWorkflows")
            .select("*")
            .order('id', { ascending: true });

        if (error) {
            console.error("❌ Supabase error:", error);
            return { statusCode: 500, body: JSON.stringify(error) };
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data || []),
        };
    } catch (err) {
        console.error("❌ Function error:", err);
        return { statusCode: 500, body: "Internal Server Error" };
    }
}
