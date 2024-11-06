import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FormProbeStrategy,
} from "./components/FormProbeStrategy";
import { auth } from "@clerk/nextjs/server";
import { isAdministrator } from "@/lib/isAdminitrador";
import { db } from "@/lib/db";

interface ProbeStrategyPageProps {
  searchParams: {
    id?: string;
  };
}

export default async function ProbeStrategyPage({
  searchParams,
}: ProbeStrategyPageProps) {
  const strategyId = searchParams.id;

  const { userId } = auth();
  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const strategy = await db.strategy.findFirst({
    where: {
      userId,
      id: strategyId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!strategy) {
    return <p>Estrategia no encontrada</p>;
  }

  const params = await db.param.findMany({
    where: {
      strategyId: strategy.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        Probar Estrategia: <span className="font-normal">{strategy.name}</span>
      </h1>
      <FormProbeStrategy strategy={strategy} params={params} />
      <div className="flex justify-start mt-5">
        <Link href={`/dashboard`}>
          <Button className="mt-4">Volver</Button>
        </Link>
      </div>
    </div>
  );
}
