import { Timestamp } from 'firebase/firestore';

export enum UserRole {
  Developer = 'Developer',
  Manager = 'Manager',
  Admin = 'Admin',
  Stakeholder = 'Stakeholder',
  Viewer = "Viewer",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  skills?: string[];
  availability?: number; // Hours per week
}

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Urgent = 'Urgent',
}

export enum TaskStatus {
  Todo = 'To Do',
  InProgress = 'In Progress',
  Review = 'In Review',
  Done = 'Done',
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  assignee?: User;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: User;
  dueDate: Timestamp;
  priority: TaskPriority;
  status: TaskStatus;
  subtasks?: Subtask[];
  attachments?: string[];
  estimatedTime?: number;
  loggedTime?: number;
  tags?: string[];
  comments?: Comment[];
  relatedTasks?: string[]; // IDs of related tasks
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate: Timestamp;
  tasks: Task[];
  progress: number;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  owner: User;
  team: User[];
  tasks: Task[];
  milestones: Milestone[];
  startDate: Timestamp;
  endDate?: Timestamp;
  progress: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  client?: User;
  budget?: number;
  repository?: string; // Git repository URL
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  sender: User;
  content: string;
  timestamp: Timestamp;
  attachments?: string[];
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface Team {
  id: string;
  name: string;
  members: User[];
  roles: Role[];
}

export interface ProjectAnalytics {
  totalTasks: number;
  completedTasks: number;
  totalHoursLogged: number;
  totalMilestones: number;
  upcomingDeadlines: number;
  burndownChart: { date: Timestamp; remainingWork: number }[];
  teamPerformance: { user: User; completedTasks: number; hoursLogged: number }[];
}

export interface ProjectFile {
  id: string;
  name: string;
  url: string;
  uploadedBy: User;
  uploadedAt: Timestamp;
  version: number;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Timestamp;
  attachments?: string[];
}

export interface Notification {
  id: string;
  recipient: User;
  content: string;
  timestamp: Timestamp;
  read: boolean;
  link?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Timestamp;
  end: Timestamp;
  allDay: boolean;
  project?: string; // Project ID
  task?: string; // Task ID
  milestone?: string; // Milestone ID
}