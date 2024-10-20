import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params } : { params: { paramId: string } }) {
    try {
        const { userId } = auth();
        const { paramId } = params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const param = await db.param.delete({
            where: {
                id: paramId,
            }
        });

        return NextResponse.json(param, { status: 201 });
    } catch (error) {
        console.error("[DELETE FORM ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}