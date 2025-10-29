import React, { useState, useMemo } from 'react';
import { Project, Task, Goal, Priority } from '../types';
import { Card } from './Card';
import { CalendarIcon, GoalsIcon, PlusIcon, AnalysisIcon, CheckCircleIcon, AlertCircleIcon, FoldersIcon, ProjectsIcon } from './icons';
import { AddTaskModal } from './AddTaskModal';
import { AddProjectModal } from './AddProjectModal';
import { ModalTaskItem } from './ModalTaskItem';

interface ProjectsViewProps {
  projects: Project[];
  tasks: Task[];
  goals: Goal[];
  addProject: (newProjectData: Omit<Project, 'id' | 'completedAt'>) => void;
  addTask: (newTaskData: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => void;
  updateTask: (task: Task) => void;
}

const priorityConfig: Record<Priority, { label: string; styles: string; }> = {
    'baixa': { label: 'Baixa', styles: 'bg-slate-100 text-slate-600 dark:bg-slate-400/30 dark:text-slate-200' },
    'normal': { label: 'Normal', styles: 'bg-blue-100 text-blue-600 dark:bg-blue-400/30 dark:text-blue-200' },
    'alta': { label: 'Alta', styles: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-400/30 dark:text-yellow-200' },
    'urgente': { label: 'Urgente', styles: 'bg-red-100 text-red-700 dark:bg-red-400/40 dark:text-red-200' },
    'delegar': { label: 'Delegar', styles: 'bg-green-100 text-green-700 dark:bg-green-400/30 dark:text-green-200' },
};

const getStatusBadge = (status: Project['status']) => {
    switch (status) {
        case 'in-progress':
            return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-400/30 dark:text-indigo-200">Em Progresso</span>
        case 'completed':
            return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/30 dark:text-emerald-200">Concluído</span>
        case 'not-started':
            return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 dark:bg-gray-400/30 dark:text-gray-200">Não Iniciado</span>
    }
};

const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    return adjustedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

const StatCard: React.FC<{ icon: React.FC<{className?: string}>, title: string, value: number, color: 'blue'|'green'|'red'|'purple' }> = ({ icon: Icon, title, value, color }) => {
    const colors = {
        blue: { lightBg: 'bg-blue-100', lightText: 'text-blue-600', darkBg: 'dark:bg-blue-400/30', darkText: 'dark:text-blue-200' },
        green: { lightBg: 'bg-green-100', lightText: 'text-green-600', darkBg: 'dark:bg-green-400/30', darkText: 'dark:text-green-200' },
        red: { lightBg: 'bg-red-100', lightText: 'text-red-600', darkBg: 'dark:bg-red-400/30', darkText: 'dark:text-red-200' },
        purple: { lightBg: 'bg-purple-100', lightText: 'text-purple-600', darkBg: 'dark:bg-purple-400/30', darkText: 'dark:text-purple-200' },
    }
    const C = colors[color];
    return (
        <Card className="p-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-slate-500 dark:text-slate-300 font-medium">{title}</p>
                    <p className="text-3xl font-bold text-slate-800 dark:text-slate-50 mt-1">{value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${C.lightBg} ${C.darkBg}`}>
                    <Icon className={`w-6 h-6 ${C.lightText} ${C.darkText}`} />
                </div>
            </div>
        </Card>
    );
};

const ProjectCard: React.FC<{ project: Project; tasks: Task[]; goalName?: string; onOpen: () => void; }> = ({ project, tasks, goalName, onOpen }) => {
    const projectTasks = tasks.filter(t => t.projectId === project.id);
    const completedTasks = projectTasks.filter(t => t.status === 'done').length;
    const progress = projectTasks.length > 0 ? (completedTasks / projectTasks.length) * 100 : project.status === 'completed' ? 100 : 0;

    return (
        <Card onClick={onOpen} className="p-5 flex flex-col cursor-pointer hover:border-orange-400/50 dark:hover:border-white/20 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">{project.name}</h3>
                {getStatusBadge(project.status)}
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 h-10 flex-grow">{project.description}</p>
            
            <div className="mt-auto pt-4 space-y-3">
                 <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-300">
                    <div className={`inline-flex items-center rounded-md font-semibold transition-colors text-xs px-2 py-0.5 ${priorityConfig[project.priority].styles}`}>
                        {priorityConfig[project.priority].label}
                    </div>
                    {goalName && (
                        <div className="flex items-center gap-1.5">
                            <GoalsIcon className="w-4 h-4" />
                            <span className="truncate max-w-28">{goalName}</span>
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span>Progresso</span>
                        <span>{completedTasks}/{projectTasks.length}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-1.5">
                      <div 
                        className="bg-orange-500 dark:bg-orange-400 h-1.5 rounded-full transition-all duration-500" 
                        style={{width: `${progress}%`}}
                      ></div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const ProjectDetailModal: React.FC<{ 
    project: Project | null;
    tasks: Task[];
    goals: Goal[];
    projects: Project[];
    onClose: () => void;
    updateTask: (task: Task) => void;
    addTask: (newTaskData: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => void;
}> = ({ project, tasks, goals, projects, onClose, updateTask, addTask }) => {
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    if (!project) return null;

    const projectTasks = tasks.filter(t => t.projectId === project.id);
    const linkedGoal = goals.find(g => g.id === project.goalId);

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 dark:bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
                <div className="bg-slate-50/90 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl w-full max-w-3xl m-4 max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                    <div className="p-6 border-b border-slate-200 dark:border-white/10">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{project.name}</h2>
                    </div>
                    <div className="p-6 overflow-y-auto space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="space-y-1"><p className="text-slate-500 dark:text-slate-400">Status</p>{getStatusBadge(project.status)}</div>
                            <div className="space-y-1"><p className="text-slate-500 dark:text-slate-400">Prioridade</p><span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityConfig[project.priority].styles}`}>{priorityConfig[project.priority].label}</span></div>
                            <div className="space-y-1"><p className="text-slate-500 dark:text-slate-400">Início</p><p className="font-semibold text-slate-700 dark:text-slate-200">{formatDate(project.startDate)}</p></div>
                            <div className="space-y-1"><p className="text-slate-500 dark:text-slate-400">Término</p><p className="font-semibold text-slate-700 dark:text-slate-200">{formatDate(project.endDate)}</p></div>
                            <div className="col-span-2 md:col-span-4 space-y-1"><p className="text-slate-500 dark:text-slate-400">Meta</p><p className="font-semibold text-slate-700 dark:text-slate-200">{linkedGoal?.name || 'Nenhuma'}</p></div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">✍️ Descrição do Projeto</h3>
                            <div className="p-4 bg-slate-100 dark:bg-black/20 rounded-lg border border-slate-200 dark:border-white/10">
                                <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{project.description}</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">✅ Tarefas do Projeto</h3>
                                <button
                                    onClick={() => setIsAddTaskModalOpen(true)}
                                    className="flex items-center gap-2 px-3 py-2 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 border border-slate-300 dark:border-white/20 rounded-lg text-slate-800 dark:text-white text-sm font-semibold transition-colors"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    Nova Tarefa
                                </button>
                            </div>
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {projectTasks.length > 0 ? 
                                    projectTasks.map(task => <ModalTaskItem key={task.id} task={task} updateTask={updateTask} />) :
                                    <p className="text-slate-500 dark:text-slate-500 text-center py-4">Nenhuma tarefa adicionada.</p>
                                }
                            </div>
                        </div>
                    </div>
                     <div className="p-4 bg-slate-100/50 dark:bg-black/20 border-t border-slate-200 dark:border-white/10 flex justify-end">
                        <button onClick={onClose} className="px-5 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">Fechar</button>
                    </div>
                </div>
            </div>
            <AddTaskModal
                isOpen={isAddTaskModalOpen}
                onClose={() => setIsAddTaskModalOpen(false)}
                addTask={addTask}
                projects={projects}
                goals={goals}
                initialData={{
                    projectId: project.id,
                    goalId: project.goalId,
                }}
            />
        </>
    );
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ projects, tasks, goals, addProject, addTask, updateTask }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Project['status'] | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');

  const goalMap = useMemo(() => new Map(goals.map(g => [g.id, g.name])), [goals]);

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return {
        active: projects.filter(p => p.status === 'in-progress').length,
        completed: projects.filter(p => p.status === 'completed').length,
        overdue: projects.filter(p => {
            if (!p.endDate || p.status === 'completed') return false;
            const deadline = new Date(p.endDate);
            return deadline < today;
        }).length,
        total: projects.length,
    }
  }, [projects]);
  
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
        const statusMatch = statusFilter === 'all' || project.status === statusFilter;
        const priorityMatch = priorityFilter === 'all' || project.priority === priorityFilter;
        return statusMatch && priorityMatch;
    });
  }, [projects, statusFilter, priorityFilter]);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-200 dark:bg-orange-400/30 text-orange-600 dark:text-orange-200 rounded-2xl mb-4">
          <ProjectsIcon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Projetos</h1>
        <p className="text-slate-600 dark:text-slate-300">Gerencie seus projetos com etapas, prazos e acompanhe o progresso</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={AnalysisIcon} title="Ativos" value={stats.active} color="blue" />
        <StatCard icon={CheckCircleIcon} title="Concluídos" value={stats.completed} color="green" />
        <StatCard icon={AlertCircleIcon} title="Atrasados" value={stats.overdue} color="red" />
        <StatCard icon={FoldersIcon} title="Total" value={stats.total} color="purple" />
      </div>

      <Card className="p-3 mb-6">
        <button 
          onClick={() => setIsAddProjectModalOpen(true)}
          className="w-full px-4 py-3 bg-slate-500/10 dark:bg-white/5 hover:bg-slate-500/20 dark:hover:bg-white/10 rounded-lg text-orange-600 dark:text-orange-400 font-semibold transition-colors flex items-center gap-2 text-left text-base border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-orange-500/80 dark:hover:border-orange-400/80">
          <PlusIcon className="w-5 h-5" />
          Adicionar Novo Projeto...
        </button>
      </Card>

      <Card className="p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm">Filtros:</span>
          <select onChange={e => setStatusFilter(e.target.value as any)} value={statusFilter} className="bg-slate-100/50 dark:bg-black/20 border-slate-300 dark:border-white/10 rounded-md text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option value="all">Todos status</option>
            <option value="not-started">Não Iniciado</option>
            <option value="in-progress">Em Progresso</option>
            <option value="completed">Concluído</option>
          </select>
          <select onChange={e => setPriorityFilter(e.target.value as any)} value={priorityFilter} className="bg-slate-100/50 dark:bg-black/20 border-slate-300 dark:border-white/10 rounded-md text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option value="all">Todas prioridades</option>
            {Object.entries(priorityConfig).map(([key, {label}]) => <option key={key} value={key as Priority}>{label}</option>)}
          </select>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-300 dark:border-white/20 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10">
            <CalendarIcon className="w-4 h-4" />
            Selecionar período
          </button>
        </div>
        <span className="text-slate-600 dark:text-slate-300 text-sm font-semibold">{filteredProjects.length} {filteredProjects.length === 1 ? 'projeto' : 'projetos'}</span>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
            <ProjectCard 
                key={project.id} 
                project={project} 
                tasks={tasks}
                goalName={project.goalId ? goalMap.get(project.goalId) : undefined}
                onOpen={() => setSelectedProject(project)}
            />
        ))}
      </div>
      
      {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject}
            tasks={tasks}
            goals={goals}
            projects={projects}
            onClose={() => setSelectedProject(null)}
            updateTask={updateTask}
            addTask={addTask}
          />
      )}
      <AddProjectModal 
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        addProject={addProject}
        goals={goals}
      />
    </div>
  );
};