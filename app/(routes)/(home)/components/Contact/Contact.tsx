"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { formSchema } from "./Contact.form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

export function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/email", values);
      toast({
        title: "Mensaje enviado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error al enviar el mensaje " + error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-24 bg-white isolate sm:py-32 lg:px-8">
      <div className="w-full max-w-lg xl:w-[54%] shadow-xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-10 bg-[#ffffff] rounded-xl"
          >
            <h3 className="text-3xl font-bold tracking-tight text-[#2d2d2d] sm:text-4xl">
              Contacta conmigo
            </h3>
            <p className="text-[#4a5568]">Envíame un mensaje, te responderé por vía email</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Nombre"
                        {...field}
                        className="w-full border-[#000000] text-[#000000]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Apellido"
                        {...field}
                        className="w-full border-[#4a5568] text-[#2d2d2d]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="w-full border-[#4a5568] text-[#2d2d2d]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Teléfono"
                        {...field}
                        className="w-full border-[#4a5568] text-[#2d2d2d]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="h-[200px] w-full border-[#4a5568] text-[#2d2d2d]"
                      placeholder="Deja tu mensaje"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" className="max-w-40 bg-[#48bb78] text-white hover:bg-[#38a169]">
                Enviar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
);

}
