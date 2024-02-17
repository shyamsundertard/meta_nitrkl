import { z } from 'zod';

export const createDataSchema = z.object({
    id: z.number(),
    title: z.string().min(1, 'Title is Required').max(500),
    description: z.array(z.record(z.unknown())).min(1)
});
