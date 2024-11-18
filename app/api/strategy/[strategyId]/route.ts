import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params } : { params: { strategyId: string } }) {
  try {
      const { userId } = auth();
      const { strategyId } = params;
      const { isPublic } = await req.json();

      if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 });
      }

      const strategy = await db.strategy.update({
          where: {
              id: strategyId,
          },
          data: {
              isPublic: isPublic,
          }
      });

      return NextResponse.json(strategy, { status: 201 });
  } catch (error) {
      console.error("[strategy ID PATCH]", error);
      return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { strategyId: string } }) {
    try {
      const { userId } = auth();
      const { strategyId } = params;
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const strategy = await db.strategy.findUnique({
        where: {
          id: strategyId,
        },
      });
  
      if (!strategy) {
        return new NextResponse("Strategy not found", { status: 404 });
      }
  
      return NextResponse.json(strategy, { status: 200 });
    } catch (error) {
      console.error("[strategy GET]", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

export async function DELETE(req: Request, { params } : { params: { strategyId: string } }) {
    try {
        const { userId } = auth();
        const { strategyId } = params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const strategy = await db.strategy.delete({
            where: {
                id: strategyId,
            }
        });

        return NextResponse.json(strategy, { status: 201 });
    } catch (error) {
        console.error("[DELETE FORM ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}