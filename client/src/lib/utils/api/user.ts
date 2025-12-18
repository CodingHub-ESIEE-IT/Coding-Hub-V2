import { fetchApi } from "@/lib/utils/api/api";

export const getLatestUsers = (limit: number = 10) => {
    // We used a custom route handler under /api/users/latest
    // fetchApi helper expects the path relative to /api
    // so we pass 'users/latest'
    const searchParams = new URLSearchParams();
    searchParams.append('limit', limit.toString());

    return fetchApi('GET', 'users/latest', searchParams);
}
