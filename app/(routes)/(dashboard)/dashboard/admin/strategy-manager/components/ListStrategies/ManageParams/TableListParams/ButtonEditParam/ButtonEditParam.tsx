import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, X } from "lucide-react";
import { ButtonEditParamProps } from "./ButtonEditParam.types";
import { FormEditParam } from "../FromEditParam";

export function ButtonEditParam(props: ButtonEditParamProps) {
  const { paramData } = props;
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog}>
      <DialogTrigger asChild>
        <Button
          className="text-white bg-blue-400"
          variant="outline"
          onClick={() => setOpenDialog(true)}
        >
          Editar
          <Pencil className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Button
            onClick={() => setOpenDialog(false)}
            className="absolute p-2 text-black bg-white order-black top-2 right-2 hover:bg-slate-300"
          >
            <X className="w-4 h-4" />
          </Button>
          <DialogTitle>Formulario editar</DialogTitle>
          <DialogDescription>
            <FormEditParam setOpenDialog={setOpenDialog} paramData={paramData} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}