import React from 'react';
import { Task } from '../types';
import { CheckIcon } from './icons';

export const ModalTaskItem: React.FC<{ task: Task; updateTask: (task: Task) => void; }> = ({ task, updateTask }) => {
    return (
        <div className="flex items-center gap-3 p-2.5 bg-slate-200/50 dark:bg-white/5 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
            <button
                onClick={() => updateTask({ ...task, status: task.status === 'done' ? 'todo' : 'done' })}
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${task.status === 'done' ? 'bg-cyan-500 border-cyan-500' : 'border-slate-400 dark:border-slate-500 bg-white dark:bg-black/20 hover:border-cyan-400'}`}
            >
                {task.status === 'done' && <CheckIcon className="w-3.5 h-3.5 text-white" />}
            </button>
            <span className={`flex-1 ${task.status === 'done' ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                {task.content}
            </span>
        </div>
    );
};