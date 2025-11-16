import { useEffect, useState } from "react";
import ProjectRepository from "../api/repositories/ProjectRepository";
import type { ProjectResponse } from "../api/types/Project";

export const ProjectViewModel = () => {
  const [projects, setProjects] = useState<ProjectResponse>();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [loadingProject, setLoadingProject] = useState(true);

  const fetchProjects = async () => {
    ProjectRepository.getAll()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoadingProject(false));
  };

  const selectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loadingProject,
    selectedProjectId,
    fetchProjects,
    selectProject,
  };
};
