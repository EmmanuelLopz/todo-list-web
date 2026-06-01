import { useState } from "react";
import Button from "../Button/Button";

interface DeleteListModalProps {
  isOpen: boolean;
  listTitle: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteListModal({
  isOpen,
  listTitle,
  onClose,
  onConfirm,
}: DeleteListModalProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setDeleting(true);
    setError(null);
    try {
      await onConfirm();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete list.");
      setDeleting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !deleting) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && !deleting) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 flex flex-col gap-5">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="3 6 5 6 21 6" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2
            id="delete-modal-title"
            className="text-xl font-bold text-gray-900 mb-2"
          >
            Delete List
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-800">"{listTitle}"</span>?{" "}
            This action cannot be undone.
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-center">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <div className="flex-1">
            <Button
              label="Cancel"
              variant="secondary"
              fullWidth
              onClick={onClose}
              disabled={deleting}
            />
          </div>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleting}
            className="flex-1 py-2.5 rounded-lg font-medium text-sm bg-red-500 text-white
                       hover:bg-red-600 active:bg-red-700 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
