import { Strategy } from "@prisma/client";

export type CardStrategyProps = {
    strategy: Strategy;
    onSelectStrategy: (strategy: Strategy) => void;
};