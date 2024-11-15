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
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ButtonEditParam } from "./ButtonEditParam";
import { Trash } from "lucide-react";

export function TableListParams({ params, onBack }: TableListParamsProps) {
  const router = useRouter()

  const deleteParam = async (paramId: string) => {
    try {
      await axios.delete(`/api/param/${paramId}`);
      toast({
        title: "Parametro eliminado correctamente",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error al eliminar el parametro " + error,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Table className="min-w-full bg-gray-100 divide-y divide-gray-200">
        <TableCaption>Lista de parametros</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Valor filtro mínimo</TableHead>
            <TableHead>Valor filtro máximo</TableHead>
            <TableHead>Descripcion</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {params.map((param) => (
            <TableRow key={param.id}>
              <TableCell className="font-medium">{param.name}</TableCell>
              <TableCell>{param.value}</TableCell>
              <TableCell>{param.min_filter_value}</TableCell>
              <TableCell>{param.max_filter_value}</TableCell>
              <TableCell>{param.description}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-4">
                  <ButtonEditParam paramData={param}/>
                  <Button
                    className="text-white bg-red-500"
                    onClick={() => deleteParam(param.id)}
                  >
                    Eliminar
                    <Trash className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6">
        <Button className="text-white bg-gray-600" onClick={onBack}>
          Volver
        </Button>
      </div>
    </>
  );
}
