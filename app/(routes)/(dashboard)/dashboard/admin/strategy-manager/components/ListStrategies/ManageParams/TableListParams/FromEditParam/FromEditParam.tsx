"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./FromEditParam.form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormEditParamProps } from "./FromEditParam.types";

export function FormEditParam(props: FormEditParamProps) {

  const { paramData } = props;
  const { setOpenDialog } = props;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: paramData.name,
      value: paramData.value 
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setOpenDialog(false);
    try {
      await axios.patch(`/api/param/${paramData.id}/form`, values);
      toast({
        title: "Parametro editado correctamente",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error al editar el parametro" + error,
        variant: "destructive",
      });
    }
  };

  const { isValid } = form.formState;
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="gap-6 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ruptura de maximos..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input placeholder="Una descripcion de la estrategia...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-5" disabled={!isValid}>
          Editar
        </Button>
      </form>
    </Form>
  );
}