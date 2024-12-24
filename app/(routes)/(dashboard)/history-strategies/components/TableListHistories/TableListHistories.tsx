"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Upload, BadgeX } from "lucide-react";
import { TableListHistoriesProps } from "./TableListHistories.types";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export function TableListHistories({ histories }: TableListHistoriesProps) {
  const router = useRouter();

  const groupedByStrategy = histories.reduce((acc, history) => {
    const strategyName = history.strategy?.name || "Sin Estrategia";
    if (!acc[strategyName]) acc[strategyName] = [];
    acc[strategyName].push(history);
    return acc;
  }, {} as Record<string, typeof histories>);

  const handleSaveParams = async (save: boolean, id: string) => {
    try {
      await axios.patch(`/api/history/${id}`, { isSave: save });
      if (save) {
        toast({
          title: "Parametros guardados correctamente",
        });
      } else {
        toast({
          title: "Parametros borrados correctamente",
        });
      }
      router.refresh();
    } catch (error) {
      toast({
        title: "Error al guardar los parametros" + error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedByStrategy).map(
        ([strategyName, strategyHistories]) => {
          const uniqueParams = Array.from(
            new Set(
              strategyHistories.flatMap((history) =>
                history.modifiedParams.map(
                  (param) => param.param?.name || "Sin nombre"
                )
              )
            )
          );

          return (
            <div key={strategyName} className="mx-auto overflow-x-auto max-w-screen-2xl">
              <Table className="min-w-full bg-gray-100 divide-y divide-gray-200">
                <TableCaption>Estrategia: {strategyName}</TableCaption>
                <TableHeader>
                  <TableRow className="bg-blue-100">
                    <TableHead
                      rowSpan={2}
                      className="text-gray-700 border border-gray-300"
                    >
                      Estrategia
                    </TableHead>
                    <TableHead
                      colSpan={7}
                      className="text-center text-gray-700 border border-gray-300"
                    >
                      Configuración Básica
                    </TableHead>
                    <TableHead
                      colSpan={uniqueParams.length}
                      className="text-center text-gray-700 border border-gray-300"
                    >
                      Configuración de la estrategia
                    </TableHead>
                    <TableHead
                      rowSpan={2}
                      className="text-center text-gray-700 border border-gray-300"
                    >
                      Realizado
                    </TableHead>
                    <TableHead
                      rowSpan={2}
                      className="text-right text-gray-700 border border-gray-300"
                    >
                      Acciones
                    </TableHead>
                  </TableRow>
                  <TableRow className="bg-gray-100">
                    <TableHead className="text-gray-600 border border-gray-300">
                      Simbolo
                    </TableHead>
                    <TableHead className="text-gray-600 border border-gray-300">
                      Divisa
                    </TableHead>
                    <TableHead className="text-gray-600 border border-gray-300">
                      Depósito
                    </TableHead>
                    <TableHead className="text-gray-600 border border-gray-300">
                      Apalancamiento
                    </TableHead>
                    <TableHead className="text-gray-600 border border-gray-300">
                      Periodo
                    </TableHead>
                    <TableHead className="text-gray-600 border border-gray-300">
                      Fecha inicio
                    </TableHead>
                    <TableHead className="text-gray-600 border border-gray-300">
                      Fecha fin
                    </TableHead>
                    {uniqueParams.map((paramName, index) => (
                      <TableHead
                        key={`param-name-${index}`}
                        className="text-gray-600 border border-gray-300"
                      >
                        {paramName}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                  {strategyHistories.map((historie, index) => (
                    <TableRow
                      key={historie.id}
                      className="border border-gray-300"
                    >
                      {index === 0 && (
                        <TableCell
                          rowSpan={strategyHistories.length}
                          className="font-bold text-center border border-gray-300 bg-gray-50"
                        >
                          {strategyName}
                        </TableCell>
                      )}
                      <TableCell className="border border-gray-300">
                        {historie.symbol}
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        {historie.currency}
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        {historie.deposit}
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        {historie.leverage}
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        {historie.period}
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        {new Intl.DateTimeFormat("es-ES", {
                          dateStyle: "medium",
                        }).format(new Date(historie.fromDate))}
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        {new Intl.DateTimeFormat("es-ES", {
                          dateStyle: "medium",
                        }).format(new Date(historie.toDate))}
                      </TableCell>
                      {uniqueParams.map((paramName, index) => {
                        const matchingParam = historie.modifiedParams.find(
                          (param) => param.param?.name === paramName
                        );
                        return (
                          <TableCell
                            key={`param-value-${historie.id}-${index}`}
                            className="border border-gray-300"
                          >
                            {matchingParam?.modifiedValue || "-"}
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-center border border-gray-300">
                        {new Intl.DateTimeFormat("es-ES", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(historie.createdAt))}
                      </TableCell>
                      <TableCell className="text-center border border-gray-300">
                        <div className="flex justify-end space-x-4">
                          {historie.isSave ? (
                            <Button
                              className="w-full mt-3 text-white bg-red-600"
                              variant="outline"
                              onClick={() =>
                                handleSaveParams(false, historie.id)
                              }
                            >
                              Borrar
                              <BadgeX className="w-4 h-4 ml-2" />
                            </Button>
                          ) : (
                            <Button
                              className="w-full mt-3 text-white bg-slate-800"
                              variant="outline"
                              onClick={() =>
                                handleSaveParams(true, historie.id)
                              }
                            >
                              Guardar parametros
                              <Upload className="w-4 h-4 ml-2 " />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          );
        }
      )}
    </div>
  );
}
