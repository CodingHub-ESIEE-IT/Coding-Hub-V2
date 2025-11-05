'use server';

import { ActionResponse } from '@/types/action';
import { cookies } from 'next/headers';
import {revalidatePath} from "next/cache";

export async function editUserAction(
  prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  try {
    const userData = {
      id: formData.get('id'),
      username: formData.get('username'),
      email: formData.get('email'),
      bio: formData.get('bio'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
    };

    const response = await fetch(
      `${process.env.ADONIS_API_URL}/api/users/${userData.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      },
    );

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Erreur serveur' }));

      return {
        success: false,
        message:
          errorData.message ||
          'Une erreur est survenue lors de la mise à jour du profil.',
        errors: errorData.errors || {},
      };
    }

    return {
      success: true,
      message: 'Profil modifié avec succès.',
    };
  } catch (error) {
    console.error('Error updating user:', error);

    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

    return {
      success: false,
      message: 'Une erreur est survenue lors de la mise à jour du profil.',
      errors: {},
    };
  }
}

export async function editAvatarAction(
  prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  try {
    const avatarUrl = formData.get('avatarUrl') as string;

    if (!avatarUrl) {
      return {
        success: false,
        errors: {
          avatarUrl: ["L'URL de l'avatar est requise."],
        },
        message: 'Données invalides.',
      };
    }

    const response = await fetch(`${process.env.ADONIS_API_URL}/api/avatar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatarUrl: formData.get('avatarUrl') }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Erreur serveur' }));

      return {
        success: false,
        message:
          errorData.message ||
          'Une erreur est survenue lors de la mise à jour du profil.',
        errors: errorData.errors || {},
      };
    }

    revalidatePath('/profil/edit')

    return {
      success: true,
      message: 'Avatar mis à jour avec succès.',
    };
  } catch (error) {
    console.error('Error updating user:', error);

    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

    return {
      success: false,
      message: 'Une erreur est survenue lors de la mise à jour du profil.',
      errors: {},
    };
  }
}
