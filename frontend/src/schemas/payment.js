import { z } from 'zod';

export const paymentSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  amount: z.preprocess(
    (value) => value === '' ? Number.NaN : value,
    z.coerce.number({ error: 'Enter a valid amount' }).min(0, 'Amount must be zero or more')
  ),
  method: z.enum(['cash', 'card', 'online']),
  status: z.enum(['pending', 'paid', 'failed'])
});
