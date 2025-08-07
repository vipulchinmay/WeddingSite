import { z } from 'zod';

export const rsvpFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  attending: z.enum(['yes', 'no']),
  guests: z
    .string()
    .optional()
    .or(z.literal('')),
  blessing: z.string().min(1, 'Please leave a blessing'),
});
