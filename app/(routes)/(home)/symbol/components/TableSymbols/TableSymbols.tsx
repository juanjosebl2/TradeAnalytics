"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SymbolData {
  name: string;
  bid: number;
  ask: number;
  spread: number;
}

export function TableSymbols() {
  const [symbols, setSymbols] = useState<SymbolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await fetch("/api/symbols");
        if (!res.ok) {
          throw new Error("Error al obtener los símbolos");
        }
        const data: SymbolData[] = await res.json();
        setSymbols(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSymbols();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center lg:py-24 ">
      <h1 className="text-4xl font-bold pb-10">Lista de Símbolos</h1>
      <div className="">
        <Table>
          <TableCaption>Lista simbolos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead>bid</TableHead>
              <TableHead>ask</TableHead>
              <TableHead className="text-right">spreed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {symbols.map((symbol, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{symbol.name}</TableCell>
                <TableCell>{symbol.bid}</TableCell>
                <TableCell>{symbol.ask}</TableCell>
                <TableCell className="text-right">{symbol.spread}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
