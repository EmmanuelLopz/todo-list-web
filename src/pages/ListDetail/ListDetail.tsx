import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import TaskItem from "../../components/TaskItem/TaskItem";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";
import { getTasksByListId } from "../../services/tasks/getTasksByListId";
import { updateTask } from "../../services/tasks/updateTask";
import { createTask } from "../../services/tasks/createTask";
import type { TaskList } from "../../types/TaskList";
import type { Task } from "../../types/Task";
import type { CreateTaskFormData } from "../../components/CreateTaskModal/CreateTaskModal";

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
  const [taskModalOpen, setTaskModalOpen] = useState(false);

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
  const completedCount = completedTasks.length;
  const percentage =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

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
      setSaveError(
        err instanceof Error ? err.message : "Failed to save. Please try again."
      );
    }
  };

  const handleCreateTask = async (data: CreateTaskFormData) => {
    if (!listId) return;
    await createTask({
      title: data.title,
      description: data.description || undefined,
      listId,
      priorityId: data.priorityId || undefined,
      dueDate: data.dueDate ? (data.dueDate.length === 16 ? data.dueDate + ":00" : data.dueDate) : undefined,
    });
    setTaskModalOpen(false);
    loadTasks();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

      {/* Back button */}
      <button
        onClick={() => navigate("/home")}
        className="flex items-center gap-2 text-sm text-gray-500
                   hover:text-violet-600 transition-colors group"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
          strokeWidth={2.5}
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
                  className="w-6 h-6"
                  style={{ color: accentColor }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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

            {/* Stats — only show after loading */}
            {!loading && (
              <div className="flex gap-5 flex-shrink-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {tasks.length}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">Total</div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: accentColor }}
                  >
                    {completedCount}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">Done</div>
                </div>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {!loading && (
            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 font-medium">Overall progress</span>
                <span className="font-bold" style={{ color: accentColor }}>
                  {percentage}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: accentColor,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save error banner */}
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
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Tasks
          </h2>
          <div className="flex items-center gap-2">
            {!loading && tasks.length > 0 && (
              <span className="text-xs text-gray-400 font-medium">
                {pendingTasks.length} Remaining · {completedCount} Done
              </span>
            )}
            <button
              type="button"
              onClick={() => setTaskModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold
                         bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800
                         transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <span className="text-base leading-none">+</span>
              New Task
            </button>
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
          <p className="text-sm text-gray-400 text-center py-8">
            No tasks in this list yet.
          </p>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {/* Ongoing */}
            {pendingTasks.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Ongoing ({pendingTasks.length})
                </p>
                <div className="space-y-2">
                  {pendingTasks.map((task) => (
                    <TaskItem key={task.id} task={task} onToggle={handleToggle} />
                  ))}
                </div>
              </div>
            )}

            {/* Completed */}
            {completedTasks.length > 0 && (
              <div>
                <div className="flex items-center gap-2 my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <p className="text-xs font-bold text-green-600 uppercase tracking-widest whitespace-nowrap">
                    ✓ Completed ({completedCount})
                  </p>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="space-y-2">
                  {completedTasks.map((task) => (
                    <TaskItem key={task.id} task={task} onToggle={handleToggle} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <CreateTaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
};

export default ListDetail;
