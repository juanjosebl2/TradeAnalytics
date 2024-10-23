import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Strategy } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormProbeStrategy } from "./components/FormProbeStrategy";
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
  // const [strategy, setStrategy] = useState<Strategy | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

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
      createdAt: "desc",
    },
  });

  // useEffect(() => {
  //   const fetchStrategy = async () => {
  //     if (!strategyId) return;

  //     try {
  //       const response = await axios.get(`/api/strategy/${strategyId}`);
  //       // const strategy = response.data
  //       setStrategy(response.data);
  //       setName(response.data.name);
  //       setDescription(response.data.description);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching strategy:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchStrategy();
  // }, [strategyId]);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("Enviando datos al servidor de Flask..."); // Verificar si se ejecuta

  //   try {
  //     const response = await axios.post("http://127.0.0.1:5000/api/submit_strategy", {
  //       name,
  //       description,
  //     });
  //     console.log("Estrategia enviada correctamente", response.data); // Verificación
  //     alert("Estrategia enviada correctamente a Python");
  //   } catch (error) {
  //     console.error("Error enviando estrategia:", error);
  //   }
  // };

  // if (loading) {
  //   return <p>Cargando estrategia...</p>;
  // }

  // if (!strategy) {
  //   return <p>Estrategia no encontrada</p>;
  // }

  return (
    <div>
      <h1 className="font-bold mb-4">Probar Estrategia</h1>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la Estrategia</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mb-2"
          />
        </div>
        <div>
          <label>Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 mb-2"
          />
        </div>
        <Button type="submit">Enviar Estrategia</Button>
      </form> */}
      {/* <p>{strategy.name}</p> */}
      <FormProbeStrategy strategy={strategy} params={params} />
      <div className="flex justify-start mt-5">
        <Link href={`/dashboard`}>
          <Button className="mt-4">Volver</Button>
        </Link>
      </div>
    </div>
  );
}
