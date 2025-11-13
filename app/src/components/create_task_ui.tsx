"use client";

import { useState } from "react";
import TaskRepository from "../api/repositories/TaskRepository";
import type { Task, TaskStatus, TaskPriority } from "../api/types/Task";

interface Props {
  projectId: string;
  onCreated?: (task: Task) => void;
}

export default function CreateTaskUI({ projectId, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<TaskPriority>("low");
  const [assignees, setAssignees] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const newTask: Task = {
      id: "", // PocketBase will generate
      project: projectId,
      title,
      description,
      status,
      priority,
      assignees,
      attachments: [], // we will handle separately
      start_date: new Date(startDate),
      due_date: new Date(dueDate),
      created: new Date(),
      updated: new Date(),
    };

    try {
      setIsLoading(true);
      const createdTask = await TaskRepository.create(newTask);
      if (onCreated) onCreated(createdTask);

      // Close modal
      const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
      modal.close();

      // Reset form
      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("low");
      setAssignees([]);
      setStartDate("");
      setDueDate("");
      setAttachments([]);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="btn btn-circle"
        onClick={() => document.getElementById("my_modal_1")?.showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="size-[1.2em]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Task</h3>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              type="text"
              className="input"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="input"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Status</legend>
            <select
              value={status}
              className="select"
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Priority</legend>
            <select
              value={priority}
              className="select"
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Start Date</legend>
            <input
              type="date"
              className="input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Due Date</legend>
            <input
              type="date"
              className="input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </fieldset>

          {/* Add assignees input here if needed (e.g., multi-select) */}

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_1")?.close()}
              disabled={isLoading}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
