import {fetchApi} from "@/lib/utils/api";

export async function getTopics(categoryName: string) {
    try {
        const params = new URLSearchParams();
        params.append('category', categoryName);

        return await fetchApi('GET', 'topics', params)
    } catch (error) {
        console.error('Erreur lors de la récupération des topics:', error);
        throw error;
    }
}

export async function getOneTopic(id: number) {
    try {
        return await fetchApi('GET', `topics/${id}`)
    } catch (error) {
        console.error('Erreur lors de la récupération des topics:', error);
        throw error;
    }
}

export const getTopicsByUser = (userId: number) => fetchApi('GET', `topics/user/${userId}`);
