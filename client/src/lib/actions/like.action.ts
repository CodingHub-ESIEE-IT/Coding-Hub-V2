'use server';

import { getCurrentUser } from '@/lib/utils/auth';
import { cookies } from 'next/headers';

export async function createLikeAction(replyId: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  const user = await getCurrentUser();

  const likeData = {
    userId: user?.id,
    replyId,
  };

  try {
    const response = await fetch(`${process.env.ADONIS_API_URL}/api/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(likeData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('=== ERREUR SERVEUR ===');
      console.error('Status:', response.status);
      console.error('Response:', errorText);
      console.error('=====================');
    }

    return await response.json();
  } catch (error) {
    console.error('Error parsing form data:', error);
    return { error: 'Invalid form data' };
  }
}

export async function deleteLikeAction(replyId: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  try {
    const response = await fetch(`${process.env.ADONIS_API_URL}/api/likes/by-reply/${replyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: (await getCurrentUser())?.id }),
    });
    console.log(response)
    if (!response.ok) {
      const errorText = await response.text();
      console.error('=== ERREUR SERVEUR ===');
      console.error('Status:', response.status);
      console.error('Response:', errorText);
      console.error('=====================');
    }
    return await response.json();
  } catch (error) {
    console.error('Error parsing form data:', error);
    return { error: 'Invalid form data' };
  }
}
