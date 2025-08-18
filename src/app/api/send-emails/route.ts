// app/api/send-emails/route.ts
import { NextRequest, NextResponse } from 'next/server';
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_xuepv7c';
const EMAILJS_ADMIN_TEMPLATE_ID = 'template_ua9gnxh';
const EMAILJS_GUEST_TEMPLATE_ID = 'template_ki5glh6';
const EMAILJS_PUBLIC_KEY = 'QSUyf6srSBvLlfhiJ';

export async function POST(request: NextRequest) {
  try {
    const { guestData, totalGuests, adminEmail } = await request.json();
    
    // Initialize EmailJS
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY,
    });

    const promises = [];

    // Send admin notification
    const guestCount = guestData.attending.toLowerCase() === 'yes' 
      ? 1 + (parseInt(guestData.guests?.toString() || '0')) 
      : 0;

    const adminTemplateParams = {
      to_email: adminEmail,
      guest_name: guestData.name,
      guest_email: guestData.email,
      guest_phone: guestData.phone,
      attending_status: guestData.attending,
      additional_guests: guestData.guests || 0,
      total_people_this_rsvp: guestCount,
      blessing_message: guestData.blessing || 'No blessing message provided',
      total_guests_overall: totalGuests,
      attendance_color: guestData.attending.toLowerCase() === 'yes' ? '#27ae60' : '#e74c3c',
    };

    promises.push(
      emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        adminTemplateParams
      )
    );

    // Send guest confirmation (only if attending)
    if (guestData.attending.toLowerCase() === 'yes') {
      const guestTemplateParams = {
        to_email: guestData.email,
        guest_name: guestData.name,
        additional_guests: guestData.guests || 0,
        additional_guests_text: guestData.guests && parseInt(guestData.guests.toString()) > 0 
          ? `and your ${guestData.guests} additional guest${parseInt(guestData.guests.toString()) > 1 ? 's' : ''}` 
          : '',
        venue_name: 'Grand Ballroom, The Heritage Palace',
        venue_address: '123 Wedding Avenue, Celebration City',
        venue_landmark: 'Near Central Park, Landmark District',
        venue_phone: '+91 98765 43210',
        ceremony_time: '11:00 AM - 1:00 PM',
        lunch_time: '1:00 PM - 3:00 PM',
        evening_time: '7:00 PM - 11:00 PM',
        morning_dress_code: 'Traditional/Ethnic wear preferred. Think vibrant colors like royal blue, emerald green, or deep maroon. Avoid white and black.',
        evening_dress_code: 'Semi-formal to formal attire. Cocktail dresses, suits, or elegant ethnic wear. Metallics and jewel tones are perfect!',
        bride_name: 'Sarika', // Replace with actual names
        groom_name: 'Arjun', // Replace with actual names
        coordinator_name: 'Vipul', // Replace with actual coordinator
        coordinator_phone: '+91 98765 43210',
        coordinator_email: 'vipul@example.com',
        personal_message: `Dear ${guestData.name}, we are absolutely thrilled that you'll be joining us on our special day! Your presence will make our celebration complete and fill our hearts with even more joy.`,
        couple_message: 'As we embark on this beautiful journey together, having you celebrate with us means the world to us. Your love, support, and presence have been such important parts of our story, and we can\'t wait to share this magical day with you. Get ready for lots of love, laughter, dancing, and unforgettable memories! Thank you for being part of our happily ever after.'
      };

      promises.push(
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_GUEST_TEMPLATE_ID,
          guestTemplateParams
        )
      );
    }

    // Wait for all emails to send
    await Promise.all(promises);

    return NextResponse.json({ 
      success: true, 
      message: 'Emails sent successfully' 
    });

  } catch (error) {
    console.error('Failed to send emails:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send emails' 
      },
      { status: 500 }
    );
  }
}