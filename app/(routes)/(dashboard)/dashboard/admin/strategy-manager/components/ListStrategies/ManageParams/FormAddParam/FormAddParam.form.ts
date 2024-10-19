import { z } from "zod";

export const formSchema = z.object({
    strategyId: z.string(),
    name: z.string().min(1).max(50),
    value: z.string().min(1).max(50),
});