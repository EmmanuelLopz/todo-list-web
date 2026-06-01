import type { Color } from "../../types/Color";

interface ColorPickerProps {
  colors: Color[];
  selectedId: string;
  onSelect: (id: string) => void;
  loading?: boolean;
}

export default function ColorPicker({
  colors,
  selectedId,
  onSelect,
  loading = false,
}: ColorPickerProps) {
  const selected = colors.find((c) => c.id === selectedId);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          Accent Color
        </span>
        {selected && (
          <span
            className="text-xs font-bold uppercase tracking-wide"
            style={{ color: `#${selected.hexValue}` }}
          >
            {selected.name}
          </span>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {colors.map((color) => {
            const isSelected = color.id === selectedId;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onSelect(color.id)}
                className="aspect-square rounded-2xl flex items-center justify-center
                           transition-transform duration-150 hover:scale-105
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: `#${color.hexValue}`,
                  boxShadow: isSelected
                    ? `0 0 0 3px white, 0 0 0 5px #${color.hexValue}`
                    : undefined,
                }}
                title={color.name}
                aria-label={color.name}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <svg
                    className="w-6 h-6 text-white drop-shadow"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
