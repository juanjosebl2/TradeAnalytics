import { Param, Strategy } from "@prisma/client"

export type FormProbeStrategyProps = {
    strategy: Strategy,
    params: Param[],
}