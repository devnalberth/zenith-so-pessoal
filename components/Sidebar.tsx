import React from 'react';
import { EyeIcon, TasksIcon, ProjectsIcon, GoalsIcon, BellIcon, SparklesIcon, FinanceIcon, StudiesIcon, BrainIcon, SettingsIcon } from './icons';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const navItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: EyeIcon },
    { id: 'tasks', label: 'Tarefas', icon: TasksIcon },
    { id: 'projects', label: 'Projetos', icon: ProjectsIcon },
    { id: 'goals', label: 'Metas', icon: GoalsIcon },
    { id: 'history', label: 'Histórico', icon: BellIcon },
    { id: 'travel', label: 'Viagens', icon: SparklesIcon },
    { id: 'finance', label: 'Financeiro', icon: FinanceIcon },
    { id: 'studies', label: 'Estudos', icon: StudiesIcon },
    { id: 'workouts', label: 'Treinos', icon: BrainIcon },
];

const settingsItem = { id: 'settings', label: 'Configurações', icon: SettingsIcon };

const NavItem: React.FC<{ item: typeof navItems[0]; activeView: string; setActiveView: (view: string) => void; }> = ({ item, activeView, setActiveView }) => {
  const isActive = activeView === item.id;
  
  const buttonClasses = `relative w-12 h-12 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center`;
  
  const activeClasses = 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md';
  const inactiveClasses = 'text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10';

  return (
    <button
      title={item.label}
      onClick={() => setActiveView(item.id)}
      className={`${buttonClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <item.icon className="w-6 h-6" />
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-row items-center gap-2 p-2 bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-300/80 dark:border-slate-700 rounded-full shadow-lg">
        {navItems.map((item) => (
          <NavItem key={item.id} item={item} activeView={activeView} setActiveView={setActiveView} />
        ))}
        <div className="w-px h-8 bg-slate-400/50 dark:bg-slate-600/50 mx-1"></div>
        <NavItem item={settingsItem} activeView={activeView} setActiveView={setActiveView} />
    </aside>
  );
};