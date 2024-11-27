import { Reveal } from "@/components/Shared/Reveal";
import { dataFeatures } from "./Features.data";

export function Features() {
  return (
    <div className="max-w-6xl p-6 mx-auto lg:py-40">
      <h3 className="text-2xl font-bold lg:text-6xl">
        Caracteristica principales
      </h3>
      <p className="max-w-lg mt-5 text-xl lg:mt-10 lg:mb-16">
        Las mejores herramientas, garantizando calidad y adaptabilidad para el
        desarrollo del proyecto.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5">
        {dataFeatures.map(({ icon: Icon, text, bg, delay }) => (
          <Reveal
            key={text}
            className="flex flex-col items-center p-6 rounded-xl hover:shadow-md"
            position="right"
            delay={delay}
          >
            <div
              className={`rounded-full ${bg} w-fit p-4 mb-4 flex justify-center`}
            >
              <Icon className="w-8 h-8" />
            </div>
            <p className="text-xl font-bold text-center">{text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
