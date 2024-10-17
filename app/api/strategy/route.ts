import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const data =  await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const strategy = await db.strategy.create({
            data: {
                userId,
                ...data
            }
        });

        return NextResponse.json(strategy, { status: 201 });
    } catch (error) {
        console.error("[STRATEGY]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}