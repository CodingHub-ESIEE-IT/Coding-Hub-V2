'use server';

import {cookies} from "next/headers";

export async function createReplyAction(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  try {
    const replyData = {
      content: formData.get('content') as string,
      topicId: formData.get('topicId'),
    };

    if (!replyData.content || !replyData.topicId) {
      return { error: 'Contenu et ID du topic requis' };
    }

    const response = await fetch(`${process.env.ADONIS_API_URL}/api/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(replyData),
    });

    if(!response.ok) {
      const errorText = await response.text()
      console.error("=== ERREUR SERVEUR ===")
      console.error("Status:", response.status)
      console.error("Response:", errorText)
      console.error("=====================")
    }

    return await response.json();
  } catch (error) {
    console.error('Error parsing form data:', error);
    return { error: 'Invalid form data' };
  }
}

export async function toggleBestAnswerAction(replyId: number) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    try {
        const response = await fetch(`${process.env.ADONIS_API_URL}/api/replies/${replyId}/best-answer`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        });

        if(!response.ok) {
        const errorText = await response.text()
        console.error("=== ERREUR SERVEUR ===")
        console.error("Status:", response.status)
        console.error("Response:", errorText)
        console.error("=====================")
        }

        return await response.json();
    } catch (error) {
        console.error('Error toggling best answer:', error);
        return { error: 'Error toggling best answer' };
    }
}