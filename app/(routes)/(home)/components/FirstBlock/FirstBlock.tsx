import { Reveal } from "@/components/Shared/Reveal";
import Spline from "@splinetool/react-spline/next";

export function FirstBlock() {
  return (
    <div className="grid items-center lg:grid-cols-2 lg:px-0 lg:py-24">
      <Reveal className="p-6 lg:pl-40" position="bottom">
        <h1 className="text-6xl font-bold md:text-7xl lg:text-7xl">
          Explore nuestras propuestas en ProyectAnalytics
        </h1>
        <p className="max-w-xl mt-8 text-lg lg:mt-8 lg:text-xl">
          Una herramienta innovadora diseñada para ayudar a estudiantes y
          profesionales a desarrollar, analizar y optimizar proyectos
          universitarios. Ofrece recursos detallados, simulaciones avanzadas y
          métricas clave para mejorar la planificación, ejecución y resultados,
          adaptándose a las necesidades de principiantes y expertos en
          investigación académica.
        </p>
      </Reveal>

      <Reveal className="flex justify-end" position="right">
        <Spline scene="https://prod.spline.design/V1JWXNPHtPBxKQ2d/scene.splinecode" />
      </Reveal>
    </div>
  );
}
