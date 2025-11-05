'use server';

import { ActionResponse } from '@/types/action';
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export async function createTopicAction(
  prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  try {
    const categoriesString = formData.get('categories') as string;
    const categories = JSON.parse(categoriesString || '[]') as number[];

    const topicData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      status: 'draft',
      categoryIds: categories,
    };

    const response = await fetch(`${process.env.ADONIS_API_URL}/api/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(topicData),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Erreur serveur' }));

      return {
        success: false,
        message:
          errorData.message ||
          'Une erreur est survenue lors de la création du sujet.',
        errors: errorData.errors || {},
      };
    }

    const result = await response.json();

    redirect(`/forum/topics/${result.id}`);

    return {
      success: true,
      message: 'Sujet créé avec succès.',
      data: result,
    };
  } catch (error) {
    console.error('Error creating topic:', error);

    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

    return {
      success: false,
      message: 'Une erreur est survenue lors de la création du sujet.',
      errors: {},
    };
  }
}
