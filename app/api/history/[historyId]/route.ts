import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params } : { params: { historyId: string } }) {
    try {
        const { userId } = auth();
        const { historyId } = params;
        const { isSave } = await req.json();
  
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
  
        const history = await db.history.update({
            where: {
                id: historyId,
            },
            data: {
                isSave: isSave,
            }
        });
  
        return NextResponse.json(history, { status: 201 });
    } catch (error) {
        console.error("[history ID PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params } : { params: { historyId: string } }) {
    try {
        const { userId } = auth();
        const { historyId } = params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const history = await db.history.delete({
            where: {
                id: historyId,
            }
        });

        return NextResponse.json(history, { status: 201 });
    } catch (error) {
        console.error("[DELETE FORM ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}