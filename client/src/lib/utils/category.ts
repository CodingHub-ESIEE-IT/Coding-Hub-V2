import {fetchApi} from "@/lib/utils/api";

export const getCategories = () => fetchApi('GET', 'categories');
