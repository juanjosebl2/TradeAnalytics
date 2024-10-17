import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params } : { params: { strategyId: string } }) {
    try {
        const { userId } = auth();
        const { strategyId } = params;
        const values =  await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const strategy = await db.strategy.update({
            where: {
                id: strategyId,
                userId
            },
            data: {
                ...values
            }
        });

        return NextResponse.json(strategy, { status: 201 });
    } catch (error) {
        console.error("[strategy FORM ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}