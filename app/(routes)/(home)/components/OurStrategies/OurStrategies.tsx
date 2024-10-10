import { cn } from "@/lib/utils";
import {
  categoryTradingStrategies,
  dataFirstBlockFleet,
  dataSecondBlockFleet,
} from "./OurStrategies.data";
import Image from "next/image";
import { Reveal } from "@/components/Shared/Reveal";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function OurStrategies() {
  return (
    <div className="p-6 py-12 mx-auto text-center max-m-6xl lg:py-40">
      <h3 className="text-2xl font-bold lg:text-6xl">
        Estrategias principales
      </h3>
      <p className="w-full max-w-2xl mx-auto mt-2 mb-5 text-lg text-center lg:mt-5 lg:text-xl lg:mb-10">
        No dejes escapar la oportunidad de probar nuestras mejores estrategias,
        elige la que mas te guste.
      </p>
      <div className="grid items-center justify-center max-w-2xl grid-cols-2 gap-4 mx-auto mb-5 lg:grid-cols-6">
        {categoryTradingStrategies.map(({ name, active }) => (
          <div
            key={name}
            className={cn(
              "rounded-xl py-2 px-3",
              active ? "bg-black text-white" : "bg-slate-100"
            )}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="mt-20 mb-10">
        <div className="grid grid-cols-3 mb-6 gap-x-6">
          {dataFirstBlockFleet.map(({ url, delay }) => (
            <Reveal
              key={url}
              delay={delay}
              className="flex justify-center"
              position="right"
            >
              <Image
                src={`/images/strategies/${url}`}
                alt="Car"
                width={300}
                height={150}
                className="rounded-xl shadow-xl border-2 border-gray-300 transition-transform duration-300 hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
        <div className="grid grid-cols-4 mb-20 gap-x-6">
          {dataSecondBlockFleet.map(({ url, delay }) => (
            <Reveal
              key={url}
              delay={delay}
              className="flex justify-center"
              position="right"
            >
              <Image
                src={`/images/strategies/${url}`}
                alt="Car"
                width={300}
                height={150}
                className="rounded-xl shadow-xl border-2 border-gray-300 transition-transform duration-300 hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </div>
      <Link href="/dashboard">
        <Button
          className="p-6 mt-5 text-lg text-white rounded-xl bg-slate-800"
          variant="outline"
        >
          Ver todas las estrategias
        </Button>
      </Link>
    </div>
  );
}
