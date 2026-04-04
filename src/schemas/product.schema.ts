import { z } from 'zod';

export const variantSchema = z.object({
  options: z.object({
    color: z.string().min(1, 'Color is required'),
    size: z.string().min(1, 'Size is required'),
    material: z.string().min(1, 'Material is required'),
  }),
  price: z.number().min(1, 'Price must be greater than 0'),
  stock: z.number().min(0, 'Stock cannot be negative'),
});

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Product description is required'),
  variants: z.array(variantSchema).min(1, 'At least one variant is required'),
  productImage: z.file().optional(),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
