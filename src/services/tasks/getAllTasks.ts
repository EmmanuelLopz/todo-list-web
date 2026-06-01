import api from '@/services/api';
import { normalizeUuid } from '@/utils/uuid';
import type { TodoResponse } from './getTasksByListId';

export interface TaskSummary {
  listId: string;
  completed: boolean;
}

// GET /tasks — all tasks for the authenticated user.
// Only the fields needed to compute per-list completion stats are kept.
export const getAllTasks = async (): Promise<TaskSummary[]> => {
  const response = await api.get<TodoResponse[]>('/tasks');
  return response.data
    .filter((item) => item.listId)
    .map((item) => ({
      listId: normalizeUuid(item.listId!),
      completed: Boolean(item.completed) || Boolean(item.status),
    }));
};
