import styles from "./WelcomeCard.module.css";

interface WelcomeCardProps {
  userName: string;
  taskCount: number;
}

export default function WelcomeCard({ userName, taskCount }: WelcomeCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Welcome back, {userName}</h2>
      <p className={styles.subtitle}>
        You have {taskCount} tasks scheduled for today. Here's a quick overview
        of your progress.
      </p>
    </div>
  );
}