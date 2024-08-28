import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/send-email';
import { generateVerifyEmailText } from '@/emails/verify-email';
import { applicationName } from '@/app-config';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    const { email, token } = JSON.parse(rawBody);
    await sendEmail(
      email,
      `Verify your email for ${applicationName}`,
      generateVerifyEmailText({token})
    );

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
  }
}
