import { Param } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type FormEditParamProps = {
    paramData: Param;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
};