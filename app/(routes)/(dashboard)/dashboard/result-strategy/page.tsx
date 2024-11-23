"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

interface Configuracion {
  Experto: string;
  Símbolo: string;
  Período: string;
  Empresa: string;
  Divisa: string;
  Deposito: string;
  Apalancamiento: string;
  parametros_entrada: { [key: string]: string };
}

interface Resultados {
  [key: string]: string;
}

interface Orden {
  hora_apertura: string;
  orden: string;
  simbolo: string;
  tipo: string;
  volumen: string;
  precio: string;
  sl: string;
  tp: string;
  fecha_hora: string;
  estado: string;
  comentario: string;
}

interface Transaccion {
  fecha_transaccion: string;
  Transacción: string;
  Símbolo: string;
  Tipo: string;
  Dirección: string;
  Volumen: string;
  Precio: string;
  Orden: string;
  Comisión: string;
  Beneficio: string;
  Balance: string;
}

interface ReportData {
  configuracion: Configuracion;
  resultados: Resultados;
  ordenes: Orden[];
  transacciones: Transaccion[];
}

export default function ResultStrategyPage() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [imageBacktest, setImageBacktest] = useState<string | null>(null);
  const [imageBacktest2, setImageBacktest2] = useState<string | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const [saveParams, setSaveParams] = useState<boolean | null>(false);

  const handleSaveParams = async (save: boolean) => {
    try {
      await axios.patch(`/api/history/${queryParams.historyId}`, { isSave: save });
      if (save) {
        toast({
          title: "Parametros guardados correctamente",
        });
        setSaveParams(true)
      } else {
        toast({
          title: "Parametros borrados correctamente",
        });
      }
      router.refresh();
    } catch (error) {
      toast({
        title: "Error al guardar los parametros" + error,
        variant: "destructive",
      });
    }
  };

  //console.log("Query params:", queryParams);

  // const onReserveCar = async (car: Car, dateSelected: DateRange) => {
  //   const response = await axios.post("/api/checkout", {
  //     carId: car.id,
  //     priceDay: car.priceDay,
  //     startDate: dateSelected.from,
  //     endDate: dateSelected.to,
  //     carName: car.name,
  //   });

  //   window.location = response.data.url;
  //   toast({
  //     title: "Coche reservado",
  //   })
  // };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get<ReportData>("/api/report");
        setReport(res.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const fetchImages = async () => {
      try {
        const backtestResponse = await axios.get("/api/report/image", {
          responseType: "blob",
        });
        setImageBacktest(URL.createObjectURL(backtestResponse.data));
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const fetchImages2 = async () => {
      try {
        const backtestResponse = await axios.get("/api/report/image2", {
          responseType: "blob",
        });
        setImageBacktest2(URL.createObjectURL(backtestResponse.data));
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchReport();
    fetchImages();
    fetchImages2();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center lg:py-24">
      <h1 className="pb-10 text-4xl font-bold">Resultado de la Estrategia</h1>

      {imageBacktest && (
        <div className="pb-10">
          <Image
            src={imageBacktest}
            alt="Report Backtest"
            width={820}
            height={200}
            className="h-auto max-w-full"
          />
        </div>
      )}

      {imageBacktest2 && (
        <div className="pb-10">
          <Image
            src={imageBacktest2}
            alt="Report Backtest"
            width={860}
            height={400}
            className="h-auto max-w-full"
          />
        </div>
      )}

      {!saveParams && (
        <div className="flex justify-start mt-5">
          <Button
            className="w-full mt-3 text-white bg-slate-800"
            variant="outline"
            onClick={() => handleSaveParams(true)}
          >
            Guardar parametros
            <Upload className="w-4 h-4 ml-2 " />
          </Button>
        </div>
      )}

      <div className="flex justify-start mt-5">
        <Link href={`/dashboard`}>
          <Button className="mt-4">Volver</Button>
        </Link>
      </div>

      {report && (
        <div className="w-full max-w-6xl p-4 ">
          <h2 className="pb-4 text-2xl font-semibold">Configuración</h2>
          <ul>
            {Object.entries(report.configuracion).map(([key, value]) =>
              key === "parametros_entrada" ? (
                <li key={key}>
                  <strong>Parametros de entrada:</strong>
                  <ul>
                    {Object.entries(value as Record<string, string>).map(
                      ([paramKey, paramValue]) =>
                        paramValue ? (
                          <li key={paramKey}>
                            <strong>{paramKey}:</strong> {paramValue}
                          </li>
                        ) : null
                    )}
                  </ul>
                </li>
              ) : (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              )
            )}
          </ul>

          <h2 className="pt-6 pb-4 text-2xl font-semibold">Resultados</h2>
          <ul className="grid grid-cols-2">
            {Object.entries(report.resultados)
              .filter(
                ([key, value]) =>
                  typeof key === "string" &&
                  isNaN(Number(key)) &&
                  key.trim() !== "" &&
                  value.trim() !== ""
              )
              .map(([key, value]) => (
                <li key={key}>
                  <strong>{key.replace(/:$/, "")}:</strong> {value}
                </li>
              ))}
          </ul>

          <h2 className="pt-6 pb-4 text-2xl font-semibold">Órdenes</h2>
          <table className="w-full border border-collapse table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Hora Apertura</th>
                <th className="px-4 py-2 border">Orden</th>
                <th className="px-4 py-2 border">Símbolo</th>
                <th className="px-4 py-2 border">Tipo</th>
                <th className="px-4 py-2 border">Volumen</th>
                <th className="px-4 py-2 border">Precio</th>
                <th className="px-4 py-2 border">S/L</th>
                <th className="px-4 py-2 border">T/P</th>
                <th className="px-4 py-2 border">Fecha/Hora</th>
                <th className="px-4 py-2 border">Estado</th>
                <th className="px-4 py-2 border">Comentario</th>
              </tr>
            </thead>
            <tbody>
              {report.ordenes.map((orden, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{orden.hora_apertura}</td>
                  <td className="px-4 py-2 border">{orden.orden}</td>
                  <td className="px-4 py-2 border">{orden.simbolo}</td>
                  <td className="px-4 py-2 border">{orden.tipo}</td>
                  <td className="px-4 py-2 border">{orden.volumen}</td>
                  <td className="px-4 py-2 border">{orden.precio}</td>
                  <td className="px-4 py-2 border">{orden.sl}</td>
                  <td className="px-4 py-2 border">{orden.tp}</td>
                  <td className="px-4 py-2 border">{orden.fecha_hora}</td>
                  <td className="px-4 py-2 border">{orden.estado}</td>
                  <td className="px-4 py-2 border">{orden.comentario}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="pt-6 pb-4 text-2xl font-semibold">Transacciones</h2>
          <table className="w-full border border-collapse table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Fecha/Hora</th>
                <th className="px-4 py-2 border">Transacción</th>
                <th className="px-4 py-2 border">Símbolo</th>
                <th className="px-4 py-2 border">Tipo</th>
                <th className="px-4 py-2 border">Dirección</th>
                <th className="px-4 py-2 border">Volumen</th>
                <th className="px-4 py-2 border">Precio</th>
                <th className="px-4 py-2 border">Orden</th>
                <th className="px-4 py-2 border">Comisión</th>
                <th className="px-4 py-2 border">Beneficio</th>
                <th className="px-4 py-2 border">Balance</th>
              </tr>
            </thead>
            <tbody>
              {report.transacciones &&
                report.transacciones.map((transaccion, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">
                      {transaccion["fecha_transaccion"]}
                    </td>
                    <td className="px-4 py-2 border">
                      {transaccion.Transacción}
                    </td>
                    <td className="px-4 py-2 border">{transaccion.Símbolo}</td>
                    <td className="px-4 py-2 border">{transaccion.Tipo}</td>
                    <td className="px-4 py-2 border">
                      {transaccion.Dirección}
                    </td>
                    <td className="px-4 py-2 border">{transaccion.Volumen}</td>
                    <td className="px-4 py-2 border">{transaccion.Precio}</td>
                    <td className="px-4 py-2 border">{transaccion.Orden}</td>
                    <td className="px-4 py-2 border">{transaccion.Comisión}</td>
                    <td className="px-4 py-2 border">
                      {transaccion.Beneficio}
                    </td>
                    <td className="px-4 py-2 border">{transaccion.Balance}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
