import apiClient from "../client";
import type { Task, TaskResponse } from "../types/Task";

const TaskRepository = {
  async getAll(project: string): Promise<TaskResponse> {
    const response = await apiClient.get(
      `/api/collections/tasks/records?filter=project='${project}'`,
    );
    console.log("Tasks: " + response);
    return response.data;
  },
  async getById(id: string): Promise<Task> {
    const response = await apiClient.get(`/api/collections/tasks/records${id}`);
    return response.data;
  },
  async create(task: Task): Promise<Task> {
    const response = await apiClient.post(
      "/api/collections/tasks/records",
      task,
    );
    return response.data;
  },
  async update(id: string, task: Task): Promise<Task> {
    const response = await apiClient.put(
      `/api/collections/tasks/records/${id}`,
      task,
    );
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/collections/tasks/records/${id}`);
  },
};

export default TaskRepository;
