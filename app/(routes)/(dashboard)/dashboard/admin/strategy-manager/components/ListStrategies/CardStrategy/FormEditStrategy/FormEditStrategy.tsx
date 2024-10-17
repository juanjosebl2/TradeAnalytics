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
import { formSchema } from "./FormEditStrategy.form";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormEditStrategyProps } from "./FormEditStrategy.types";
import { Textarea } from "@/components/ui/textarea";

export function FormEditStrategy(props: FormEditStrategyProps) {

  const { strategyData } = props;
  const { setOpenDialog } = props;
  const [photoUploaded, setphotoUploaded] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: strategyData.name,
      description: strategyData.description ? strategyData.description : "",
      photo: strategyData.photo,
      isPublic: strategyData.isPublic ? strategyData.isPublic : false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setOpenDialog(false);
    try {
      await axios.patch(`/api/strategy/${strategyData.id}/form`, values);
      toast({
        title: "Estrategia editada correctamente",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error al editar la estrategia " + error,
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea placeholder="Una descripcion de la estrategia...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen de la estrategia</FormLabel>
                <FormControl>
                  {photoUploaded ? (
                    <p>Imagen subida correctamente</p>
                  ) : (
                    <UploadButton
                      className="rouded-ld bg-slate-600/20 text-slate-800 outline-dotted outline-3"
                      {...field}
                      endpoint="photo"
                      onClientUploadComplete={(res) => {
                        form.setValue("photo", res?.[0].url);
                        setphotoUploaded(true);
                      }}
                      onUploadError={(error: Error) => {
                        console.error(error);
                      }}
                    />
                  )}
                </FormControl>
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