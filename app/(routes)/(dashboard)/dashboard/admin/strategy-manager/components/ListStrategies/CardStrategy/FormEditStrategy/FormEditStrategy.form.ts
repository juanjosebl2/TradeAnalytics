import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(0).max(500),
    photo: z.string().min(2).max(100),
    isPublic: z.boolean(),
});