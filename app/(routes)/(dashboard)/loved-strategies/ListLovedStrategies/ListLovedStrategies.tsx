"use client";

import { Button } from "@/components/ui/button";
import { useLovedStrategies } from "@/hooks/used-loved-strategies";
import { Strategy } from "@prisma/client";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ListLovedStrategies() {
  const { addLoveItem, lovedItems, removeLovedItem } = useLovedStrategies();

  return (
    <>
      {lovedItems.length === 0 ? (
        <p>No tienes estrategias en tu lista de favoritos</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {lovedItems.map((strategy: Strategy) => {
            const { name, description, photo, id } = strategy;

            const likedStrategy = lovedItems.find((item) => item.id === id);

            return (
              <div
                key={id}
                className="p-1 rounded-lg shadow-md hover:shadow-lg"
              >
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
                    <Link href={`/dashboard/probe-strategy?id=${strategy.id}`}>
                      <Button onClick={() => strategy}>
                        Probar estrategia
                      </Button>
                    </Link>
                    <Heart
                      className={`mt-2 cursor-pointer size-8 ${
                        likedStrategy && "fill-red-500"
                      }`}
                      onClick={
                        likedStrategy
                          ? () => removeLovedItem(id)
                          : () => addLoveItem(strategy)
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
