import { Reveal } from "@/components/Shared/Reveal";
import Spline from "@splinetool/react-spline/next";

export function FirstBlock() {
  return (
    <div className="grid items-center lg:grid-cols-2 lg:px-0 lg:py-24">
      {/* Contenido del texto */}
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

      <Spline scene="https://prod.spline.design/IcyDyjl17tmP3Fq0/scene.splinecode" />
      {/* <div className="flex justify-center items-center">
        <div className="relative" style={{ overflow: 'hidden' }}>
          <div style={{ transform: 'scale(0.8)', width: '135%'}}>
            <Spline
              scene="https://prod.spline.design/IcyDyjl17tmP3Fq0/scene.splinecode" 
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}
