import api from '@/services/api';

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  listId?: string;
  priorityId?: string | null;
  dueDate?: string | null;
  completed?: boolean;
  /** `status` is the field the PATCH endpoint reads for the completion toggle. */
  status?: boolean;
}

export const updateTask = async (taskId: string, data: UpdateTaskDto): Promise<void> => {
  if (!taskId) throw new Error('A task ID is required to update it');

  try {
    await api.patch(`/tasks/${encodeURIComponent(taskId)}`, data);
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 401) throw new Error('Session expired. Please log in again');
    if (status === 403) throw new Error('You do not have permission to update this task');
    if (status === 404) throw new Error('This task could not be found');
    if (!error.response) throw new Error('Cannot reach the server. Check your connection');
    throw new Error('Failed to update task');
  }
};

export default updateTask;
