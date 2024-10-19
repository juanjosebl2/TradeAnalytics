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
import { TableListParamsProps } from "./TableListParams.types";
import { Button } from "@/components/ui/button";

export function TableListParams({ params, onBack }: TableListParamsProps) {
  function handleEditParam(paramId: string) {
    console.log("Editar parámetro", paramId);
  }

  function handleDeleteParam(paramId: string) {
    console.log("Eliminar parámetro", paramId);
  }

  return (
    <>
      <Table className="min-w-full divide-y divide-gray-200 bg-gray-100">
        <TableCaption>Lista de parametros</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {params.map((param) => (
            <TableRow key={param.id}>
              <TableCell className="font-medium">{param.name}</TableCell>
              <TableCell>{param.value}</TableCell>
              <TableCell className="text-right">
                {/* Cambiamos el div para que los botones se alineen a la derecha */}
                <div className="flex justify-end space-x-4">
                  <Button
                    className="text-white bg-blue-400"
                    onClick={() => handleEditParam(param.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    className="text-white bg-red-500"
                    onClick={() => handleDeleteParam(param.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6">
        <Button className="bg-gray-600 text-white" onClick={onBack}>
          Volver
        </Button>
      </div>
    </>
  );
}
