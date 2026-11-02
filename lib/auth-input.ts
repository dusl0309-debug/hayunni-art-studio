import { z } from 'zod';
export const emailSchema=z.string().trim().email().max(254);
export const passwordLoginSchema=z.object({email:emailSchema,password:z.string().min(1).max(128)});
export const newPasswordSchema=z.string().min(12).max(128);
