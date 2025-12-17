import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * POST /api/send-email
 * Handles contact form submissions and sends emails
 * 
 * Expected request body:
 * {
 *   name: string,
 *   email: string,
 *   message: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email to the portfolio owner (Kolaan)
    const ownerEmailResponse = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'yendukua84@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p style="color: #666;">You have received a new message from your portfolio contact form.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #333;">${message}</p>
          </div>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            This email was sent from your portfolio contact form at kolaan-portfolio.lindy.site
          </p>
        </div>
      `,
    });

    // Check if email to owner was sent successfully
    if (ownerEmailResponse.error) {
      console.error('Error sending email to owner:', ownerEmailResponse.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to the visitor
    const confirmationEmailResponse = await resend.emails.send({
      from: 'Kolaan Moses Yendukua <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You, ${name}!</h2>
          <p style="color: #666;">Thank you for reaching out through my portfolio contact form. I have received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p style="white-space: pre-wrap; color: #333;">${message}</p>
          </div>
          
          <p style="color: #666;">Best regards,<br><strong>Kolaan Moses Yendukua</strong></p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            Computer Scientist, Educator & Conservationist
          </p>
        </div>
      `,
    });

    // Log confirmation email result (but don't fail if it doesn't send)
    if (confirmationEmailResponse.error) {
      console.warn('Warning: Confirmation email not sent:', confirmationEmailResponse.error);
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully!',
        data: {
          ownerEmailId: ownerEmailResponse.data?.id,
          confirmationEmailId: confirmationEmailResponse.data?.id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error('Error in send-email API route:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
