// app/verify-email/page.tsx
import { redirect } from 'next/navigation';
import {createApi} from '@/data-access/rest';

async function verifyEmail(token: string): Promise<boolean> {
  try {
    const api = createApi();
    const response = await api.post('/user/verify-email', { token });
    return response.status === 200;
  } catch (error) {
    console.error('Error verifying email:', error);
    return false;
  }
}

export default async function VerifyEmailPage({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token;

  if (!token) {
    redirect('/sign-in');
    return null; // Return null to ensure the function completes properly after redirect
  }

  const isVerified = await verifyEmail(token);

  if (isVerified) {
    redirect('/verify-success');
  } else {
    redirect('/sign-in');
  }

  return null; // Return null to ensure the function completes properly
}
