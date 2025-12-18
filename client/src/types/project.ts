import { User } from "@/types/user";

export type Project = {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    repositoryUrl: string | null;
    demoUrl: string | null;
    thumbnailUrl: string | null;
    userId: number;
    user?: User;
    createdAt: string;
    updatedAt: string | null;
};
