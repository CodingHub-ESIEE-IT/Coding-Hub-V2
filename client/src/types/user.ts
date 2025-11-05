export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null
  role: "user" | "admin" | "developer";
  createdAt: string;
  updatedAt: string;
}