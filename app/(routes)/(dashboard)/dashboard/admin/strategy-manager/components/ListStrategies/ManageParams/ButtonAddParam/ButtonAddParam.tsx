"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { FormAddParam } from "../FormAddParam";
import { ButtonAddParamProps } from "./ButtonAddParam.types";

export function ButtonAddParam(props: ButtonAddParamProps) {
  const [OpenDialog, setOpenDialog] = useState(false);
  const { strategy } = props

  return (
    <Dialog open={OpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setOpenDialog(true)}
          className="px-4 py-2 rounded-md bg-slate-200"
        >
          Añadir Parametro
          <PlusCircle className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir Parametro</DialogTitle>
          <Button
            onClick={() => setOpenDialog(false)}
            className="absolute p-2 text-black bg-white order-black top-2 right-2 hover:bg-slate-300"
          >
            <X className="w-4 h-4" />
          </Button>
          <DialogDescription>
            <FormAddParam strategy={strategy} setOpenDialog={setOpenDialog} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}