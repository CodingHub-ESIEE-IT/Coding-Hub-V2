import { fetchApi } from "@/lib/utils/api/api";

export const getCategories = () => fetchApi('GET', 'categories');
