import { Strategy } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type FormAddParamProps = {
    strategy: Strategy,
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
};