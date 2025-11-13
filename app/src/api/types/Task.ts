export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  assignees: string[];
  status: TaskStatus;
  priority: TaskPriority;
  attachments: string[];
  start_date: Date;
  due_date: Date;
  created: Date;
  updated: Date;
}

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface TaskResponse {
  items: Task[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}
