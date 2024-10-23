import { z } from "zod";

export const formSchema = z.object({
    symbol: z.string().min(2).max(50),
    period: z.string().min(2).max(50),
    fromDate: z.string().min(2).max(50),
    toDate: z.string().min(2).max(50),
    deposit: z.string().min(2).max(50),
    currency: z.string().min(2).max(50),
    leverage: z.string().min(2).max(50),
});