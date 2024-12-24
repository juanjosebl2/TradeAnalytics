import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(0).max(200),
    value: z.string().min(1).max(50),
    min_filter_value: z.string().min(0).max(50),
    max_filter_value: z.string().min(0).max(50),
});