import { z } from 'zod';

export const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Enter your name'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  address: z.string().min(5, 'Enter your delivery address'),
  method: z.enum(['cash', 'card', 'online'])
});
