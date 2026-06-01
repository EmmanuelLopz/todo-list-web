import styles from "./DueTodayCard.module.css";

export interface DueTask {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

interface DueTodayCardProps {
  tasks: DueTask[];
  priority?: "High Priority" | "Medium Priority" | "Low Priority";
  onToggle?: (id: string) => void;
}

const priorityClass: Record<string, string> = {
  "High Priority": styles.priorityHigh,
  "Medium Priority": styles.priorityMedium,
  "Low Priority": styles.priorityLow,
};

export default function DueTodayCard({
  tasks,
  priority = "High Priority",
  onToggle,
}: DueTodayCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.heading}>Due Today</h3>
        <span className={`${styles.priorityBadge} ${priorityClass[priority]}`}>
          {priority}
        </span>
      </div>

      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <button
              className={`${styles.checkbox} ${task.completed ? styles.checked : ""}`}
              onClick={() => onToggle?.(task.id)}
              aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
            >
              {task.completed && (
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.checkIcon}
                >
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <div className={styles.taskInfo}>
              <span
                className={`${styles.taskTitle} ${task.completed ? styles.taskDone : ""}`}
              >
                {task.title}
              </span>
              <span className={styles.taskTime}>{task.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}