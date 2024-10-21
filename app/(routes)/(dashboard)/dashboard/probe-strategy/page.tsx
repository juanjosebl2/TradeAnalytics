"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Strategy } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProbeStrategyPage() {
  const searchParams = useSearchParams();
  const strategyId = searchParams.get("id");
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchStrategy = async () => {
      if (!strategyId) return;

      try {
        const response = await axios.get(`/api/strategy/${strategyId}`);
        setStrategy(response.data);
        setName(response.data.name); // Inicializamos el nombre y descripción
        setDescription(response.data.description);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching strategy:", error);
        setLoading(false);
      }
    };

    fetchStrategy();
  }, [strategyId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Enviando datos al servidor de Flask..."); // Verificar si se ejecuta

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/submit_strategy", {
        name,
        description,
      });
      console.log("Estrategia enviada correctamente", response.data); // Verificación
      alert("Estrategia enviada correctamente a Python");
    } catch (error) {
      console.error("Error enviando estrategia:", error);
    }
  };

  if (loading) {
    return <p>Cargando estrategia...</p>;
  }

  if (!strategy) {
    return <p>Estrategia no encontrada</p>;
  }

  return (
    <div>
      <h1>Probar Estrategia</h1>
      <form onSubmit={handleSubmit}>
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
      </form>
      <Link href={`/dashboard`}>
        <Button>Volver</Button>
      </Link>
    </div>
  );
}
