import { Strategy } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type FormEditStrategyProps = {
    strategyData: Strategy;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
};