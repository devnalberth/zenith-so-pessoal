import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Task } from '../types';
import { Card } from './Card';
import { CheckIcon } from './icons';

const FocusTaskItem: React.FC<{ task: Task, updateTask: (task: Task) => void }> = ({ task, updateTask }) => (
    <div className="flex items-center p-3 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10">
        <button
            onClick={() => updateTask({ ...task, status: task.status === 'done' ? 'todo' : 'done' })}
            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${task.status === 'done' ? 'bg-green-500 border-green-500' : 'border-slate-400 dark:border-slate-500 hover:border-green-400'}`}
        >
            {task.status === 'done' && <CheckIcon className="w-3 h-3 text-white" />}
        </button>
        <span className={`ml-3 text-slate-800 dark:text-slate-200 ${task.status === 'done' ? 'line-through text-slate-500' : ''}`}>{task.content}</span>
    </div>
);

const usePomodoroTimer = (initialTimes: { work: number; shortBreak: number; longBreak: number; }) => {
    const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
    const [times, setTimes] = useState(initialTimes);
    
    const timeInSeconds = {
        work: times.work * 60,
        shortBreak: times.shortBreak * 60,
        longBreak: times.longBreak * 60,
    };
    
    const [timeLeft, setTimeLeft] = useState(timeInSeconds.work);
    const [isActive, setIsActive] = useState(false);
    const [cycles, setCycles] = useState(0);
    const intervalRef = useRef<number | null>(null);

    const stopTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsActive(false);
    }, []);

    const startTimer = useCallback(() => {
        if (intervalRef.current) return;
        setIsActive(true);
        intervalRef.current = window.setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
    }, []);

    const handleNextMode = useCallback(() => {
        stopTimer();
        if (mode === 'work') {
            const newCycles = cycles + 1;
            setCycles(newCycles);
            const newMode = newCycles % 4 === 0 ? 'longBreak' : 'shortBreak';
            setMode(newMode);
            setTimeLeft(timeInSeconds[newMode]);
        } else {
            setMode('work');
            setTimeLeft(timeInSeconds.work);
        }
        startTimer();
    }, [cycles, mode, stopTimer, timeInSeconds, startTimer]);
    
    useEffect(() => {
        if (timeLeft === 0) {
            handleNextMode();
        }
    }, [timeLeft, handleNextMode]);

    useEffect(() => {
        return () => stopTimer();
    }, [stopTimer]);

    const toggleTimer = () => {
        isActive ? stopTimer() : startTimer();
    };
    
    const resetTimer = () => {
        stopTimer();
        setMode('work');
        setTimeLeft(timeInSeconds.work);
    };

    const totalTime = timeInSeconds[mode];
    const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
    
    return {
        minutes: Math.floor(timeLeft / 60),
        seconds: timeLeft % 60,
        isActive,
        mode,
        progress,
        toggleTimer,
        resetTimer,
    };
};

const PomodoroRingTimer: React.FC = () => {
    const { minutes, seconds, isActive, mode, progress, toggleTimer, resetTimer } = usePomodoroTimer({ work: 25, shortBreak: 5, longBreak: 15 });

    const modeConfig = {
        work: {
            label: 'Foco',
            color: 'text-red-500 dark:text-red-400',
            trackColor: 'stroke-red-200 dark:stroke-red-500/20',
            progressColor: 'stroke-red-500 dark:stroke-red-400',
            buttonBg: 'bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600',
        },
        shortBreak: {
            label: 'Pausa Curta',
            color: 'text-cyan-600 dark:text-cyan-400',
            trackColor: 'stroke-cyan-200 dark:stroke-cyan-500/20',
            progressColor: 'stroke-cyan-500 dark:stroke-cyan-400',
            buttonBg: 'bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-500 dark:hover:bg-cyan-600',
        },
        longBreak: {
            label: 'Pausa Longa',
            color: 'text-emerald-600 dark:text-emerald-400',
            trackColor: 'stroke-emerald-200 dark:stroke-emerald-500/20',
            progressColor: 'stroke-emerald-500 dark:stroke-emerald-400',
            buttonBg: 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600',
        },
    };

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    const config = modeConfig[mode];

    return (
        <Card className="p-8 flex flex-col items-center justify-center gap-6">
            <div className="relative w-52 h-52">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r={radius} fill="none" className={config.trackColor} strokeWidth="12" />
                    <circle
                        cx="100" cy="100" r={radius} fill="none"
                        className={config.progressColor} strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform="rotate(-90 100 100)"
                        style={{ transition: 'stroke-dashoffset 0.5s linear' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`font-mono text-5xl font-bold ${config.color}`}>
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                    <span className={`text-sm font-semibold uppercase tracking-wider ${config.color} opacity-80`}>
                        {config.label}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTimer}
                    className={`px-10 py-3 rounded-full text-white font-bold text-lg transition-colors ${config.buttonBg} shadow-lg`}
                >
                    {isActive ? 'PAUSAR' : 'INICIAR'}
                </button>
                 <button onClick={resetTimer} className="p-3 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors" title="Resetar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v6h6"></path><path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path></svg>
                 </button>
            </div>
        </Card>
    );
};

interface FocusViewProps {
    tasks: Task[];
    updateTask: (task: Task) => void;
}

export const FocusView: React.FC<FocusViewProps> = ({ tasks, updateTask }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 animate-fade-in">
            <div>
                <Card className="p-5">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Tarefas em Foco</h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">Aqui estão suas tarefas urgentes e de alta prioridade.</p>
                    <div className="space-y-3 max-h-[30rem] overflow-y-auto">
                        {tasks.length > 0 ? (
                            tasks.map(task => <FocusTaskItem key={task.id} task={task} updateTask={updateTask} />)
                        ) : (
                            <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl">
                                <p className="text-slate-500 dark:text-slate-400">Nenhuma tarefa em foco. Bom trabalho!</p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
            <div>
                <PomodoroRingTimer />
            </div>
        </div>
    );
};