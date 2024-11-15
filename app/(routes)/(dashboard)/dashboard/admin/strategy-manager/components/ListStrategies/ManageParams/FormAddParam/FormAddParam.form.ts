import { z } from "zod";

export const formSchema = z.object({
    strategyId: z.string(),
    name: z.string().min(1).max(50),
    description: z.string().max(200),
    value: z.string().min(1).max(50),
    min_value: z.string().max(50),
    max_value: z.string().max(50),
});