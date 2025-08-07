'use server';
/**
 * @fileOverview A flow for handling RSVP submissions.
 *
 * - submitRsvp - A function that handles the RSVP submission process.
 * - RsvpFormValues - The input type for the submitRsvp function.
 */

import { ai } from '@/ai/genkit';
import { rsvpFormSchema } from '@/lib/schemas';
import { z } from 'genkit';
import { appendFile, stat } from 'fs/promises';
import { join } from 'path';

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
    const filePath = join(process.cwd(), 'rsvps.csv');
    const headers = 'Name,Email,Phone,Attending,Guests,Blessing\n';
    const row = `"${input.name}","${input.email}","${input.phone}","${input.attending}","${input.guests || '0'}","${input.blessing.replace(/"/g, '""')}"\n`;

    try {
      await stat(filePath);
    } catch (error) {
      // File doesn't exist, create it with headers
      await appendFile(filePath, headers);
    }

    await appendFile(filePath, row);
  }
);
