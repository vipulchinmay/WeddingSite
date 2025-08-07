'use server';
/**
 * @fileOverview A flow for handling RSVP submissions.
 *
 * - submitRsvp - A function that handles the RSVP submission process.
 * - RsvpFormValues - The input type for the submitRsvp function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

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

export type RsvpFormValues = z.infer<typeof rsvpFormSchema>;

export async function submitRsvp(input: RsvpFormValues): Promise<void> {
  await rsvpFlow(input);
}

const rsvpFlow = ai.defineFlow(
  {
    name: 'rsvpFlow',
    inputSchema: rsvpFormSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    // In a real application, you would store this data in a database.
    // For this example, we'll just log it to the console.
    console.log('New RSVP submission:', input);
  }
);
