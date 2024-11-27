import { Navbar } from "@/components/Shared/NavBar";
import { TableSymbols } from "./components/TableSymbols";
import Image from "next/image";

export default function page() {
  return (
    <div>
      <Navbar />
      <div className="px-4 mt-8 space-y-8 text-center ">
        <h1 className="mb-4 text-3xl font-bold">Historial de Símbolos</h1>
        <div className="flex justify-center">
          <Image
            src="/images/ftmo.jpg"
            alt="FTMO Logo"
            width={224}
            height={224}
            className="rounded-full"
          />
        </div>
        <p className="max-w-2xl mx-auto text-lg">
          El historial de los símbolos es obtenido gracias a las cuentas de
          fondeo proporcionadas por FTMO.
        </p>
        <p className="max-w-2xl mx-auto text-lg">
          FTMO es una plataforma reconocida que permite a traders profesionales
          demostrar sus habilidades y, tras superar un proceso de evaluación,
          acceder a cuentas financiadas. Esto asegura datos confiables y
          relevantes para optimizar estrategias de trading. Las cuentas que proporcionan
          para realizar las pruebas de backtesting son gratis, 
          es decir, cuentas demo con dinero ficticio.
        </p>
        <p className="max-w-2xl mx-auto text-lg">
          Estos son los simbolos disponibles que podemos realizar backtesting 
          con las estrategias predefinidas en TradeAnalytics.
        </p>
      </div>
      <TableSymbols />
    </div>
  );
}
