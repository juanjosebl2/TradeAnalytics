import { Button } from "@/components/ui/button";
import { ProbeStrategyProps } from "./ProbeStrategy.types";

export function ProbeStrategy({ strategy, onBack }: ProbeStrategyProps) {

  return (
    <div>
      <p>{strategy.name}</p>
      <Button onClick={() => onBack()}>Volver</Button>
    </div>
  );
}
