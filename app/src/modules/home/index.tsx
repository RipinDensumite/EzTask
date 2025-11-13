import { useEffect, useState } from "react";
import type { ProjectResponse } from "../../api/types/Project";
import ProjectRepository from "../../api/repositories/ProjectRepository";
import type { TaskResponse } from "../../api/types/Task";
import TaskRepository from "../../api/repositories/TaskRepository";
import CreateTaskUI from "../../components/create_task_ui";

export default function HomeModule() {
  const [projects, setProjects] = useState<ProjectResponse>();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [loadingProject, setLoadingProject] = useState(true);
  const [tasks, setTasks] = useState<TaskResponse>();
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [deletingTask, setDeletingTask] = useState("");

  useEffect(() => {
    ProjectRepository.getAll()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoadingProject(false));
  }, []);

  useEffect(() => {
    if (!selectedProjectId) return;
    setTasks(undefined);
    setLoadingTasks(true);

    TaskRepository.getAll(selectedProjectId)
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoadingTasks(false));
  }, [selectedProjectId]);

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

  if (loadingProject) return <div className="p-4">Loading projects...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#e5e7eb_1px,_transparent_1px)]
                   [background-size:20px_20px] opacity-100"
      ></div>

      {/* Content */}
      <div className="relative flex w-full">
        {/* Left sidebar */}
        <aside className="w-64 bg-white/70 backdrop-blur-md border-r border-gray-200 p-4 hidden md:block">
          <h2 className="text-lg font-semibold mb-4">Projects</h2>
          <ul className="space-y-2">
            {projects?.items.map((project) => (
              <li
                key={project.id}
                className={`flex space-x-2 items-center p-2 rounded hover:bg-gray-100 cursor-pointer ${
                  project.id === selectedProjectId ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedProjectId(project.id)}
              >
                {selectedProjectId === project.id ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 128"
                    className="size-5 text-gray-500 flex-shrink-0"
                  >
                    {" "}
                    <path d="M15,109.8l48,17c0,0,0,0,0,0c0.1,0,0.2,0.1,0.3,0.1c0.2,0.1,0.5,0.1,0.7,0.1c0.2,0,0.3,0,0.5,0c0,0,0,0,0,0c0,0,0,0,0.1,0 c0.1,0,0.3-0.1,0.4-0.1c0,0,0,0,0,0l48-17c1.2-0.4,2-1.6,2-2.8V73.4l10-3.5c0.8-0.3,1.5-1,1.8-1.8s0.2-1.8-0.3-2.6l-12-20 c0,0-0.1-0.1-0.1-0.1c0-0.1-0.1-0.1-0.1-0.2c0,0,0,0,0,0c0-0.1-0.1-0.1-0.1-0.2c0,0,0,0,0-0.1c-0.1-0.1-0.1-0.1-0.2-0.2 c0,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.1c0,0-0.1,0-0.1,0c0,0-0.1-0.1-0.1-0.1c-0.1-0.1-0.2-0.1-0.3-0.1c-0.1,0-0.1-0.1-0.2-0.1 c0,0,0,0,0,0c0,0,0,0,0,0l-48-17c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0c0,0,0,0,0,0 c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.4,0c-0.1,0-0.1,0-0.2,0c-0.2,0-0.4,0.1-0.5,0.1l-48,17 c-0.2,0.1-0.3,0.1-0.5,0.2c0,0-0.1,0.1-0.1,0.1c-0.1,0.1-0.2,0.1-0.3,0.2c0,0-0.1,0.1-0.1,0.1c-0.1,0.1-0.2,0.1-0.2,0.2 c0,0-0.1,0.1-0.1,0.1c-0.1,0.1-0.1,0.2-0.2,0.2c0,0,0,0.1-0.1,0.1l-12,20c-0.7,1.1-0.6,2.5,0.2,3.4C2.3,69.6,3.1,70,4,70 c0.3,0,0.7-0.1,1-0.2l8-2.8v40C13,108.3,13.8,109.4,15,109.8z M119.5,65.4l-42.2,15l-8.9-14.8l42.2-15L119.5,65.4z M67,34.2L103,47 L67,59.8V34.2z M67,74.8l6.4,10.7C74,86.5,75,87,76,87c0.3,0,0.7-0.1,1-0.2l32-11.3v29.4l-42,14.9V74.8z M19,51.2l42,14.9v53.6 l-42-14.9V51.2z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 128"
                    className="size-5 text-gray-500 flex-shrink-0"
                  >
                    {" "}
                    <path d="M63,14.2l-48,17c-1.2,0.4-2,1.6-2,2.8v60c0,1.3,0.8,2.4,2,2.8l48,17c0.3,0.1,0.7,0.2,1,0.2c0.2,0,0.3,0,0.5,0 c0,0,0.1,0,0.1,0c0.1,0,0.2-0.1,0.3-0.1c0,0,0,0,0,0l48-17c1.2-0.4,2-1.6,2-2.8V34c0,0,0-0.1,0-0.1c0-0.1,0-0.3,0-0.4 c0,0,0-0.1,0-0.1c-0.2-1-0.9-1.9-1.9-2.2l-24-8.5c0,0-0.1,0-0.1,0c-0.6-0.2-1.4-0.3-2.1,0L40,39.2c-1.2,0.4-2,1.6-2,2.8v11 c0,1.7,1.3,3,3,3s3-1.3,3-3v-8.9l43.8-15.5L103,34L63,48.2c-1.2,0.4-2,1.5-2,2.8c0,0,0,0,0,0.1v55.8L19,91.9V36.1l46-16.3 c1.6-0.6,2.4-2.3,1.8-3.8C66.3,14.4,64.6,13.6,63,14.2z M67,53.1l42-14.9v53.6l-42,14.9V53.1z" />
                  </svg>
                )}
                <span>{project.title}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right main section */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-row space-x-5">
            <h1 className="text-2xl font-bold mb-4">Tasks</h1>
            <CreateTaskUI
              projectId={selectedProjectId as string}
              onCreated={(newTask) => {
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
              }}
            />
          </div>

          {loadingTasks && (
            <div className="animate-spin size-10 bg-black"></div>
          )}

          {tasks?.items.length === 0 && (
            <div className="text-center text-gray-500 w-full">
              No tasks found.
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks?.items.map((task) => (
              <div
                key={task.id}
                className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-clip"
              >
                {deletingTask === task.id && (
                  <div className="absolute w-full h-full inset-0 bg-black opacity-50"></div>
                )}

                {/* Header */}
                <div className="p-5 pb-3 border-b border-gray-100">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 flex-1">
                      {task.title}
                    </h3>
                    <span
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                        task.priority === "high"
                          ? "bg-red-50 text-red-600 ring-1 ring-red-200"
                          : task.priority === "medium"
                          ? "bg-amber-50 text-amber-600 ring-1 ring-amber-200"
                          : "bg-green-50 text-green-600 ring-1 ring-green-200"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {task.priority}
                    </span>
                  </div>
                </div>

                {/* Description - grows to fill space */}
                <div className="p-5 flex-1">
                  <div
                    className="prose prose-sm text-gray-600 line-clamp-4"
                    dangerouslySetInnerHTML={{ __html: task.description }}
                  />
                </div>

                {/* Footer - always at bottom */}
                <div className="p-5 pt-3 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                  <div className="flex justify-between items-center gap-3">
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                      <span
                        className={`inline-flex items-center justify-center font-medium text-xs px-3 py-1.5 rounded-lg w-fit ${
                          task.status === "done"
                            ? "bg-emerald-100 text-emerald-700"
                            : task.status === "in_progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {task.status === "done" && "✓ "}
                        {task.status.replace("_", " ")}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="truncate">
                          {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handleDeleteTask(task.id);
                      }}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                      title="Delete Task"
                      aria-label="Delete task"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
