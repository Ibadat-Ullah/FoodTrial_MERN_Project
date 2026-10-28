import { z } from 'zod';

export const foodSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.preprocess(
      (value) => value === '' ? Number.NaN : value,
      z.coerce.number({ error: 'Enter a valid price' }).min(0, 'Price must be zero or more')
    ),
    category: z.string().min(1, 'Category is required'),
    image: z.custom((value) => typeof File !== 'undefined' && value instanceof File, 'Choose a food photo').optional(),
    imageUrl: z.string().optional(),
    available: z.boolean()
  })
  .superRefine((food, context) => {
    if (!food.image && !food.imageUrl) {
      context.addIssue({ code: 'custom', message: 'Choose a food photo', path: ['image'] });
    }
  });
