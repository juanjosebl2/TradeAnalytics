import { CardStrategy } from "./CardStrategy";
import { ListStrategiesProps } from "./ListStrategies.types";

export function ListStrategies(props: ListStrategiesProps) {
  const { strategies } = props;

  return (
    <div className="grid grid-cols-2 gap-6 my-4 lg:grid-cols-4">
        {strategies.map((strategy) => (
            <CardStrategy key={strategy.id} strategy={strategy} />
        ))}
    </div>
  );
}