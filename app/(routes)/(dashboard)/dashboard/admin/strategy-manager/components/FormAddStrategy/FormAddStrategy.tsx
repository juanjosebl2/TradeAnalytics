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
import { formSchema } from "./FormAddStrategy.form";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import { FormAddStrategyProps } from "./FormAddStrategy.types";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export function FormAddStrategy(props: FormAddStrategyProps) {
  const { setOpenDialog } = props;
  const [photoUploaded, setphotoUploaded] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      photo: "",
      isPublic: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setOpenDialog(false);
    try {
      await axios.post("/api/strategy", values);
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
                  <Textarea placeholder="Esta estrategia se basa...." {...field} />
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
        <Button type="submit" className="w-full mt-5">
          Añadir
        </Button>
      </form>
    </Form>
  );
}
