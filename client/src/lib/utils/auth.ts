import { cache } from 'react';
import { User } from '@/types/user';
import {cookies} from "next/headers";

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  try {
    const response = await fetch(`${process.env.ADONIS_API_URL}/api/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result.user;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
});

export const getAuthToken = (request: Request): string | null => {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.slice(7);
    }
    return null;
}
