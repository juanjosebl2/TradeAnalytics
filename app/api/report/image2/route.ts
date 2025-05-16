import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_MT5_API_KEY+'/api/report_image2', {
            method: 'GET',
            cache: "no-store",
        });
        
        if (!res.ok) {
            return new NextResponse("Error al obtener la imagen desde la API de Flask", { status: 500 });
        }

        const blob = await res.blob();
        
        return new Response(blob, {
            status: 200,
            headers: {
                "Content-Type": "image/png",
            },
        });
    } catch (error) {
        console.error("[IMAGE_ERROR]", error);
        return new NextResponse("Error interno del servidor", { status: 500 });
    }
}
