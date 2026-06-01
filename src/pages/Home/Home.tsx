import { useState } from "react";
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard";
import DueTodayCard, {
  type DueTask,
} from "../../components/DueTodayCard/DueTodayCard";
import StudyListCard from "../../components/StudyListCard/StudyListCard";
import styles from "./Home.module.css";

const Home = () => {
  const userName = "Scholar";

  const [dueTasks, setDueTasks] = useState<DueTask[]>([
    {
      id: "1",
      title: "Submit Thesis Draft",
      time: "5:00 PM",
      completed: false,
    },
    {
      id: "2",
      title: "Weekly Groceries",
      time: "7:00 PM",
      completed: false,
    },
  ]);

  const handleToggleTask = (id: string) => {
    setDueTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <section className={styles.container}>
      <div className={styles.TopRow}>
        <WelcomeCard userName={userName} taskCount={dueTasks.length} />

        <DueTodayCard
          tasks={dueTasks}
          priority="High Priority"
          onToggle={handleToggleTask}
        />
      </div>

      <div>
        <h2>Study Lists</h2>

        <div>
          <StudyListCard
            title="Computer Science"
            subtitle="Algorithms and Data Structures"
            taskCount={8}
            completedPercent={65}
            accentColor="#2563eb"
            icon={<span>💻</span>}
          />

          <StudyListCard
            title="History Project"
            subtitle="Renaissance Art Analysis"
            taskCount={4}
            completedPercent={30}
            accentColor="#f59e0b"
            icon={<span>📚</span>}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;