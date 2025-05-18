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
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Information } from "../Information";
import qs from "query-string";
import { useSearchParams } from "next/navigation";
import { es } from "date-fns/locale";

interface SymbolData {
  name: string;
  bid: number;
  ask: number;
  spread: number;
}

interface ModifiedParamData {
  id: string;
  historyId: string;
  paramId: string;
  modifiedValue: string;
  createdAt: string;
  updatedAt: string;
}

interface StrategyData {
  id: string;
  userId: string;
  name: string;
  description: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

interface HistoryData {
  id: string;
  userId: string;
  strategyId: string;
  symbol: string;
  currency: string;
  deposit: string;
  leverage: string;
  period: string;
  fromDate: string;
  toDate: string;
  createdAt: string;
  updatedAt: string;
  isSave: boolean;
  modifiedParams: ModifiedParamData[];
  strategy: StrategyData;
}

const createFormSchema = (dynamicParams: Param[]) => {
  const baseSchema = {
    symbol: z.string().nonempty({ message: "Debe seleccionar uno" }),
    period: z.string().nonempty({ message: "Debe seleccionar uno" }),
    fromDate: z.date({ required_error: "Fecha de inicio es requerida" }),
    toDate: z.date({ required_error: "Fecha de fin es requerida" }),
    deposit: z.string().nonempty({ message: "Debe seleccionar uno" }),
    currency: z.string().nonempty({ message: "Debe seleccionar uno" }),
    leverage: z.string().nonempty({ message: "Debe seleccionar uno" }),
  };

  const dynamicSchema = dynamicParams.reduce((acc, param) => {
    acc[param.name] = z
      .string()
      .nonempty(`${param.name} es requerido`)
      .refine(
        (value) => {
          const numValue = Number(value);
          if (isNaN(numValue)) return false;
          const min = param.min_filter_value
            ? Number(param.min_filter_value)
            : -Infinity;
          const max = param.max_filter_value
            ? Number(param.max_filter_value)
            : Infinity;
          return numValue >= min && numValue <= max;
        },
        {
          message: `${param.name} debe estar entre ${param.min_filter_value} y ${param.max_filter_value}`,
        }
      );
    return acc;
  }, {} as Record<string, z.ZodTypeAny>);

  const schema = z
    .object(baseSchema)
    .extend(dynamicSchema)
    .refine((data) => data.fromDate <= data.toDate, {
      message: "La fecha de inicio no puede ser posterior a la fecha de fin",
      path: ["toDate"],
    });

  return schema;
};

export function FormProbeStrategy({
  params,
  strategy,
}: FormProbeStrategyProps) {
  const formSchema = createFormSchema(params);
  const [symbols, setSymbols] = useState<SymbolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //const router = useRouter();

  const [history, setHistory] = useState<HistoryData | null>(null);
  const searchParams = useSearchParams();

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
      nameStrategy: "",
      symbol: "",
      period: "",
      fromDate: undefined,
      toDate: undefined,
      deposit: "",
      currency: "",
      leverage: "",
      ...defaultValues,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formattedValues = {
      ...values,
      fromDate: values.fromDate
        ? format(new Date(values.fromDate), "yyyy.MM.dd")
        : null,
      toDate: values.toDate
        ? format(new Date(values.toDate), "yyyy.MM.dd")
        : null,
      nameStrategy: strategy.name,
    };

    const globalKeys = [
      "currency",
      "deposit",
      "leverage",
      "period",
      "symbol",
      "fromDate",
      "toDate",
    ];

    const globalParams = globalKeys.reduce(
      (acc: Record<string, string | null>, key) => {
        if (key in formattedValues) {
          acc[key] = formattedValues[key as keyof typeof formattedValues];
        }
        return acc;
      },
      {}
    );

    const strategyParams = params.map((param) => ({
      id: param.id,
      name: param.name,
      value: formattedValues[param.name as keyof typeof formattedValues] || "",
    }));

    setLoading(true);
    let saveIdHistory = "";

    try {
      const response = await axios.post("/api/history", {
        strategyId: strategy.id,
        globalParams,
        strategyParams,
        isSave: false,
      });

      if (response.status === 201) {
        console.log(
          "Historial guardado correctamente",
          response.data.history.id
        );
        saveIdHistory = response.data.history.id;
        //alert("Historial guardado correctamente.");
        //router.push(`/dashboard/result-strategy?success=true`);
      } else {
        console.error("Error en la respuesta:", response);
        alert("Hubo un error al guardar el historial.");
      }
    } catch (error) {
      console.error("Error guardando historial:", error);
      alert("Error al intentar guardar el historial.");
    }
    //"http://127.0.0.1:5000/api/submit_strategy",
    try {
      const response = await axios.post("/api/submit-strategy", {
        formattedValues,
      });
      
      console.log("Estrategia enviada correctamente", response.data);
      
      if (response.status === 200) {
        const queryParams = qs.stringify({
          historyId: saveIdHistory || "",
        });
        console.log("Query params:", queryParams);
        //router.push(`/dashboard/result-strategy?${queryParams}`);
      } else {
        console.error("Error en la respuesta:", response);
        alert("Hubo un error al enviar la estrategia.");
      }
    } catch (error) {
      console.error("Error enviando estrategia:", error);
      alert("Error al intentar enviar la estrategia a Python");
    }
  };

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await axios.get<SymbolData[]>("/api/symbols");
        setSymbols(res.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const handleHistory = () => {
      const historyString = searchParams.get("history");
      if (historyString) {
        try {
          const parsedHistory = JSON.parse(historyString);
          setHistory(parsedHistory);
        } catch (err) {
          console.error("Error al deserializar history:", err);
          setError("Error al deserializar history");
        }
      }
    };

    fetchSymbols();
    handleHistory();
  }, [searchParams]);

  useEffect(() => {
    if (history) {
      form.reset({
        symbol: history.symbol || "",
        period: history.period || "",
        fromDate: history.fromDate ? new Date(history.fromDate) : undefined,
        toDate: history.toDate ? new Date(history.toDate) : undefined,
        deposit: history.deposit || "",
        currency: history.currency || "",
        leverage: history.leverage || "",
        ...history.modifiedParams?.reduce((acc, modifiedParam) => {
          const param = params.find((p) => p.id === modifiedParam.paramId);
          if (param) {
            acc[param.name] = modifiedParam.modifiedValue || "";
          }
          return acc;
        }, {} as Record<string, string>),
      });
    }
  }, [history, form, params]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => {
            console.log("Datos válidos", data);
            onSubmit(data);
          },
          (errors) => {
            console.log("Errores en el formulario", errors);
          }
        )}
        className="space-y-8"
      >
        <h2 className="gap-6 mt-8 font-bold text-indigo-600">
          Configuración base
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormLabel>Simbolos</FormLabel>
                  <Information text="Representan los activos financieros que puedes negociar, como pares de divisas (EUR/USD), acciones (spx500=US500.cash), materias primas (oro=XAU/USD, petróleo=OIL) " />
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={history?.symbol || field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona simbolo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {symbols.map((symbol, index) => (
                      <SelectItem key={index} value={symbol.name}>
                        {symbol.name}
                      </SelectItem>
                    ))}
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
                <div className="flex items-center gap-1">
                  <FormLabel>Periodo</FormLabel>
                  <Information text="Es el marco de tiempo que usas para analizar los movimientos del precio. Por ejemplo, en un gráfico de 1 día, cada vela o barra muestra el movimiento de precio durante un día completo." />
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={history?.period || field.value}
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
                <div className="flex items-center gap-1">
                  <FormLabel>Deposito</FormLabel>
                  <Information text="Es el dinero ficticio donde realizamos las pruebas" />
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={history?.deposit || field.value}
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
                <div className="flex items-center gap-1">
                  <FormLabel>Divisa</FormLabel>
                  <Information text="Es la moneda en la que se maneja la cuenta de trading" />
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={history?.currency || field.value}
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
            name="leverage"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormLabel>Apalancamiento</FormLabel>
                  <Information text="Es una herramienta que te permite operar con más dinero del que tienes en tu cuenta. Por ejemplo, un apalancamiento de 1:100 significa que por cada dólar de tu cuenta, puedes operar como si tuvieras 100. Util por ejemplo para el forex ya que sus precios no varian demasiado." />
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={history?.leverage || field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la divisa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="33">1:33</SelectItem>
                    <SelectItem value="100">1:100</SelectItem>
                    <SelectItem value="200">1:200</SelectItem>
                    <SelectItem value="500">1:500</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h2 className="gap-6 font-bold text-indigo-600">Fechas de la prueba</h2>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fromDate"
            defaultValue={
              history?.fromDate ? new Date(history.fromDate) : undefined
            }
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="flex items-center gap-1">
                  <FormLabel>Fecha inicio de la prueba</FormLabel>
                  <Information text="Fecha inicio donde se realizara las pruebas" />
                </div>
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

                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    side="bottom"
                  >
                    <Calendar
                      mode="single"
                      locale={es}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("2022-01-01")
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
            defaultValue={
              history?.toDate ? new Date(history.toDate) : undefined
            }
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="flex items-center gap-1">
                  <FormLabel>Fecha fin de la prueba</FormLabel>
                  <Information text="Fecha fin donde se realizara las pruebas" />
                </div>
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

                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      locale={es}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("2022-01-01")
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
        <h2 className="gap-6 mt-4 font-bold text-indigo-600">
          Parametros de la estrategia
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {params.map((param) => (
            <FormField
              key={param.id}
              control={form.control}
              name={param.name}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1">
                    <FormLabel>{param.name}</FormLabel>
                    <Information
                      text={param.description ? param.description : ""}
                    />
                  </div>
                  <Input
                    type="number"
                    {...field}
                    className="w-full p-2 mb-2 border"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="w-auto">
            Ver resultado
          </Button>
        </div>
      </form>
    </Form>
  );
}
