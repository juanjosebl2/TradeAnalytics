"use client";

import { Strategy } from "@prisma/client";
import { ListStrategiesProps } from "./ListStrategies.types";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useLovedStrategies } from "@/hooks/used-loved-strategies";
import { Button } from "@/components/ui/button";

export function ListStrategies(props: ListStrategiesProps) {
  const { strategies, onSelectStrategy } = props;
  const { addLoveItem, lovedItems, removeLovedItem } = useLovedStrategies();

  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {strategies?.map((strategy: Strategy) => {
        const {
          id,
          name,
          description,
          photo,
        } = strategy;

        const likedStrategy = lovedItems.find((item) => item.id === id)

        return (
          <div key={id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
            <Image
              src={photo}
              alt={name}
              width={400}
              height={600}
              className="rounded-lg"
            />
            <div className="p-3">
              <div className="mb-10">
                <p className="mb-4 text-xl min-h-16 lg:min-h-fit font-bold">
                  {name}
                </p>
                <p className="text-xl min-h-16 lg:min-h-fit">
                  {description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 gap-x-3 w-full h-full">

                <Button
                  onClick={() => onSelectStrategy(strategy)}
                >
                  Probar estrategia
                </Button>
                <Heart
                  className={`mt-2 cursor-pointer size-8 ${likedStrategy && "fill-red-500"}`}
                  onClick={likedStrategy ? () => removeLovedItem(id) : () => addLoveItem(strategy)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}