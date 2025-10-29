import React, { useState } from 'react';
import { Task, GtdCategory } from '../types';
import { Card } from './Card';
import { PlusIcon } from './icons';

interface GtdViewProps {
  title: string;
  category: GtdCategory;
  tasks: Task[];
  addTask: (content: string, category: GtdCategory) => void;
  updateTask: (task: Task) => void;
}

const TaskItem: React.FC<{ task: Task; updateTask: (task: Task) => void; }> = ({ task, updateTask }) => {
    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTask({ ...task, status: e.target.checked ? 'done' : 'todo' });
    };

    return (
        <div className={`flex items-center p-3 bg-slate-800 rounded-md border border-slate-700 hover:border-slate-600 group transition-all duration-300 ease-out ${task.status === 'done' ? 'opacity-50' : ''}`}>
            <input 
                type="checkbox" 
                className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-500/50 transition-all"
                checked={task.status === 'done'}
                onChange={handleStatusChange}
            />
            <span className={`ml-4 text-gray-300 group-hover:text-white transition-colors ${task.status === 'done' ? 'line-through text-gray-500' : ''}`}>
                {task.content}
            </span>
        </div>
    );
};

const AddTaskForm: React.FC<{ addTask: (content: string, category: GtdCategory) => void; category: GtdCategory }> = ({ addTask, category }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            addTask(content, category);
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={category === GtdCategory.Inbox ? 'Capture um novo pensamento...' : 'Adicione uma nova ação...'}
                className="flex-1 bg-slate-700 border-slate-600 rounded-md p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
            <button type="submit" className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white transition-colors">
                <PlusIcon className="h-6 w-6" />
            </button>
        </form>
    );
};

export const GtdView: React.FC<GtdViewProps> = ({ title, category, tasks, addTask, updateTask }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <Card className="mb-6">
        <AddTaskForm addTask={addTask} category={category} />
      </Card>
      <div className="space-y-3">
        {tasks.length > 0 ? (
            tasks.map(task => <TaskItem key={task.id} task={task} updateTask={updateTask} />)
        ) : (
            <Card className="text-center py-8">
                <p className="text-gray-400">
                    {category === GtdCategory.Inbox ? 'Sua caixa de entrada está vazia. Ótimo trabalho!' : 'Nenhuma tarefa aqui. Adicione uma acima!'}
                </p>
            </Card>
        )}
      </div>
    </div>
  );
};