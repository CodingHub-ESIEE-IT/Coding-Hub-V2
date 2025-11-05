export interface ActionResponse<T = never> {
  success: boolean;
  message: string;
  data?: T;
  errors?: {
    [key: string]: string[];
  };
}