import React from 'react';
import { usePomodoro } from '../hooks/usePomodoro';

export const PomodoroTimer: React.FC = () => {
  const { minutes, seconds, isActive, mode, toggleTimer, resetTimer, handleNextMode } = usePomodoro();

  const getModeStyles = () => {
    switch (mode) {
      case 'work':
        return 'bg-rose-500/30 text-rose-200';
      case 'shortBreak':
        return 'bg-cyan-500/30 text-cyan-200';
      case 'longBreak':
        return 'bg-emerald-500/30 text-emerald-200';
    }
  };
  
  const getButtonStyles = () => {
    switch (mode) {
      case 'work':
        return 'bg-rose-500/80 hover:bg-rose-500';
      case 'shortBreak':
        return 'bg-cyan-500/80 hover:bg-cyan-500';
      case 'longBreak':
        return 'bg-emerald-500/80 hover:bg-emerald-500';
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-2">
      <div className={`px-3 py-1 rounded-md text-sm font-semibold ${getModeStyles()}`}>
        {mode === 'work' ? 'Foco' : mode === 'shortBreak' ? 'Pausa Curta' : 'Pausa Longa'}
      </div>
      <div className="font-mono text-xl font-bold text-slate-100">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <button
        onClick={toggleTimer}
        className={`px-4 py-2 rounded-md text-white font-semibold transition-colors ${getButtonStyles()}`}
      >
        {isActive ? 'Pausar' : 'Iniciar'}
      </button>
       <button
        onClick={() => resetTimer('work')}
        className="p-2 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
        title="Resetar para Foco"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l16 16" />
        </svg>
      </button>
      <button
        onClick={handleNextMode}
        className="p-2 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
        title="Próximo Modo"
      >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};