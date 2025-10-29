import React, { useState, useMemo } from 'react';
import { Task, Project, Goal, Priority, Area } from '../types';
import { Card } from './Card';
import { PlusIcon, CheckIcon, CalendarIcon, HistoryIcon, GoalsIcon, TasksIcon, ProjectsIcon, AnalysisIcon, SunIcon, FlameIcon, ListIcon, BoltIcon } from './icons';
import { FocusView } from './FocusView';
import { AnalysisView } from './AnalysisView';
import { AddTaskModal } from './AddTaskModal';

interface TasksViewProps {
    tasks: Task[];
    projects: Project[];
    goals: Goal[];
    addTask: (newTaskData: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => void;
    updateTask: (task: Task) => void;
}

const isDateToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

    return adjustedDate.getDate() === today.getDate() &&
        adjustedDate.getMonth() === today.getMonth() &&
        adjustedDate.getFullYear() === today.getFullYear();
};

const isDateTomorrow = (dateString: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

    return adjustedDate.getDate() === tomorrow.getDate() &&
        adjustedDate.getMonth() === tomorrow.getMonth() &&
        adjustedDate.getFullYear() === tomorrow.getFullYear();
};

const priorityConfig: Record<Priority, { label: string; styles: string; }> = {
    'baixa': { label: 'Baixa', styles: 'bg-slate-100 text-slate-600 dark:bg-slate-400/30 dark:text-slate-200' },
    'normal': { label: 'Normal', styles: 'bg-blue-100 text-blue-600 dark:bg-blue-400/30 dark:text-blue-200' },
    'alta': { label: 'Alta', styles: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-400/30 dark:text-yellow-200' },
    'urgente': { label: 'Urgente', styles: 'bg-red-100 text-red-700 dark:bg-red-400/40 dark:text-red-200' },
    'delegar': { label: 'Delegar', styles: 'bg-green-100 text-green-700 dark:bg-green-400/30 dark:text-green-200' },
};

const ViewHeader: React.FC = () => (
    <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-200 to-cyan-300 dark:from-teal-400 dark:to-cyan-600 rounded-3xl shadow-lg mb-4">
            <TasksIcon className="w-8 h-8 text-cyan-800 dark:text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Tarefas</h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Organize suas tarefas e acompanhe seu progresso.</p>
    </div>
);

const TaskTabs: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'tasks', label: 'Tarefas', icon: TasksIcon },
        { id: 'foco', label: 'Foco', icon: GoalsIcon },
        { id: 'analysis', label: 'Análise', icon: AnalysisIcon },
    ];

    return (
        <div className="flex items-center justify-center mb-8">
            <div className="bg-slate-200/60 dark:bg-black/20 backdrop-blur-sm border border-slate-300/80 dark:border-white/10 p-1.5 rounded-xl shadow-md flex items-center gap-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                            activeTab === tab.id
                                ? 'bg-white dark:bg-white/90 text-slate-900 shadow-md'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-white'
                        }`}
                    >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

const TaskStats: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = useMemo(() => {
        const pendingTasks = tasks.filter(t => t.status !== 'done');
        const overdueCount = pendingTasks.filter(t => {
            if (!t.endDate) return false;
            const deadlineDate = new Date(t.endDate);
            const userTimezoneOffset = deadlineDate.getTimezoneOffset() * 60000;
            const adjustedDeadline = new Date(deadlineDate.getTime() + userTimezoneOffset);
            return adjustedDeadline < today;
        }).length;

        return {
            total: tasks.length,
            completedToday: tasks.filter(t => t.status === 'done' && t.completedAt && new Date(t.completedAt).toDateString() === today.toDateString()).length,
            pending: pendingTasks.length,
            overdue: overdueCount,
        };
    }, [tasks]);

    const statItems = [
        { label: "Total de Tarefas", value: stats.total, icon: GoalsIcon, color: "text-blue-600 dark:text-blue-300", bg: "bg-blue-100 dark:bg-blue-500/20" },
        { label: "Concluídas Hoje", value: stats.completedToday, icon: CheckIcon, color: "text-green-600 dark:text-green-300", bg: "bg-green-100 dark:bg-green-500/20" },
        { label: "Pendentes", value: stats.pending, icon: HistoryIcon, color: "text-orange-600 dark:text-orange-300", bg: "bg-orange-100 dark:bg-orange-500/20" },
        { label: "Atrasadas", value: stats.overdue, icon: CalendarIcon, color: "text-red-600 dark:text-red-300", bg: "bg-red-100 dark:bg-red-500/20" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statItems.map(item => (
                <Card key={item.label} className="p-5">
                    <div className="flex items-center">
                        <div className={`flex items-center justify-center w-12 h-12 ${item.bg} rounded-xl mr-4`}>
                           <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 dark:text-slate-50">{item.value}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-300">{item.label}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

const TaskItem: React.FC<{ task: Task, project?: { id: string, name: string }, updateTask: (task: Task) => void }> = ({ task, project, updateTask }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isOverdue = task.endDate && new Date(task.endDate) < today && task.status !== 'done';

    return (
        <div className={`group relative flex items-start gap-4 p-4 rounded-xl transition-all border ${isOverdue ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20' : 'bg-slate-100/50 dark:bg-black/10 border-slate-200 dark:border-white/5'} hover:shadow-md hover:border-cyan-400 dark:hover:border-cyan-500/50 hover:bg-slate-100 dark:hover:bg-black/20`}>
            <button
                onClick={() => updateTask({ ...task, status: task.status === 'done' ? 'todo' : 'done' })}
                className={`mt-1 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${task.status === 'done' ? 'bg-cyan-500 border-cyan-500' : 'border-slate-400 dark:border-slate-500 bg-white dark:bg-black/20 hover:border-cyan-400'}`}
            >
                {task.status === 'done' && <CheckIcon className="w-4 h-4 text-white" />}
            </button>
            <div className="flex-1 min-w-0">
                <h3 className={`font-medium leading-tight text-slate-800 dark:text-slate-100 ${task.status === 'done' ? 'line-through text-slate-500 dark:text-slate-500' : ''}`}>
                    {task.content}
                </h3>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    <div className={`inline-flex items-center rounded-md font-semibold transition-colors text-xs px-2 py-0.5 ${priorityConfig[task.priority].styles}`}>
                        {priorityConfig[task.priority].label}
                    </div>
                    {project && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/30 rounded-md">
                            <ProjectsIcon className="w-3 h-3 text-purple-700 dark:text-purple-300 flex-shrink-0" />
                            <span className="text-xs text-purple-700 dark:text-purple-300 font-medium">{project.name}</span>
                        </div>
                    )}
                    {task.endDate && (
                         <div className={`flex items-center gap-1 text-xs font-medium ${isOverdue ? 'text-red-600 dark:text-red-300' : 'text-slate-500 dark:text-slate-400'}`}>
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date(task.endDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', timeZone: 'UTC' })}</span>
                            {isOverdue && <span className="font-bold">• Atrasada</span>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TaskFilters: React.FC<{ activeFilter: string; setActiveFilter: (filter: string) => void }> = ({ activeFilter, setActiveFilter }) => {
    const filters = [
        { id: 'hoje', label: 'Hoje', icon: ListIcon },
        { id: 'flow', label: 'Flow', icon: FlameIcon },
        { id: 'tarefa-rapida', label: 'Tarefa Rápida', icon: BoltIcon },
        { id: 'finalizada', label: 'Finalizada', icon: CheckIcon },
        { id: 'amanha', label: 'Amanhã', icon: SunIcon },
        { id: 'atrasadas', label: 'Atrasadas', icon: CalendarIcon },
        { id: 'sem-agendamento', label: 'Sem Agendamento', icon: CalendarIcon },
    ];
    return (
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
            {filters.map(filter => (
                <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center flex-shrink-0 gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                        activeFilter === filter.id
                            ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 shadow'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-white'
                    }`}
                >
                    <filter.icon className="w-4 h-4" />
                    {filter.label}
                </button>
            ))}
        </div>
    );
};

export const TasksView: React.FC<TasksViewProps> = ({ tasks, projects, goals, addTask, updateTask }) => {
    const [activeTab, setActiveTab] = useState('tasks');
    const [activeFilter, setActiveFilter] = useState('sem-agendamento');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const projectMap = useMemo(() => new Map(projects.map(p => [p.id, p.name])), [projects]);

    const filteredTasks = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (activeFilter === 'finalizada') {
            return tasks.filter(task => task.status === 'done');
        }

        const pendingTasks = tasks.filter(task => task.status !== 'done');

        switch (activeFilter) {
            case 'hoje':
                return pendingTasks.filter(t => t.endDate && isDateToday(t.endDate));
            case 'flow':
                return pendingTasks.filter(t => t.priority === 'urgente');
            case 'tarefa-rapida':
                 return pendingTasks.filter(t => !t.projectId);
            case 'amanha':
                return pendingTasks.filter(t => t.endDate && isDateTomorrow(t.endDate));
            case 'atrasadas':
                 return pendingTasks.filter(t => {
                    if (!t.endDate) return false;
                    const deadlineDate = new Date(t.endDate);
                    const userTimezoneOffset = deadlineDate.getTimezoneOffset() * 60000;
                    const adjustedDeadline = new Date(deadlineDate.getTime() + userTimezoneOffset);
                    return adjustedDeadline < today;
                });
            case 'sem-agendamento':
                return pendingTasks.filter(t => !t.endDate);
            default:
                return pendingTasks;
        }
    }, [tasks, activeFilter]);


    const noTasksMessages: Record<string, string> = {
        'hoje': "Nenhuma tarefa para hoje. Aproveite o dia!",
        'flow': "Nenhuma tarefa de alta prioridade. Bom trabalho!",
        'tarefa-rapida': "Nenhuma tarefa rápida encontrada.",
        'finalizada': "Nenhuma tarefa foi finalizada ainda.",
        'amanha': "Nenhuma tarefa agendada para amanhã.",
        'atrasadas': "Nenhuma tarefa atrasada. Tudo em dia!",
        'sem-agendamento': "Nenhuma tarefa sem agendamento. Organize seus próximos passos!",
    };
    
    return (
        <div className="space-y-6">
            <ViewHeader />
            <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === 'tasks' && (
                <>
                    <TaskStats tasks={tasks} />
                    <Card className="mt-6 p-6 animate-fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">Sua Lista de Tarefas</h3>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                title="Adicionar Nova Tarefa"
                                className="p-2 bg-cyan-500 dark:bg-cyan-600 hover:bg-cyan-600 dark:hover:bg-cyan-700 rounded-full text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <PlusIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <TaskFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

                        <div className="space-y-3">
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map(task => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        project={task.projectId ? { id: task.projectId, name: projectMap.get(task.projectId) || '' } : undefined}
                                        updateTask={updateTask}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl">
                                    <p className="text-slate-500 dark:text-slate-400">{noTasksMessages[activeFilter] || "Nenhuma tarefa encontrada."}</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </>
            )}
            
            {activeTab === 'foco' && (
                <FocusView 
                    tasks={tasks.filter(t => (t.priority === 'alta' || t.priority === 'urgente') && t.status !== 'done')}
                    updateTask={updateTask}
                />
            )}

            {activeTab === 'analysis' && (
                <AnalysisView tasks={tasks} />
            )}

            <AddTaskModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                addTask={addTask}
                projects={projects}
                goals={goals}
            />
        </div>
    );
};