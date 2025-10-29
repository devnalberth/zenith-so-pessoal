import { Task, Project, Goal } from '../types';

export interface AppData {
  tasks: Task[];
  projects: Project[];
  goals: Goal[];
  version: string;
  exportedAt: string;
}

/**
 * Exporta todos os dados da aplicação como JSON
 */
export const exportData = (tasks: Task[], projects: Project[], goals: Goal[]): string => {
  const data: AppData = {
    tasks,
    projects,
    goals,
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
};

/**
 * Importa dados de um arquivo JSON
 */
export const importData = (jsonString: string): AppData | null => {
  try {
    const data: AppData = JSON.parse(jsonString);
    
    // Validação básica
    if (!data.tasks || !data.projects || !data.goals) {
      throw new Error('Formato de dados inválido');
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao importar dados:', error);
    return null;
  }
};

/**
 * Faz download de um arquivo JSON
 */
export const downloadJSON = (data: string, filename: string = 'zenith-backup.json') => {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Limpa todos os dados do localStorage (use com cuidado!)
 */
export const clearAllData = () => {
  if (typeof window !== 'undefined') {
    const keys = ['zenith-tasks', 'zenith-projects', 'zenith-goals', 'zenith-theme'];
    keys.forEach(key => localStorage.removeItem(key));
  }
};
