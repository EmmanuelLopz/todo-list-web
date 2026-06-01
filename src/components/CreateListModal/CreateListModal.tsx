import { useEffect, useRef, useState } from "react";
import type { Color } from "../../types/Color";
import ColorPicker from "../ColorPicker/ColorPicker";

export interface CreateListFormData {
  title: string;
  description: string;
  colorId: string;
}

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateListFormData) => Promise<void>;
  colors: Color[];
  colorsLoading?: boolean;
  colorsError?: string | null;
}

export default function CreateListModal({
  isOpen,
  onClose,
  onSubmit,
  colors,
  colorsLoading = false,
  colorsError = null,
}: CreateListModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  // Auto-select the first color once colors are loaded
  useEffect(() => {
    if (colors.length > 0 && !selectedColorId) {
      setSelectedColorId(colors[0].id);
    }
  }, [colors, selectedColorId]);

  // Focus the title input when the modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => titleRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
      setSelectedColorId(colors[0]?.id ?? "");
      setError(null);
    }
  }, [isOpen, colors]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        colorId: selectedColorId,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create list.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2 flex-shrink-0">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
            New List
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-violet-600 hover:text-violet-800
                       transition-colors focus:outline-none focus-visible:underline"
          >
            Cancel
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="list-title"
              className="block text-sm font-bold text-gray-800 mb-1.5"
            >
              Title
            </label>
            <input
              ref={titleRef}
              id="list-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Desarrollo de Software"
              maxLength={100}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                         text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent
                         transition"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="list-description"
              className="block text-sm font-bold text-gray-800 mb-1.5"
            >
              Description
            </label>
            <textarea
              id="list-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: Backend, frontend and clean architecture tasks"
              maxLength={300}
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                         text-gray-900 placeholder-gray-400 resize-none
                         focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent
                         transition"
            />
          </div>

          {/* Color picker */}
          <div>
            {colorsError ? (
              <p className="text-sm text-red-500">{colorsError}</p>
            ) : (
              <ColorPicker
                colors={colors}
                selectedId={selectedColorId}
                onSelect={setSelectedColorId}
                loading={colorsLoading}
              />
            )}
          </div>

          {/* Inline error */}
          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}
        </div>

        {/* Footer — Create button */}
        <div className="px-6 py-5 flex-shrink-0 border-t border-gray-100">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || colorsLoading}
            className="w-full py-3.5 rounded-2xl bg-violet-600 text-white font-bold text-base
                       hover:bg-violet-700 active:bg-violet-800 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            {submitting ? "Creating…" : "Create List"}
          </button>
        </div>
      </div>
    </div>
  );
}
