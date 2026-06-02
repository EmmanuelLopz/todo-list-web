import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import TaskItem from "../../components/TaskItem/TaskItem";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";
import { getTasksByListId } from "../../services/tasks/getTasksByListId";
import { updateTask } from "../../services/tasks/updateTask";
import { deleteTask } from "../../services/tasks/deleteTask";
import { createTask } from "../../services/tasks/createTask";
import type { TaskList } from "../../types/TaskList";
import type { Task } from "../../types/Task";
import type { CreateTaskFormData } from "../../components/CreateTaskModal/CreateTaskModal";
import type { EditTaskFormData } from "../../components/EditTaskModal/EditTaskModal";
import Button from "../../components/Button/Button";

interface LocationState {
  list?: TaskList;
}

const ListDetail = () => {
  const navigate = useNavigate();
  const { id: listId } = useParams<{ id: string }>();
  const { state } = useLocation() as { state: LocationState | null };
  const list = state?.list;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const accentColor = list?.color ?? "#7c3aed";

  const loadTasks = () => {
    if (!listId) return;
    setLoading(true);
    setError(null);
    getTasksByListId(listId)
      .then(setTasks)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const percentage =
    tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  // ── Toggle completion ──────────────────────────────────────────────────────
  const handleToggle = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || !listId) return;

    const newCompleted = !task.completed;
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: newCompleted } : t))
    );
    setSaveError(null);

    try {
      await updateTask(taskId, {
        status: newCompleted,
        title: task.title,
        description: task.description || undefined,
        priorityId: task.priorityId ?? null,
        dueDate: task.dueDate ?? null,
      });
    } catch (err: unknown) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: task.completed } : t))
      );
      setSaveError(err instanceof Error ? err.message : "Failed to save. Please try again.");
    }
  };

  // ── Edit task ──────────────────────────────────────────────────────────────
  const handleEditSubmit = async (data: EditTaskFormData) => {
    if (!editingTask) return;
    await updateTask(editingTask.id, {
      title: data.title,
      description: data.description || undefined,
      priorityId: data.priorityId || null,
      dueDate: data.dueDate
        ? data.dueDate.length === 16
          ? data.dueDate + ":00"
          : data.dueDate
        : null,
    });
    setEditingTask(null);
    loadTasks();
  };

  // ── Delete task ────────────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!deletingTaskId) return;
    setDeleting(true);
    try {
      await deleteTask(deletingTaskId);
      setTasks((prev) => prev.filter((t) => t.id !== deletingTaskId));
      setDeletingTaskId(null);
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Failed to delete task.");
      setDeletingTaskId(null);
    } finally {
      setDeleting(false);
    }
  };

  // ── Create task ────────────────────────────────────────────────────────────
  const handleCreateTask = async (data: CreateTaskFormData) => {
    if (!listId) return;
    await createTask({
      title: data.title,
      description: data.description || undefined,
      listId,
      priorityId: data.priorityId || undefined,
      dueDate: data.dueDate
        ? data.dueDate.length === 16
          ? data.dueDate + ":00"
          : data.dueDate
        : undefined,
    });
    setCreateModalOpen(false);
    loadTasks();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

      {/* Back button */}
      <button
        onClick={() => navigate("/home")}
        className="flex items-center gap-2 text-sm text-gray-500
                   hover:text-blue-700 transition-colors group"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
          fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.5}
        >
          <polyline points="10,4 6,8 10,12" />
        </svg>
        Back to Dashboard
      </button>

      {/* List header card */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="h-1 w-full" style={{ backgroundColor: accentColor }} />

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: accentColor + "18" }}
              >
                <svg
                  className="w-6 h-6" style={{ color: accentColor }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path
                    strokeLinecap="round" strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2
                       M9 5a2 2 0 002 2h2a2 2 0 002-2
                       M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {list?.title ?? "List Detail"}
                </h1>
                {list?.subtitle && (
                  <p className="text-sm text-gray-500 mt-0.5">{list.subtitle}</p>
                )}
              </div>
            </div>

            {!loading && (
              <div className="flex gap-5 flex-shrink-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{tasks.length}</div>
                  <div className="text-xs text-gray-400 font-medium">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: accentColor }}>
                    {completedTasks.length}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">Done</div>
                </div>
              </div>
            )}
          </div>

          {!loading && (
            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 font-medium">Overall progress</span>
                <span className="font-bold" style={{ color: accentColor }}>{percentage}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${percentage}%`, backgroundColor: accentColor }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save / delete error banner */}
      {saveError && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-500">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
            <circle cx="8" cy="8" r="6" />
            <line x1="8" y1="5" x2="8" y2="8" />
            <line x1="8" y1="11" x2="8" y2="11" strokeWidth={2.5} />
          </svg>
          {saveError}
        </div>
      )}

      {/* Tasks section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tasks</h2>
          <div className="flex items-center gap-2">
            {!loading && tasks.length > 0 && (
              <span className="text-xs text-gray-400 font-medium">
                {pendingTasks.length} Remaining · {completedTasks.length} Done
              </span>
            )}
            <Button
              label="+ New Task"
              onClick={() => setCreateModalOpen(true)}
            />
          </div>
        </div>

        {loading && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {!loading && !error && tasks.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No tasks in this list yet.</p>
        )}

        {!loading && !error && tasks.length > 0 && (
          <div className="space-y-4">
            {pendingTasks.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Ongoing ({pendingTasks.length})
                </p>
                <div className="space-y-2">
                  {pendingTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={handleToggle}
                      onEdit={(id) => setEditingTask(tasks.find((t) => t.id === id) ?? null)}
                      onDelete={(id) => setDeletingTaskId(id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {completedTasks.length > 0 && (
              <div>
                <div className="flex items-center gap-2 my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <p className="text-xs font-bold text-green-600 uppercase tracking-widest whitespace-nowrap">
                    ✓ Completed ({completedTasks.length})
                  </p>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="space-y-2">
                  {completedTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={handleToggle}
                      onEdit={(id) => setEditingTask(tasks.find((t) => t.id === id) ?? null)}
                      onDelete={(id) => setDeletingTaskId(id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create task modal */}
      <CreateTaskModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateTask}
      />

      {/* Edit task modal */}
      <EditTaskModal
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        task={editingTask}
        onSubmit={handleEditSubmit}
      />

      {/* Delete confirmation modal */}
      {deletingTaskId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setDeletingTaskId(null); }}
        >
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <polyline strokeLinecap="round" strokeLinejoin="round" points="3,6 21,6" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2M19 6l-1 14H6L5 6" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Delete task</h3>
                <p className="text-sm text-gray-500">
                  {(() => {
                    const t = tasks.find((t) => t.id === deletingTaskId);
                    return t ? `"${t.title}"` : "This task";
                  })()}
                  {" "}will be permanently deleted.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeletingTaskId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold
                           text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold
                           hover:bg-red-600 active:bg-red-700 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListDetail;
