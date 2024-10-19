import { Param, Strategy } from "@prisma/client";

export type ListStrategiesProps = {
    strategies: Strategy[];
    params: Param[];
};