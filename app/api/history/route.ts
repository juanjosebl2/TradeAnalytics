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
                ...data
            }
        });

        return NextResponse.json(strategy, { status: 201 });
    } catch (error) {
        console.error("[STRATEGY]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";


// export async function POST(req: Request) {
//     try {
//         const { userId } = auth();
//         const { strategyId, name, description, value, min_value, max_value} =  await req.json();

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         const param = await db.param.create({
//             data: {
//                 strategyId: strategyId,
//                 name: name,
//                 description: description ? description : null,
//                 value: value,
//                 min_filter_value: min_value ? min_value : null,
//                 max_filter_value: max_value ? max_value : null,
//             }
//         });

//         return NextResponse.json(param, { status: 201 });
//     } catch (error) {
//         console.error("[PARAM]", error);
//         return new NextResponse("Internal Server Error", { status: 500 });
//     }
// }