import React from 'react';
import { Task, Project, Goal } from '../types';
import { Card } from './Card';
import { TasksIcon, ProjectsIcon, GoalsIcon, CheckIcon } from './icons';

interface DashboardProps {
  tasks: Task[];
  projects: Project[];
  goals: Goal[];
}

const WelcomeHeader: React.FC = () => (
    <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Bom dia!</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mt-1">Aqui está sua visão geral para hoje. Vamos ter um dia produtivo.</p>
    </div>
);

const QuickStats: React.FC<{ tasks: number, projects: number, goals: number }> = ({ tasks, projects, goals }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-5">
            <div className="flex items-center">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 mr-4">
                    <TasksIcon className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-300">Tarefas Pendentes</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-50">{tasks}</p>
                </div>
            </div>
        </Card>
        <Card className="p-5">
            <div className="flex items-center">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 mr-4">
                    <ProjectsIcon className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-300">Projetos Ativos</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-50">{projects}</p>
                </div>
            </div>
        </Card>
        <Card className="p-5">
            <div className="flex items-center">
                <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 mr-4">
                    <GoalsIcon className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-300">Metas Ativas</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-50">{goals}</p>
                </div>
            </div>
        </Card>
    </div>
);

const TaskListItem: React.FC<{ task: Task }> = ({ task }) => (
    <div className="flex items-center p-3 hover:bg-slate-100/50 dark:hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
        <div className="w-5 h-5 rounded-full border-2 border-slate-400 dark:border-slate-500 flex items-center justify-center">
            {task.status === 'done' && <CheckIcon className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />}
        </div>
        <span className={`ml-3 text-slate-700 dark:text-slate-200 ${task.status === 'done' ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>{task.content}</span>
    </div>
);

const ProjectListItem: React.FC<{ project: Project }> = ({ project }) => (
    <div className="p-4 bg-slate-500/10 dark:bg-white/5 rounded-lg">
        <h4 className="font-semibold text-slate-800 dark:text-slate-50">{project.name}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 truncate">{project.description}</p>
        <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2 mt-3">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{width: '45%'}}></div>
        </div>
    </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ tasks, projects, goals }) => {
  const pendingTasks = tasks.filter(t => t.status !== 'done');
  
  return (
    <div className="animate-fade-in">
      <WelcomeHeader />
      <QuickStats tasks={pendingTasks.length} projects={projects.filter(p => p.status === 'in-progress').length} goals={goals.length} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="!p-0">
            <div className="p-5 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-lg font-semibold flex items-center text-slate-800 dark:text-slate-50">
                    <TasksIcon className="h-5 w-5 mr-3 text-indigo-500 dark:text-indigo-400" />
                    Foco para Hoje
                </h3>
            </div>
            <div className="p-3 space-y-1">
                {pendingTasks.slice(0, 5).map(task => <TaskListItem key={task.id} task={task} />)}
            </div>
        </Card>

        <Card className="!p-0">
            <div className="p-5 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-lg font-semibold flex items-center text-slate-800 dark:text-slate-50">
                    <ProjectsIcon className="h-5 w-5 mr-3 text-purple-500 dark:text-purple-400" />
                    Projetos Ativos
                </h3>
            </div>
            <div className="p-5 space-y-4">
                {projects.filter(p => p.status === 'in-progress').map(project => <ProjectListItem key={project.id} project={project} />)}
            </div>
        </Card>
      </div>
    </div>
  );
};