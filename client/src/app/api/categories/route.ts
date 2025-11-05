import {NextResponse} from "next/server";
import {getAuthToken} from "@/lib/utils/auth";

const ADONIS_API_URL = process.env.ADONIS_API_URL;

export async function GET(req: Request) {
  try {
    const adonisUrl = `${ADONIS_API_URL}/api/categories`;

    const token = getAuthToken(req);

    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const response = await fetch(adonisUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
          { error: 'Erreur lors de la récupération des données' },
          { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
        { error: 'Erreur serveur' },
        { status: 500 }
    );
  }
}

export async function POST() {}