interface ListCardProps {
  title: string;
  subtitle: string;
  taskCount: number;
  completedPercent: number;
  accentColor?: string;
  onClick?: () => void;
  onEdit?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export default function ListCard({
  title,
  subtitle,
  taskCount,
  completedPercent,
  accentColor = "#7c3aed",
  onClick,
  onEdit,
  onDelete,
}: ListCardProps) {
  const clamped = Math.min(100, Math.max(0, completedPercent));

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl
                 transition-all duration-300 cursor-pointer hover:-translate-y-1
                 border border-gray-100/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      {/* Top accent gradient strip */}
      <div
        className="h-[3px] w-full"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}66)` }}
      />

      <div className="p-5">
        {/* Icon + actions + task badge */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: accentColor + "18" }}
          >
            <svg
              className="w-5 h-5"
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

          <div className="flex items-center gap-1.5">
            {/* Edit icon */}
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400
                           hover:text-violet-600 hover:bg-violet-50 transition-colors
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                title="Edit list"
                aria-label="Edit list"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5
                       M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            )}

            {/* Delete icon */}
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400
                           hover:text-red-500 hover:bg-red-50 transition-colors
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                title="Delete list"
                aria-label="Delete list"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <polyline points="3 6 5 6 21 6" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
              </button>
            )}

            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: accentColor + "15", color: accentColor }}
            >
              {taskCount} {taskCount === 1 ? "Task" : "Tasks"}
            </span>
          </div>
        </div>

        {/* Title & subtitle */}
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-1.5">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5">
          {subtitle}
        </p>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 font-medium">Progress</span>
            <span className="font-bold" style={{ color: accentColor }}>
              {clamped}%
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${clamped}%`, backgroundColor: accentColor }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-end">
          <span
            className="text-xs font-semibold text-gray-400
                       group-hover:text-violet-600 group-hover:translate-x-0.5
                       transition-all duration-200 flex items-center gap-1"
          >
            Open list
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 16 16"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <polyline points="6,4 10,8 6,12" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
