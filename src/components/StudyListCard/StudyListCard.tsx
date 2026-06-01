import styles from "./StudyListCard.module.css";
import type { ReactNode } from "react";

interface StudyListCardProps {
  title: string;
  subtitle: string;
  taskCount: number;
  completedPercent: number; // 0–100
  icon: ReactNode;
  accentColor?: string; // CSS color value, e.g. "#3b5bdb"
  onClick?: () => void;
}

export default function StudyListCard({
  title,
  subtitle,
  taskCount,
  completedPercent,
  icon,
  accentColor = "#3b5bdb",
  onClick,
}: StudyListCardProps) {
  const clampedPercent = Math.min(100, Math.max(0, completedPercent));

  return (
    <div
      className={styles.card}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick ? (e) => e.key === "Enter" && onClick() : undefined
      }
    >
      <div className={styles.topRow}>
        <div
          className={styles.iconWrapper}
          style={{ "--accent": accentColor } as React.CSSProperties}
        >
          {icon}
        </div>
        <span className={styles.taskCount} style={{ color: accentColor }}>
          {taskCount} {taskCount === 1 ? "Task" : "Tasks"}
        </span>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.progressArea}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{
              width: `${clampedPercent}%`,
              backgroundColor: accentColor,
            }}
          />
        </div>
        <span className={styles.progressLabel}>
          {clampedPercent}% COMPLETED
        </span>
      </div>
    </div>
  );
}