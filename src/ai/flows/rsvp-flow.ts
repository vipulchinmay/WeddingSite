'use server';
/**
 * @fileOverview A flow for handling RSVP submissions with EmailJS notifications.
 *
 * - submitRsvp - A function that handles the RSVP submission process.
 * - RsvpFormValues - The input type for the submitRsvp function.
 * - sendEmails - Sends both admin and guest emails via EmailJS
 * - getTotalGuestCount - Calculates total number of attending guests
 */

import { ai } from '@/ai/genkit';
import { rsvpFormSchema } from '@/lib/schemas';
import { z } from 'genkit';
import { appendFile, stat, readFile } from 'fs/promises';
import { join } from 'path';

export type RsvpFormValues = z.infer<typeof rsvpFormSchema>;

// EmailJS configuration
const ADMIN_EMAIL = 'm.sai.vipul.18@gmail.com';

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

    // Send emails after successful CSV update
    try {
      // Get total guest count
      const totalGuests = await getTotalGuestCount(filePath);
      
      // Send emails using client-side EmailJS
      await sendEmails(input, totalGuests);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't throw error to prevent RSVP submission failure
    }
  }
);

async function getTotalGuestCount(filePath: string): Promise<number> {
  try {
    const fileContent = await readFile(filePath, 'utf-8');
    const lines = fileContent.trim().split('\n');
    
    let totalCount = 0;
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim()) {
        // Parse CSV row - attending is at index 3, guests at index 4
        const matches = line.match(/"([^"]*)"/g);
        if (matches && matches.length >= 5) {
          const attending = matches[3].replace(/"/g, '');
          const guests = parseInt(matches[4].replace(/"/g, '') || '0');
          
          if (attending.toLowerCase() === 'yes') {
            totalCount += 1 + guests; // +1 for the main guest, +guests for additional
          }
        }
      }
    }
    
    return totalCount;
  } catch (error) {
    console.error('Error calculating total guests:', error);
    return 0;
  }
}

async function sendEmails(guestData: RsvpFormValues, totalGuests: number): Promise<void> {
  // Since we're in a server environment, we'll use fetch to call our API endpoint
  // that handles EmailJS on the client side
  const emailData = {
    guestData,
    totalGuests,
    adminEmail: ADMIN_EMAIL
  };

  try {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002' || 'https://eternalechoes.app.n8n.cloud/webhook-test/a61633c3-1d30-4835-9813-69b24863f606'}/api/send-emails`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(emailData),
    // });
    const response = await fetch('https://eternalechoes.app.n8n.cloud/webhook/rsvp/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error('Failed to send emails');
    }
  } catch (error) {
    console.error('Error calling email API:', error);
    throw error;
  }
}