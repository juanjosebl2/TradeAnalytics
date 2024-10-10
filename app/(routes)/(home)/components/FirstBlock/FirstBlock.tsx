import { Reveal } from "@/components/Shared/Reveal";
import Spline from "@splinetool/react-spline/next";

export function FirstBlock() {
  return (
    <div className="grid items-center lg:grid-cols-2 lg:px-0 lg:py-24">
      {/* Contenido del texto */}
      <Reveal className="p-6 lg:pl-40" position="bottom">
        <h1 className="text-6xl font-bold md:text-7xl lg:text-7xl">
          Pruebe nuestras estragias en TradeAnalytics
        </h1>
        <p className="max-w-xl mt-8 text-lg lg:mt-8 lg:text-xl">
          Una plataforma avanzada que permite a los usuarios probar y optimizar
          nuestras estrategias de trading en mercados financieros. Ofrece
          análisis detallados, simulaciones en tiempo real y métricas clave para
          mejorar la rentabilidad y gestión de riesgos, adaptándose a las
          necesidades de traders principiantes y expertos.
        </p>
      </Reveal>

      <Reveal className="flex justify-end" position="right">
      <Spline
        scene="https://prod.spline.design/V1JWXNPHtPBxKQ2d/scene.splinecode" 
      />
        {/* <Spline scene="https://prod.spline.design/V1JWXNPHtPBxKQ2d/scene.splinecode" /> */}
      </Reveal>
      {/* <Spline scene="https://prod.spline.design/IcyDyjl17tmP3Fq0/scene.splinecode" /> */}
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
