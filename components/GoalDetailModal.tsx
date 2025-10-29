import React, { useState } from 'react';
import { Goal, GoalWithProgress, Project, Task } from '../types';
import { PlusIcon } from './icons';
import { AddProjectModal } from './AddProjectModal';
import { AddTaskModal } from './AddTaskModal';
import { ModalTaskItem } from './ModalTaskItem';

interface GoalDetailModalProps {
    goal: GoalWithProgress | null;
    projects: Project[];
    tasks: Task[];
    goals: Goal[]; // All goals for dropdowns
    onClose: () => void;
    addProject: (newProjectData: Omit<Project, 'id' | 'completedAt'>) => void;
    addTask: (newTaskData: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => void;
    updateTask: (task: Task) => void;
}

const getAreaBadge = (area: GoalWithProgress['area']) => {
    const styles: Record<Goal['area'], string> = {
        'Pessoal': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-400/30 dark:text-cyan-200',
        'Profissional': 'bg-purple-100 text-purple-800 dark:bg-purple-400/30 dark:text-purple-200',
        'Financeiro': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/30 dark:text-emerald-200',
        'Saúde e Corpo': 'bg-rose-100 text-rose-800 dark:bg-rose-400/30 dark:text-rose-200',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[area]}`}>{area}</span>
};

const formatDate = (dateString?: string) => {
    if (!dateString) return 'Sem prazo';
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    return adjustedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}


export const GoalDetailModal: React.FC<GoalDetailModalProps> = ({ goal, projects, tasks, goals, onClose, addProject, addTask, updateTask }) => {
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    if (!goal) return null;

    const associatedProjects = projects.filter(p => p.goalId === goal.id);
    const associatedProjectIds = associatedProjects.map(p => p.id);
    const goalTasks = tasks.filter(t => t.projectId && associatedProjectIds.includes(t.projectId));


    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 dark:bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
                <div className="bg-slate-50/90 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl w-full max-w-3xl m-4 max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                    <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{goal.name}</h2>
                            <p className="text-slate-500 dark:text-slate-400">Prazo: {formatDate(goal.deadline)}</p>
                        </div>
                        {getAreaBadge(goal.area)}
                    </div>
                    <div className="p-6 overflow-y-auto space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-50 mb-2">✍️ Descrição da Meta</h3>
                            <aside className="p-4 bg-slate-100 dark:bg-black/20 rounded-lg border border-slate-200 dark:border-white/10">
                                <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{goal.description}</p>
                            </aside>
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-50">🔗 Projetos Vinculados</h3>
                                 <button
                                    onClick={() => setIsAddProjectModalOpen(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 rounded-lg text-slate-800 dark:text-white text-xs font-semibold transition-colors"
                                >
                                    <PlusIcon className="h-3 w-3" />
                                    Novo Projeto
                                </button>
                            </div>
                            <div className="space-y-3">
                                {associatedProjects.length > 0 ? (
                                    associatedProjects.map(p => (
                                        <div key={p.id} className="p-3 bg-slate-100 dark:bg-white/5 rounded-lg">
                                            <p className="font-semibold text-slate-800 dark:text-slate-200">{p.name}</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">{p.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-500 text-center py-4">Nenhum projeto associado a esta meta.</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-50">✅ Tarefas da Meta</h3>
                                <button
                                    onClick={() => setIsAddTaskModalOpen(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 rounded-lg text-slate-800 dark:text-white text-xs font-semibold transition-colors"
                                >
                                    <PlusIcon className="h-3 w-3" />
                                    Nova Tarefa
                                </button>
                            </div>
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {goalTasks.length > 0 ? 
                                    goalTasks.map(task => <ModalTaskItem key={task.id} task={task} updateTask={updateTask} />) :
                                    <p className="text-slate-500 text-center py-4">Nenhuma tarefa encontrada para esta meta.</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-100/50 dark:bg-black/20 border-t border-slate-200 dark:border-white/10 flex justify-end">
                        <button onClick={onClose} className="px-5 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">Fechar</button>
                    </div>
                </div>
            </div>

            <AddProjectModal
                isOpen={isAddProjectModalOpen}
                onClose={() => setIsAddProjectModalOpen(false)}
                addProject={addProject}
                goals={goals}
                initialData={{ goalId: goal.id }}
            />
            <AddTaskModal
                isOpen={isAddTaskModalOpen}
                onClose={() => setIsAddTaskModalOpen(false)}
                addTask={addTask}
                projects={associatedProjects}
                goals={goals.filter(g => g.id === goal.id)}
                initialData={{ goalId: goal.id }}
            />
        </>
    );
};