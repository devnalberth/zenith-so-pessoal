export type Priority = 'baixa' | 'normal' | 'alta' | 'urgente' | 'delegar';
export type Area = 'Pessoal' | 'Profissional' | 'Financeiro' | 'Saúde e Corpo';

export interface Task {
  id: string;
  content: string;
  description?: string;
  status: 'todo' | 'doing' | 'done';
  priority: Priority;
  isRecurring?: boolean;
  startDate?: string;
  endDate?: string;
  area?: Area;
  projectId?: string;
  goalId?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: Priority;
  startDate?: string;
  endDate?: string;
  goalId?: string;
  completedAt?: string;
}

export interface Goal {
  id: string;
  name: string;
  description: string;
  area: Area;
  deadline?: string;
}

export interface GoalWithProgress extends Goal {
    progress: number;
}

// FIX: Added missing GtdCategory enum
export enum GtdCategory {
    Inbox = 'inbox',
    NextActions = 'next-actions',
}