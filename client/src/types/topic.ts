import {User} from "@/types/user";
import {Category} from "@/types/category";
import {Reply} from "@/types/reply";

export enum TopicStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  CLOSED = 'closed',
}

export interface Topic {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: TopicStatus;
  user: User;
  categories: Category[];
  replies: Reply[];
  resolveAt: string | null;
  createdAt: string;
  updatedAt: string;
}