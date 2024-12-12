"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Info, Upload } from "lucide-react";

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
      await axios.patch(`/api/history/${queryParams.historyId}`, {
        isSave: save,
      });
      if (save) {
        toast({
          title: "Parametros guardados correctamente",
        });
        setSaveParams(true);
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
        <div className="relative pb-10">
          <Image
            src={imageBacktest}
            alt="Report Backtest"
            width={820}
            height={200}
            className="h-auto max-w-full"
          />

          <div
            className="absolute text-xs font-semibold text-gray-800"
            style={{
              top: "200px", 
              left: "-50px", 
            }}
          >
            Transacciones
          </div>
          <div
            className="absolute text-xs font-semibold text-gray-800"
            style={{
              top: "-10px", 
              left: "820px", 
            }}
          >
            Balance cuenta
          </div>
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

      <div className="flex justify-start mt-4">
        <Link href={`/dashboard/information`} legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <Button className="mt-4 bg-slate-600">
              Información
              <Info className="w-4 h-4 ml-2 " />
            </Button>
          </a>
        </Link>
      </div>

      <div className="flex justify-start mt-4">
        <Link href={`/dashboard`}>
          <Button className="mt-4">Volver</Button>
        </Link>
      </div>

      {report && (
        <div className="w-full max-w-6xl p-4">
          <h2 className="pb-4 text-3xl font-semibold text-blue-800">
            Configuración
          </h2>
          <ul className="space-y-2">
            <div className="font-bold">Parametros de entrada</div>
            {Object.entries(report.configuracion).map(([key, value]) =>
              key === "parametros_entrada" ? (
                <li key={key}>
                  <ul className="pl-4">
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

          <h2 className="pt-8 pb-4 text-3xl font-semibold text-blue-800">
            Resultados
          </h2>
          <ul className="grid grid-cols-2 gap-2">
            {Object.entries(report.resultados)
              .filter(([key, value]) => key.trim() && value.trim())
              .map(([key, value]) => (
                <li key={key}>
                  <strong>{key.replace(/:$/, "")}:</strong> {value}
                </li>
              ))}
          </ul>

          {report.ordenes.length > 0 && (
            <>
              <h2 className="pt-8 pb-4 text-3xl font-semibold text-blue-800">
                Órdenes
              </h2>
              <table className="w-full border border-collapse table-auto">
                <thead>
                  <tr>
                    {[
                      "Hora Apertura",
                      "Orden",
                      "Símbolo",
                      "Tipo",
                      "Volumen",
                      "Precio",
                      "S/L",
                      "T/P",
                      "Fecha/Hora",
                      "Estado",
                      "Comentario",
                    ].map((header) => (
                      <th key={header} className="px-4 py-2 border">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {report.ordenes.map((orden, index) => (
                    <tr key={index}>
                      {Object.values(orden).map((value, i) => (
                        <td key={i} className="px-4 py-2 border">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {report.transacciones.length > 0 && (
            <>
              <h2 className="pt-8 pb-4 text-3xl font-semibold text-blue-800">
                Transacciones
              </h2>
              <table className="w-full border border-collapse table-auto">
                <thead>
                  <tr>
                    {[
                      "Fecha/Hora",
                      "Transacción",
                      "Símbolo",
                      "Tipo",
                      "Dirección",
                      "Volumen",
                      "Precio",
                      "Orden",
                      "Comisión",
                      "Beneficio",
                      "Balance",
                    ].map((header) => (
                      <th key={header} className="px-4 py-2 border">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {report.transacciones.map((transaccion, index) => (
                    <tr key={index}>
                      {Object.values(transaccion).map((value, i) => (
                        <td key={i} className="px-4 py-2 border">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
}
