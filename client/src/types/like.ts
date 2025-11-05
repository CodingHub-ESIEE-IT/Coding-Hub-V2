import {User} from "@/types/user";
import {Reply} from "@/types/reply";

export interface Like {
  id: number;
  userId: number;
  replyId: number;
  user?: User;
  reply?: Reply;
  createdAt: string;
  updatedAt: string;
}