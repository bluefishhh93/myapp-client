import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UseVerifyEmailOptions {
  onSuccess?: () => void;
  onFailure?: () => void;
}

export function useVerifyEmail({ onSuccess, onFailure }: UseVerifyEmailOptions) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('No token found');
        router.push('/sign-in');
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/email-verification/verify?token=${token}`
        );
        const data = await response.json();

        if (data.success) {
          if (onSuccess) onSuccess();
          router.push('/home');
        } else {
          if (onFailure) onFailure();
          setError('Verification failed');
          router.push('/sign-in');
        }
      } catch (error) {
        console.error('Verification failed:', error);
        setError('Verification failed');
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router, onSuccess, onFailure]);

  return { loading, error };
}
