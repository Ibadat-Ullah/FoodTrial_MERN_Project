import { z } from 'zod';

export const orderSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  items: z.string().min(1, 'Order items are required'),
  total: z.preprocess(
    (value) => value === '' ? Number.NaN : value,
    z.coerce.number({ error: 'Enter a valid total' }).min(0, 'Total must be zero or more')
  ),
  status: z.enum(['pending', 'preparing', 'delivered', 'cancelled'])
});
