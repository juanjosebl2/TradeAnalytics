import { Param, Strategy } from "@prisma/client"

export type ManageParamsProps = {
    strategy: Strategy,
    params: Param[],
    onBack: () => void;
}