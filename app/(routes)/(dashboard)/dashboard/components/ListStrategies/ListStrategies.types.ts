import { Strategy } from "@prisma/client"

export type ListStrategiesProps = {
    strategies: Strategy[] | undefined,
    onSelectStrategy: (strategy: Strategy) => void;
}