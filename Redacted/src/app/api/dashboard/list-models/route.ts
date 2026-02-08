import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const BACKEND_URL = (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");

/**
 * POST: list models from provider using user's API key (for dropdown).
 * Body: { provider: string, customerApiKey: string }
 * Returns: { models: { id: string, label: string }[] }
 */
export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await req.json().catch(() => ({}));
        const { provider, customerApiKey } = body as { provider?: string; customerApiKey?: string };
        if (!provider || !customerApiKey || typeof customerApiKey !== "string") {
            return NextResponse.json({ models: [] });
        }
        const res = await fetch(`${BACKEND_URL}/list-models`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ provider, api_key: customerApiKey.trim() }),
        });
        if (!res.ok) {
            const text = await res.text();
            return NextResponse.json(
                { error: text || "Failed to list models", models: [] },
                { status: res.status === 502 ? 502 : 500 }
            );
        }
        const data = await res.json();
        return NextResponse.json({ models: data.models ?? [] });
    } catch (e) {
        console.error("List models error:", e);
        return NextResponse.json({ models: [] }, { status: 500 });
    }
}
