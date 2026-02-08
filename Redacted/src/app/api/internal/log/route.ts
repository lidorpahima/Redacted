import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET;

/**
 * Backend (gateway) calls this to record each request: passed or blocked.
 * Protected by INTERNAL_API_SECRET. Used so the dashboard Logs page can show activity.
 */
export async function POST(req: Request) {
    const secret = req.headers.get("Internal-Secret");
    if (!INTERNAL_SECRET || secret !== INTERNAL_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await req.json();
        const { gatewayKey, status, violationReason, provider, model } = body as {
            gatewayKey?: string;
            status?: string;
            violationReason?: string;
            provider?: string;
            model?: string;
        };
        if (!gatewayKey || typeof gatewayKey !== "string" || !gatewayKey.trim()) {
            return NextResponse.json({ error: "gatewayKey is required" }, { status: 400 });
        }
        if (!status || (status !== "passed" && status !== "blocked")) {
            return NextResponse.json({ error: "status must be 'passed' or 'blocked'" }, { status: 400 });
        }
        await prisma.requestLog.create({
            data: {
                gatewayKey: gatewayKey.trim(),
                status,
                violationReason:
                    typeof violationReason === "string" ? violationReason.trim() || null : null,
                provider: typeof provider === "string" ? provider.trim() || null : null,
                model: typeof model === "string" ? model.trim() || null : null,
            },
        });
        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error("Internal log error:", e);
        return NextResponse.json({ error: "Failed to create log" }, { status: 500 });
    }
}
