import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAdministrator } from "@/lib/isAdminitrador";
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

  const params = await db.param.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  
  return (
    <div>
      <ListStrategies strategies={strategy} params={params}/>
    </div>
  );
}
