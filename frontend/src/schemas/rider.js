import { z } from 'zod';

export const riderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  vehicleNumber: z.string().min(1, 'Vehicle number is required'),
  status: z.enum(['available', 'busy'])
});
