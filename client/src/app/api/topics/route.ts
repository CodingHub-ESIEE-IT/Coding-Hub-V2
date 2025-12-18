import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/lib/utils/api/auth";

const ADONIS_API_URL = process.env.ADONIS_API_URL;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const token = getAuthToken(request)

    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const adonisUrl = new URL('/api/topics', ADONIS_API_URL);

    if (category) {
      adonisUrl.searchParams.append('category', category);
    }

    const response = await fetch(adonisUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des données' },
        { status: response.status }
      );
    }

    const { data } = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function POST() { }