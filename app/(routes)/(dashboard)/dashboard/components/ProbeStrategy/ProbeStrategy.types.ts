import { Strategy } from "@prisma/client"

export type ProbeStrategyProps = {
    strategy: Strategy,
    onBack: () => void;
}