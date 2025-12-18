import { fetchApi } from "@/lib/utils/api/api";

export const getProjects = () => fetchApi('GET', 'projects');
