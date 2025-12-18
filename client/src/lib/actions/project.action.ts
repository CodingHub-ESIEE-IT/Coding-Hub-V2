'use server';

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createProjectAction(formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    try {
        const projectData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            repositoryUrl: formData.get('repositoryUrl') as string,
            demoUrl: formData.get('demoUrl') as string,
            thumbnailUrl: formData.get('thumbnailUrl') as string,
        };

        if (!projectData.title) {
            return { error: 'Le titre est requis' };
        }

        const response = await fetch(`${process.env.ADONIS_API_URL}/api/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            const errorText = await response.text()
            console.error("=== ERREUR SERVEUR ===")
            console.error("Status:", response.status)
            console.error("Response:", errorText)
            console.error("=====================")
            throw new Error(`Erreur lors de la création du projet: ${response.statusText}`);
        }

        revalidatePath('/projects');
        return await response.json();
    } catch (error) {
        console.error('Error creating project:', error);
        return { error: 'Une erreur est survenue lors de la création du projet' };
    }
}
