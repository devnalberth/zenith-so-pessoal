import React, { createContext, useContext, useMemo } from 'react';
import { Task, Project, Goal, GoalWithProgress } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_TASKS, INITIAL_PROJECTS, INITIAL_GOALS } from '../constants';

interface AppContextType {
  // Estado
  tasks: Task[];
  projects: Project[];
  goals: Goal[];
  goalsWithProgress: GoalWithProgress[];
  
  // Ações de Tarefas
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  
  // Ações de Projetos
  addProject: (project: Omit<Project, 'id' | 'completedAt'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  
  // Ações de Metas
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (goalId: string) => void;
  
  // Utilidades
  exportData: () => void;
  importData: (data: string) => void;
  clearAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Estado persistente com localStorage
  const [tasks, setTasks] = useLocalStorage<Task[]>('zenith-tasks', INITIAL_TASKS);
  const [projects, setProjects] = useLocalStorage<Project[]>('zenith-projects', INITIAL_PROJECTS);
  const [goals, setGoals] = useLocalStorage<Goal[]>('zenith-goals', INITIAL_GOALS);

  // ========== TAREFAS ==========
  const addTask = (newTaskData: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => {
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...newTaskData,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => {
      if (task.id === updatedTask.id) {
        const isCompletedNow = updatedTask.status === 'done' && task.status !== 'done';
        return {
          ...updatedTask,
          completedAt: isCompletedNow ? new Date().toISOString() : updatedTask.completedAt,
        };
      }
      return task;
    }));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  // ========== PROJETOS ==========
  const addProject = (newProjectData: Omit<Project, 'id' | 'completedAt'>) => {
    const newProject: Project = {
      id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...newProjectData,
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(project => {
      if (project.id === updatedProject.id) {
        const isCompletedNow = updatedProject.status === 'completed' && project.status !== 'completed';
        return {
          ...updatedProject,
          completedAt: isCompletedNow ? new Date().toISOString() : updatedProject.completedAt,
        };
      }
      return project;
    }));
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  // ========== METAS ==========
  const addGoal = (newGoalData: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...newGoalData,
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const updateGoal = (updatedGoal: Goal) => {
    setGoals(prev => prev.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  // ========== CÁLCULO DE PROGRESSO DAS METAS ==========
  const goalsWithProgress = useMemo(() => {
    return goals.map(goal => {
      const relevantProjects = projects.filter(p => p.goalId === goal.id);
      const projectIds = relevantProjects.map(p => p.id);
      const relevantTasks = tasks.filter(t => t.projectId && projectIds.includes(t.projectId));

      if (relevantTasks.length === 0) {
        const completedProjects = relevantProjects.filter(p => p.status === 'completed').length;
        return {
          ...goal,
          progress: relevantProjects.length > 0 ? (completedProjects / relevantProjects.length) * 100 : 0,
        };
      }

      const completedTasks = relevantTasks.filter(t => t.status === 'done').length;
      const progress = (completedTasks / relevantTasks.length) * 100;
      return { ...goal, progress };
    });
  }, [goals, projects, tasks]);

  // ========== UTILITÁRIOS ==========
  const exportData = () => {
    const data = {
      tasks,
      projects,
      goals,
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
    };
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zenith-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      
      if (data.tasks) setTasks(data.tasks);
      if (data.projects) setProjects(data.projects);
      if (data.goals) setGoals(data.goals);
      
      alert('Dados importados com sucesso!');
    } catch (error) {
      console.error('Erro ao importar dados:', error);
      alert('Erro ao importar dados. Verifique o arquivo.');
    }
  };

  const clearAllData = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita!')) {
      setTasks([]);
      setProjects([]);
      setGoals([]);
      alert('Todos os dados foram removidos.');
    }
  };

  const value: AppContextType = {
    tasks,
    projects,
    goals,
    goalsWithProgress,
    addTask,
    updateTask,
    deleteTask,
    addProject,
    updateProject,
    deleteProject,
    addGoal,
    updateGoal,
    deleteGoal,
    exportData,
    importData,
    clearAllData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
