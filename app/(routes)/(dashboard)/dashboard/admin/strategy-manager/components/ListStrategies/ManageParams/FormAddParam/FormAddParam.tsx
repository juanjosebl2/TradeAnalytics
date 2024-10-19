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
import { formSchema } from "./FormAddParam.form";
import { FormAddParamProps } from "./FormAddParam.types";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function FormAddParam(props: FormAddParamProps) {
  const { setOpenDialog, strategy } = props;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      strategyId: strategy.id,
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setOpenDialog(false);
    try {
      await axios.post("/api/param", values);
      toast({
        title: "Estrategia añadida correctamente",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error al añadir la estrategia " + { error },
        variant: "destructive",
      });
    }
  };

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
                  <Input placeholder="nombre del parametro" {...field} />
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
                <FormLabel>valor</FormLabel>
                <FormControl>
                  <Input placeholder="Valor del parametro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-5">
          Añadir
        </Button>
      </form>
    </Form>
  );
}
