"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Configuracion {
  Experto: string;
  Símbolo: string;
  Período: string;
  "Parámetros de entrada": string;
  Empresa: string;
  Divisa: string;
  "Depósito inicial": string;
  Apalancamiento: string;
}

interface Resultados {
  "Calidad del historial": string;
  Barras: string;
  "Beneficio Neto": string;
  "Beneficio Bruto": string;
  "Pérdidas Brutas": string;
  "Factor de Beneficio": string;
  "Factor de Recuperación": string;
  AHPR: string;
  GHPR: string;
  "Total de operaciones ejecutadas": string;
  "Total de transacciones": string;
  "Correlation (Profits,MFE)": string;
  "Tiempo mínimo para retener la posición": string;
  // Agrega el resto de propiedades relevantes
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

interface ReportData {
  configuracion: Configuracion;
  resultados: Resultados;
  ordenes: Orden[];
}

export default function ResultStrategyPage() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [imageBacktest, setImageBacktest] = useState<string | null>(null);

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

    fetchReport();
    fetchImages();
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

      {report && (
        <div className="w-full max-w-6xl p-4 ">
          {/* Configuración */}
          <h2 className="pb-4 text-2xl font-semibold">Configuración</h2>
          <ul>
            {Object.entries(report.configuracion).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>

          {/* Resultados */}
          <h2 className="pt-6 pb-4 text-2xl font-semibold">Resultados</h2>
          <ul>
            {Object.entries(report.resultados).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>

          {/* Ordenes */}
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
        </div>
      )}
    </div>
  );
}
