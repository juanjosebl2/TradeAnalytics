"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
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
import { formSchema } from "./FormProbeStrategy.form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { FormProbeStrategyProps } from "./FormProbeStrategy.types";
import { Param } from "@prisma/client";

const createFormSchema = (dynamicParams: Param[]) => {
  let schema = z.object({
    symbol: z.string().min(2).max(50),
    period: z.string().min(2).max(50),
    fromDate: z.string().min(2).max(50),
    toDate: z.string().min(2).max(50),
    deposit: z.string().min(2).max(50),
    currency: z.string().min(2).max(50),
    leverage: z.string().min(2).max(50),
  });

  dynamicParams.forEach((param: Param) => {
    schema = schema.extend({
      [param.name]: z.string().min(1), // Añade la validación dinámica
    });
  });

  return schema;
};

export function FormProbeStrategy({ params }: FormProbeStrategyProps) {
  const formSchema = createFormSchema(params);

  const defaultValues = params.reduce(
    (acc: Record<string, string>, param: Param) => {
      acc[param.name] = param.value || "";
      return acc;
    },
    {} as Record<string, string>
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
      period: "",
      fromDate: "",
      toDate: "",
      deposit: "",
      currency: "",
      leverage: "",
      ...defaultValues,
    },
  });

  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       symbol: "",
  //       period: "",
  //       fromDate: "",
  //       toDate: "",
  //       deposit: "",
  //       currency: "",
  //       leverage: "",
  //     },
  //   });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // setOpenDialog(false);
    // try {
    //   await axios.post("/api/strategy", values);
    //   toast({
    //     title: "Estrategia añadida correctamente",
    //   });
    //   router.refresh();
    // } catch (error) {
    //   toast({
    //     title: "Error al añadir la estrategia " + { error },
    //     variant: "destructive",
    //   });
    // }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="gap-6 mt-4">Configuración base</h2>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Simbolos</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona simbolo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="APPL">APPL</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Periodo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tiempo del periodo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M1">M1</SelectItem>
                    <SelectItem value="M3">M3</SelectItem>
                    <SelectItem value="M5">M5</SelectItem>
                    <SelectItem value="M15">M15</SelectItem>
                    <SelectItem value="M30">M30</SelectItem>
                    <SelectItem value="H1">H1</SelectItem>
                    <SelectItem value="H4">H4</SelectItem>
                    <SelectItem value="Daily">Diario</SelectItem>
                    <SelectItem value="Weekly">Semanal</SelectItem>
                    <SelectItem value="Monthly">Mensual</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deposit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deposito</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la cantidad de la cuenta" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="3000">3000</SelectItem>
                    <SelectItem value="5000">5000</SelectItem>
                    <SelectItem value="10000">10000</SelectItem>
                    <SelectItem value="25000">25000</SelectItem>
                    <SelectItem value="50000">50000</SelectItem>
                    <SelectItem value="100000">100000</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Divisa</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la divisa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CHF">CHF</SelectItem>
                    <SelectItem value="RUB">RUB</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fromDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha inicio de la prueba</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy.MM.dd")
                        ) : (
                          <span>Pincha una fecha</span>
                        )}

                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha fin de la prueba</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy.MM.dd")
                        ) : (
                          <span>Pincha una fecha</span>
                        )}

                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h2 className="gap-6 mt-4">Parametros de la estragia</h2>
        <div className="grid grid-cols-2 gap-6 mt-4">
          {params.map((param) => (
            <FormField
              key={param.id} // Siempre asegúrate de tener una key única
              control={form.control}
              name={param.name} // Usamos el nombre del parámetro como nombre del campo
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{param.name}</FormLabel>{" "}
                  {/* Etiqueta con el nombre del parámetro */}
                  <Input
                    type="text"
                    value={field.value || param.value} // Valor del parámetro
                    onChange={field.onChange}
                    className="border p-2 mb-2 w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex justify-start mt-5">
          <Button type="submit" className="w-auto">
            Ver resultado
          </Button>
        </div>
      </form>
    </Form>
  );
}
