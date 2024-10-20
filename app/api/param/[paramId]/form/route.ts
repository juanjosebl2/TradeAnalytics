import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params } : { params: { paramId: string } }) {
    try {
        const { userId } = auth();
        const { paramId } = params;
        const values =  await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const param = await db.param.update({
            where: {
                id: paramId,
            },
            data: {
                ...values
            }
        });

        return NextResponse.json(param, { status: 201 });
    } catch (error) {
        console.error("[param FORM ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}