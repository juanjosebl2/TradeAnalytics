import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { strategyId, name, value} =  await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const param = await db.param.create({
            data: {
                strategyId: strategyId,
                name: name,
                value: value,
            }
        });

        return NextResponse.json(param, { status: 201 });
    } catch (error) {
        console.error("[PARAM]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}