import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const fetchApi = async (
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT',
    url: string,
    searchParams?: URLSearchParams,
    payload: Record<string, any> = {},
) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const fullUrl = new URL(`/api/${url.replace(/^\//, '')}`, baseUrl);
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (searchParams) {
      searchParams.forEach((value, key) => {
        fullUrl.searchParams.append(key, value);
      });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };

    const response = await fetch(fullUrl.toString(), {
      method,
      headers,
      cache: 'no-store',
      body: method !== 'GET' ? JSON.stringify(payload) : null,
    });

    if (response.status === 401) {
      redirect('/connexion');
    }

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();

  } catch (error) {
    if (error && typeof error === 'object' && 'digest' in error) {
      throw error;
    }

    console.error('Erreur fetchApi:', error);
    throw error;
  }
};
