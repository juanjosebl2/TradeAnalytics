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
      description: paramData.description ? paramData.description : undefined,
      value: paramData.value,
      min_filter_value: paramData.min_filter_value ? paramData.min_filter_value : undefined,
      max_filter_value: paramData.max_filter_value ? paramData.max_filter_value : undefined,
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
        <div className="gap-6 mt-4 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del parametro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input placeholder="Descripcion del parametro" {...field} />
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
                  <Input placeholder="Valor del parametro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="min_filter_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filtro valor mínimo</FormLabel>
                <FormControl>
                  <Input placeholder="Valor del parametro mínimo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_filter_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filtro valor máximo</FormLabel>
                <FormControl>
                  <Input placeholder="Valor del parametro máximo" {...field} />
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