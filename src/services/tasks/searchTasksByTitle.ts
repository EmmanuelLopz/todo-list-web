import api from '@/services/api';
import type { Task } from '@/types/Task';
import type { TodoResponse } from './getTasksByListId';

const mapToTask = (item: TodoResponse): Task => ({
  id: String(item.id),
  title: item.title,
  description: item.description ?? '',
  completed: Boolean(item.completed) || Boolean(item.status),
  priorityName: item.priorityName ?? null,
  dueDate: item.dueDate ?? null,
  priorityId: item.priorityId != null ? String(item.priorityId) : null,
});

export const searchTasksByTitle = async (title: string): Promise<Task[]> => {
  if (!title.trim()) return [];

  try {
    const response = await api.get<TodoResponse[]>('/tasks/search/title', {
      params: { title: title.trim() },
    });
    return response.data.map(mapToTask);
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 401) throw new Error('Session expired. Please log in again');
    if (status === 403) throw new Error('You do not have permission to search tasks');
    if (!error.response) throw new Error('Cannot reach the server. Check your connection');
    throw new Error('Something went wrong while searching tasks');
  }
};
