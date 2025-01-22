import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface StrategyParam {
    id: string;
    value: string;
}  

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { strategyId, globalParams, strategyParams, isSave } = await req.json();

    if (!strategyId) {
      return new NextResponse("Strategy ID is required", { status: 400 });
    }
    if (!globalParams || !strategyParams) {
      return new NextResponse("Global and Strategy Parameters are required", { status: 400 });
    }

    const history = await db.history.create({
      data: {
        userId,
        strategyId,
        currency: globalParams.currency,
        deposit: globalParams.deposit,
        leverage: globalParams.leverage,
        period: globalParams.period,
        fromDate: new Date(globalParams.fromDate),
        toDate: new Date(globalParams.toDate),
        symbol: globalParams.symbol,
        isSave: isSave || false, 
        modifiedParams: {
          create: strategyParams.map((param: StrategyParam) => ({
            paramId: param.id,
            modifiedValue: param.value,
          })),
        },
      },
    });

    return NextResponse.json({ message: "History created successfully", history }, { status: 201 });
  } catch (error) {
    console.error("[HISTORY]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}