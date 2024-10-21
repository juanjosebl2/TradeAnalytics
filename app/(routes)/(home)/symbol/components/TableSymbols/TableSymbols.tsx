"use client";

import React, { useEffect, useState } from "react";
import axios from "axios"; // Importa axios
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
        const res = await axios.get<SymbolData[]>("/api/symbols");
        setSymbols(res.data); 
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
    <div className="flex flex-col items-center lg:py-24">
      <h1 className="text-4xl font-bold pb-10">Lista de Símbolos</h1>
      <div className="w-full max-w-4xl mx-auto px-4">
        <Table className="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-lg">
          <TableCaption className="text-left p-4">
            Lista de símbolos
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[150px] py-4 px-6 text-left">
                Nombre
              </TableHead>
              <TableHead className="py-4 px-6 text-left">Bid</TableHead>
              <TableHead className="py-4 px-6 text-left">Ask</TableHead>
              <TableHead className="py-4 px-6 text-right">Spread</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {symbols.map((symbol, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6">
                  {symbol.name}
                </TableCell>
                <TableCell className="py-4 px-6">{symbol.bid}</TableCell>
                <TableCell className="py-4 px-6">{symbol.ask}</TableCell>
                <TableCell className="py-4 px-6 text-right">
                  {symbol.spread}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
