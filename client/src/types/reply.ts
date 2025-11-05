import {User} from "@/types/user";
import {Topic} from "@/types/topic";
import {Like} from "@/types/like";

export interface Reply {
  id: number;
  userId: number;
  topicId: number;
  user?: User;
  topic?: Topic;
  likes?: Like[];
  bestAnswer: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
}