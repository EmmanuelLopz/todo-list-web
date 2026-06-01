import styles from "./WelcomeCard.module.css";

interface WelcomeCardProps {
  userName: string;
}

export default function WelcomeCard({ userName }: WelcomeCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Welcome back, {userName}</h2>
      <p className={styles.subtitle}>
        Here's a quick overview of your progress.
      </p>
    </div>
  );
}