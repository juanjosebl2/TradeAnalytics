"use client";

import React, { useEffect, useState } from "react";
import axios from "axios"; 
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
      <h1 className="pb-10 text-4xl font-bold">Lista de Símbolos</h1>
      <div className="w-full max-w-4xl px-4 mx-auto">
        <Table className="min-w-full bg-white divide-y divide-gray-200 rounded-lg shadow-lg">
          <TableCaption className="p-4 text-left">
            Lista de símbolos
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[150px] py-4 px-6 text-left">
                Nombre
              </TableHead>
              <TableHead className="px-6 py-4 text-left">Bid</TableHead>
              <TableHead className="px-6 py-4 text-left">Ask</TableHead>
              <TableHead className="px-6 py-4 text-right">Spread</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {symbols.map((symbol, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 font-medium">
                  {symbol.name}
                </TableCell>
                <TableCell className="px-6 py-4">{symbol.bid}</TableCell>
                <TableCell className="px-6 py-4">{symbol.ask}</TableCell>
                <TableCell className="px-6 py-4 text-right">
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
