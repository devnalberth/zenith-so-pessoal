import React, { useState } from 'react';
import { Goal, GoalWithProgress, Project, Task } from '../types';
import { Card } from './Card';
import { CalendarIcon } from './icons';
import { AddGoalModal } from './AddGoalModal';
import { GoalDetailModal } from './GoalDetailModal';

interface GoalsViewProps {
  goals: GoalWithProgress[];
  projects: Project[];
  tasks: Task[];
  allGoals: Goal[];
  addGoal: (newGoalData: Omit<Goal, 'id'>) => void;
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

const GoalCard: React.FC<{ goal: GoalWithProgress; onOpen: () => void; }> = ({ goal, onOpen }) => {
    return (
        <Card onClick={onOpen} className="p-5 flex flex-col cursor-pointer hover:border-indigo-400/80 dark:hover:border-indigo-500/50 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{goal.name}</h3>
                {getAreaBadge(goal.area)}
            </div>
            <p className="text-slate-600 dark:text-slate-300 flex-grow my-2 h-12">{goal.description}</p>
            
            <div className="mt-auto pt-4">
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-300 mb-1">
                    <span>Progresso ({Math.round(goal.progress)}%)</span>
                    <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" /> {formatDate(goal.deadline)}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2">
                    <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
                        style={{width: `${goal.progress}%`}}
                    ></div>
                </div>
            </div>
        </Card>
    );
};

export const GoalsView: React.FC<GoalsViewProps> = ({ goals, projects, tasks, allGoals, addGoal, addProject, addTask, updateTask }) => {
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalWithProgress | null>(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Metas de Longo Prazo</h1>
        <button 
            onClick={() => setIsAddGoalModalOpen(true)}
            className="px-5 py-2 bg-slate-800 text-white dark:bg-white/10 hover:bg-slate-700 dark:hover:bg-white/20 border border-slate-700 dark:border-white/20 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
          Nova Meta
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => <GoalCard key={goal.id} goal={goal} onOpen={() => setSelectedGoal(goal)} />)}
      </div>

      <AddGoalModal 
        isOpen={isAddGoalModalOpen}
        onClose={() => setIsAddGoalModalOpen(false)}
        addGoal={addGoal}
      />

      {selectedGoal && (
          <GoalDetailModal
            goal={selectedGoal}
            projects={projects}
            tasks={tasks}
            goals={allGoals}
            onClose={() => setSelectedGoal(null)}
            addProject={addProject}
            addTask={addTask}
            updateTask={updateTask}
          />
      )}
    </div>
  );
};