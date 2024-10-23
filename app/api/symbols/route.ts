import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch('http://localhost:5000/api/symbols');
        
        if (!res.ok) {
            return new NextResponse("Error al obtener los símbolos de la API de Flask", { status: 500 });
        }

        const data = await res.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("[SYMBOLS_ERROR]", error);
        return new NextResponse("Error interno del servidor", { status: 500 });
    }
}
