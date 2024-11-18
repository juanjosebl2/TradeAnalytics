import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAdministrator } from "@/lib/isAdminitrador";
import { TableListHistories } from "./components/TableListHistories";

export default async function page() {
  const { userId } = auth();
  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const histories = await db.history.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      strategy: true, 
      modifiedParams: {
        include: {
          param: true, 
        },
      },
    },
  });
  

  return (
    <div>
      <h1 className="m-8 text-4xl font-bold text-center">
        Historial
      </h1>
      <TableListHistories histories={histories} />
    </div>
  );
}
