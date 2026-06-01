import type { Task } from "../../types/Task";

const PRIORITY_MAP: Record<string, { bg: string; text: string; label: string }> = {
  HIGH:   { bg: "bg-red-50",   text: "text-red-500",   label: "High"   },
  MEDIUM: { bg: "bg-amber-50", text: "text-amber-500", label: "Medium" },
  LOW:    { bg: "bg-green-50", text: "text-green-600", label: "Low"    },
};

interface TaskItemProps {
  task: Task;
  onToggle?: (id: string) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  const priority = PRIORITY_MAP[task.priorityName?.toUpperCase() ?? ""];

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200
                  ${task.completed
                    ? "bg-gray-50 border-gray-100"
                    : "bg-white border-gray-100 hover:border-violet-200 hover:shadow-sm"
                  }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle?.(task.id)}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0
                    flex items-center justify-center transition-colors duration-200
                    ${task.completed
                      ? "bg-violet-600 border-violet-600"
                      : "border-gray-300 hover:border-violet-400 bg-white"
                    }`}
      >
        {task.completed && (
          <svg className="w-3 h-3" viewBox="0 0 12 10" fill="none">
            <polyline
              points="1.5,5 4.5,8.5 10.5,1.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm font-medium leading-snug
                        ${task.completed ? "text-gray-400 line-through" : "text-gray-800"}`}
          >
            {task.title}
          </span>

          {priority && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full
                          ${priority.bg} ${priority.text}`}
            >
              {priority.label}
            </span>
          )}
        </div>

        {task.description && (
          <p className="text-xs text-gray-400 mt-0.5 truncate">{task.description}</p>
        )}

        {formattedDate && (
          <div className="flex items-center gap-1 mt-1.5">
            <svg
              className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 16 16"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <rect x="2" y="3" width="12" height="11" rx="2" />
              <line x1="5" y1="1" x2="5" y2="5" />
              <line x1="11" y1="1" x2="11" y2="5" />
              <line x1="2" y1="7" x2="14" y2="7" />
            </svg>
            <span className="text-xs text-gray-400">Due {formattedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
