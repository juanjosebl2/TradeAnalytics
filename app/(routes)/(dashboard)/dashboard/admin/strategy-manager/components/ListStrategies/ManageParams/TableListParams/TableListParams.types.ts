import { Param } from "@prisma/client"

export type TableListParamsProps = {
    params: Param[],
    onBack: () => void;
}