import { NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/utils/auth';

const ADONIS_API_URL = process.env.ADONIS_API_URL;

export async function GET(
    req: Request,
    { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;

  const token = getAuthToken(req);

  if (!token) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const adonisUrl = `${ADONIS_API_URL}/api/topics/user/${userId}`;

    const response = await fetch(adonisUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
            { error: 'Token invalide ou expiré' },
            { status: 401 }
        );
      }

      if (response.status === 403) {
        return NextResponse.json(
            { error: 'Accès non autorisé à ce topic' },
            { status: 403 }
        );
      }

      return NextResponse.json(
          { error: 'Erreur lors de la récupération des données' },
          { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}