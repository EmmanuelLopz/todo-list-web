import { useEffect, useRef, useState } from "react";
import { usePriorities } from "../../hooks/usePriorities";
import type { Task } from "../../types/Task";

export interface EditTaskFormData {
  title: string;
  description: string;
  dueDate: string;
  priorityId: string;
}

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSubmit: (data: EditTaskFormData) => Promise<void>;
}

export default function EditTaskModal({ isOpen, onClose, task, onSubmit }: EditTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priorityId, setPriorityId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const { priorities, loading: prioritiesLoading } = usePriorities();

  useEffect(() => {
    if (isOpen) setTimeout(() => titleRef.current?.focus(), 50);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setDueDate(task.dueDate ? task.dueDate.slice(0, 16) : "");
      setPriorityId(task.priorityId ?? "");
      setError(null);
    }
  }, [isOpen, task]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ title: title.trim(), description: description.trim(), dueDate, priorityId });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update task.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-task-heading"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-1 flex-shrink-0">
          <div>
            <h2 id="edit-task-heading" className="text-xl font-bold text-gray-900">
              Edit task
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">Modify the task's details below.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 text-sm font-semibold text-violet-600 hover:text-violet-800
                       transition-colors focus:outline-none focus-visible:underline flex-shrink-0"
          >
            Cancel
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="edit-title" className="block text-sm font-bold text-gray-800 mb-1.5">
              Title
            </label>
            <input
              ref={titleRef}
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Crear DTOs"
              maxLength={100}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                         text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="edit-description" className="block text-sm font-bold text-gray-800 mb-1.5">
              Description
            </label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: Crear request y response DTOs para tasks"
              maxLength={300}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                         text-gray-900 placeholder-gray-400 resize-none
                         focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
            />
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="edit-due-date" className="block text-sm font-bold text-gray-800 mb-1.5">
              Due Date
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <input
                id="edit-due-date"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm
                           text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400
                           focus:border-transparent transition appearance-none"
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="edit-priority" className="block text-sm font-bold text-gray-800 mb-1.5">
              Priority
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V5l9-2 9 2v16" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
                </svg>
              </span>
              <select
                id="edit-priority"
                value={priorityId}
                onChange={(e) => setPriorityId(e.target.value)}
                disabled={prioritiesLoading}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm
                           text-gray-900 bg-white appearance-none
                           focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent
                           disabled:opacity-50 transition cursor-pointer"
              >
                <option value="">Select priority</option>
                {priorities.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.5}>
                  <polyline points="4,6 8,10 12,6" />
                </svg>
              </span>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 flex-shrink-0 border-t border-gray-100">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-3.5 rounded-2xl bg-violet-600 text-white font-bold text-base
                       hover:bg-violet-700 active:bg-violet-800 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            {submitting ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
