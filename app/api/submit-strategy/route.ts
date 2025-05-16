import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const flaskUrl = `${process.env.MT5_API_URL}/api/submit_strategy`;
    console.log("[Vercel] Haciendo POST a:", flaskUrl);
    console.log("[SUBMIT_STRATEGY]", `${process.env.MT5_API_URL}/api/submit_strategy`);
    const res = await fetch(`${process.env.MT5_API_URL}/api/submit_strategy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log("[Vercel] Código de respuesta Flask:", res.status);
    if (!res.ok) {
      const errorText = await res.text();
      console.error("[FLASK_ERROR]", errorText);
      return new NextResponse("Error desde Flask API", { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[INTERNAL_API_ERROR]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
