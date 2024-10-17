import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAdministrator } from "@/lib/isAdminitrador";
import { ButtonAddStrategy } from "./components/ButtonAddStrategy";
import { ListStrategies } from "./components/ListStrategies";

export default async function StrategiesManagerPage() {
  const { userId } = auth();
  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const strategy = await db.strategy.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Administrar estrategias</h2>
        <ButtonAddStrategy />
      </div>
      <ListStrategies strategies={strategy}/>
    </div>
  );
}
