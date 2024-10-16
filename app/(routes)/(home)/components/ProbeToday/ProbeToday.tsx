import { Reveal } from "@/components/Shared/Reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spline from "@splinetool/react-spline/next";

export function ProbeToday() {
  return (
    <div className="p-6 mx-auto lg:my-32 max-w-7xl">
      <div className="rounded-xl relative bg-[url('/images/background-probe-today.webp')] bg-center bg-no-repeat bg-cover min-h-[400px]">
        <div className="lg:flex gap-x-1">
          <div className="p-8 lg:p-14">
            <h3 className="text-4xl text-white">
              Invierta su dinero y produzca rentabilidad
            </h3>
            <p className="my-5 text-xl text-white">
              Registrate y explora las mejores estrategias
            </p>
            <Link href="/sign-in">
              <Button size="lg" variant="outline">
                Regístrate aquí
              </Button>
            </Link>
          </div>
          <Reveal
            position="bottom"
            className="h-[300px] w-[400px] mt-10"
          >
            <Spline scene="https://prod.spline.design/QZEpLbHHAFPLiQ3M/scene.splinecode"/>
            {/* <Image
              src="/images/fondo-trans-1.png"
              alt="Car Drive"
              width={550}
              height={250}
              className="rounded-lg"
            /> */}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
