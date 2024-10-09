"use client";

import { Reveal } from "@/components/Shared/Reveal";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { dataSymbols } from "./SliderSymbols.data";
import Image from "next/image";

export function SliderSymbols() {
  return (
    <Reveal
      position="bottom"
      className="flex justify-center mt-20 mb-20 gap-x-20 lg:pb-2"
    >
      <Carousel
        className="w-full max-w-6xl mx-auto"
        plugins={[
          Autoplay({
            delay: 2500,
          }),
        ]}
      >
        <CarouselContent>
          {dataSymbols.map(({ url }) => (
            <CarouselItem
              key={url}
              className="flex items-center justify-center basis-1/5"
            >
              <Image
                src={`/images/symbols/${url}`}
                alt="Brand"
                width={90}
                height={90}
                className=" w-[90px] h-[90px] rounded-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Reveal>
  )
}
