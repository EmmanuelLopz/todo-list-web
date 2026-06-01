import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard";
import ListCard from "../../components/ListCard/ListCard";
import CreateListModal from "../../components/CreateListModal/CreateListModal";
import EditListModal from "../../components/EditListModal/EditListModal";
import DeleteListModal from "../../components/DeleteListModal/DeleteListModal";
import { getLists } from "../../services/tasks/getLists";
import { getAllTasks } from "../../services/tasks/getAllTasks";
import { createList } from "../../services/lists/createList";
import { updateList } from "../../services/lists/updateList";
import { deleteList } from "../../services/lists/deleteList";
import { useColors } from "../../hooks/useColors";
import type { TaskList } from "../../types/TaskList";
import type { CreateListFormData } from "../../components/CreateListModal/CreateListModal";
import type { EditListFormData } from "../../components/EditListModal/EditListModal";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const userName = "Scholar";

  const [lists, setLists] = useState<TaskList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingList, setEditingList] = useState<TaskList | null>(null);
  const [deletingList, setDeletingList] = useState<TaskList | null>(null);

  const { colors, loading: colorsLoading, error: colorsError } = useColors();

  const fetchLists = () => {
    setLoading(true);

    Promise.allSettled([getLists(), getAllTasks()])
      .then(([listsResult, tasksResult]) => {
        if (listsResult.status === "rejected") {
          setError((listsResult.reason as Error).message);
          return;
        }

        const listsData = listsResult.value;

        // Build per-list completion stats from the full task list.
        // Falls back gracefully if GET /tasks fails.
        const statsMap = new Map<string, { total: number; completed: number }>();
        if (tasksResult.status === "fulfilled") {
          tasksResult.value.forEach((task) => {
            const s = statsMap.get(task.listId) ?? { total: 0, completed: 0 };
            statsMap.set(task.listId, {
              total: s.total + 1,
              completed: s.completed + (task.completed ? 1 : 0),
            });
          });
        }

        const enhanced = listsData.map((list) => {
          const s = statsMap.get(list.id);
          if (!s) return list;
          return {
            ...list,
            taskCount: s.total,
            percentage:
              s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0,
          };
        });

        setLists(enhanced);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateList = async (data: CreateListFormData) => {
    await createList({
      title: data.title,
      description: data.description,
      colorId: data.colorId,
    });
    setModalOpen(false);
    fetchLists();
  };

  const handleEditList = async (data: EditListFormData) => {
    if (!editingList) return;
    await updateList(editingList.id, {
      title: data.title,
      description: data.description,
      colorId: data.colorId,
    });
    setEditingList(null);
    fetchLists();
  };

  const handleDeleteList = async () => {
    if (!deletingList) return;
    await deleteList(deletingList.id);
    setDeletingList(null);
    fetchLists();
  };

  const handleListClick = (list: TaskList) => {
    navigate(`/lists/${list.id}`, { state: { list } });
  };

  return (
    <section className={styles.container}>
      <div className={styles.TopRow}>
        <WelcomeCard userName={userName} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">My Lists</h2>
            <p className="text-sm text-gray-400">Click a list to view its tasks</p>
          </div>
          <div className="flex items-center gap-3">
            {!loading && !error && (
              <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
                {lists.length} {lists.length === 1 ? "list" : "lists"}
              </span>
            )}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                         bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800
                         transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <span className="text-base leading-none">+</span>
              Create New List
            </button>
          </div>
        </div>

        {loading && <p className="text-gray-400 text-sm">Loading lists…</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!loading && !error && lists.length === 0 && (
          <p className="text-gray-400 text-sm">No lists yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lists.map((list) => (
            <ListCard
              key={list.id}
              title={list.title}
              subtitle={list.subtitle}
              taskCount={list.taskCount}
              completedPercent={list.percentage}
              accentColor={list.color}
              onClick={() => handleListClick(list)}
              onEdit={(e) => { e.stopPropagation(); setEditingList(list); }}
              onDelete={(e) => { e.stopPropagation(); setDeletingList(list); }}
            />
          ))}
        </div>
      </div>
      <CreateListModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateList}
        colors={colors}
        colorsLoading={colorsLoading}
        colorsError={colorsError}
      />

      <EditListModal
        isOpen={editingList !== null}
        list={editingList}
        onClose={() => setEditingList(null)}
        onSubmit={handleEditList}
        colors={colors}
        colorsLoading={colorsLoading}
        colorsError={colorsError}
      />

      <DeleteListModal
        isOpen={deletingList !== null}
        listTitle={deletingList?.title ?? ""}
        onClose={() => setDeletingList(null)}
        onConfirm={handleDeleteList}
      />
    </section>
  );
};

export default Home;
