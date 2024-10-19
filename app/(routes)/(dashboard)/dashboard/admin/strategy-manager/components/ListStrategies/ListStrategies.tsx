"use client";

import { useState } from "react";
import { CardStrategy } from "./CardStrategy";
import { ListStrategiesProps } from "./ListStrategies.types";
import { Strategy } from "@prisma/client";
import { ManageParams } from "./ManageParams";
import { ButtonAddStrategy } from "../ButtonAddStrategy";
import { ButtonAddParam } from "./ManageParams/ButtonAddParam";

export function ListStrategies(props: ListStrategiesProps) {
  const { strategies, params } = props;
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
    null
  );

  const handleSelectStrategy = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
  };

  const handleBack = () => {
    setSelectedStrategy(null);
  };

  return (
    <>
      {selectedStrategy ? (
        <>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Gestionar parametros</h2>
            <ButtonAddParam strategy={selectedStrategy} />
          </div>
          <ManageParams strategy={selectedStrategy} params={params} onBack={handleBack} />
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Administrar estrategias</h2>
            <ButtonAddStrategy />
          </div>
          <div className="grid grid-cols-2 gap-6 my-4 lg:grid-cols-4">
            {strategies.map((strategy) => (
              <CardStrategy
                key={strategy.id}
                strategy={strategy}
                onSelectStrategy={handleSelectStrategy}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
