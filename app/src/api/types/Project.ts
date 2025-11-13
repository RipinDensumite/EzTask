export interface Project {
  id: string;
  title: string;
  description: string;
  owner: string;
  collaborators: string[];
  archived: boolean;
  created: Date;
  updated: Date;
}

export interface ProjectResponse {
  items: Project[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}
