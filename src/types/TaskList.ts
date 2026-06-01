export type TaskList = {
  id: string;
  title: string;
  subtitle: string;
  taskCount: number;
  percentage: number;
  tags: string[];
  idColor: string;
  idIcon: string;
  /** Hex color value from the backend, e.g. "#3b82f6". Used for the card's sidebar accent. */
  color: string;
  /** UUID of the selected color row — needed to pre-fill the edit modal. */
  colorId?: string;
};
