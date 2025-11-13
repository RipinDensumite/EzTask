import apiClient from "../client";
import type { ProjectResponse, Project } from "../types/Project";

const ProjectRepository = {
  async getAll(): Promise<ProjectResponse> {
    const response = await apiClient.get("/api/collections/projects/records");
    console.log(response);
    return response.data;
  },
  async getById(id: string): Promise<Project> {
    const response = await apiClient.get(
      `/api/collections/projects/records/${id}`,
    );
    return response.data;
  },
  async create(project: Project): Promise<Project> {
    const response = await apiClient.post(
      "/api/collections/projects/records",
      project,
    );
    return response.data;
  },
  async update(project: Project): Promise<Project> {
    const response = await apiClient.put(
      `/api/collections/projects/records/${project.id}`,
      project,
    );
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/collections/projects/records/${id}`);
  },
};

export default ProjectRepository;
