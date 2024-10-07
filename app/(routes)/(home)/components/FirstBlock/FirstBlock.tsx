import { Reveal } from "@/components/Shared/Reveal";
import Image from "next/image";

export function FirstBlock() {
  return (
    <div className="grid items-center lg:grid-cols-2 lg:px-0 lg:py-24">
      <Reveal className="p-6 lg:pl-40" position="bottom">
        <h1 className="text-6xl font-bold md:text-7xl lg:text-8xl">
          Premium
          <span className="block">DriveX</span>
          En españa
        </h1>
        <p className="max-w-sm mt-8 text-lg lg:mt-8 lg:text-xl">
          La mejora calidad en coches del mundo, ahora en España. Conoce
          nuestros modelos y disfruta de la mejor experiencia de manejo.
        </p>
      </Reveal>

      <Reveal className="flex justify-end" position="right">
        <Image
          src="/images/fondo-trans-1.png"
          alt="DriveX"
          width={800}
          height={800}
          priority
        />
      </Reveal>
    </div>
  );
}
