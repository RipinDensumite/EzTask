import { useState } from "react";
import TaskRepository from "../api/repositories/TaskRepository";
import type { Task, TaskResponse } from "../api/types/Task";

export const TaskViewModel = () => {
  const [tasks, setTasks] = useState<TaskResponse>();
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [deletingTask, setDeletingTask] = useState("");

  const fetchTasks = async (selectedProjectId: string | null) => {
    if (!selectedProjectId) return setLoadingTasks(false);
    setTasks(undefined);
    setLoadingTasks(true);

    TaskRepository.getAll(selectedProjectId)
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoadingTasks(false));
  };

  const addTask = (newTask: Task) => {
    setTasks((currentTasks) =>
      currentTasks
        ? {
            ...currentTasks,
            items: [newTask, ...currentTasks.items],
          }
        : {
            items: [newTask],
            page: 1,
            perPage: 10,
            totalItems: 1,
            totalPages: 1,
          }
    );
  };

  const handleDeleteTask = async (taskId: string) => {
    setDeletingTask(taskId);

    const confirmed = confirm("Are you sure you want to delete this task?");

    if (!confirmed) return setDeletingTask("");

    try {
      await TaskRepository.delete(taskId);
      setTasks((currentTasks) =>
        currentTasks
          ? {
              ...currentTasks,
              items: currentTasks.items.filter((task) => task.id !== taskId),
            }
          : currentTasks
      );
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingTask("");
    }
  };

  return {
    tasks,
    loadingTasks,
    deletingTask,
    handleDeleteTask,
    fetchTasks,
    addTask,
  };
};
