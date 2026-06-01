import type { TaskList } from "@/types/TaskList";
import api from "../api";

export interface CreateListDto {
  title: string;
  description?: string;
  colorId?: string;
}

export const createList = async (data: CreateListDto): Promise<TaskList> => {
  const response = await api.post<TaskList>("/lists", {
    title: data.title,
    description: data.description,
    colorId: data.colorId || undefined,
  });

  return response.data;
};