import { NextResponse } from "next/server";

const ADONIS_API_URL = process.env.ADONIS_API_URL;

export async function GET(req: Request) {
    try {
        // Forward the limit query param if present
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get('limit') || '10';

        const adonisUrl = `${ADONIS_API_URL}/api/users/latest?limit=${limit}`;

        // Public route, but we might want to pass auth token if available (optional here)
        // For now, let's keep it simple as it's a public landing page component

        const response = await fetch(adonisUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 } // Cache for 1 minute
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Erreur lors de la récupération des utilisateurs' },
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
