
import React from 'react';
import { PomodoroTimer } from './PomodoroTimer';
import { MenuIcon } from './icons';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="flex-shrink-0 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
      <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-400 hover:bg-slate-700 hover:text-white transition-colors">
        <MenuIcon className="h-6 w-6" />
      </button>
      <div className="flex items-center space-x-4">
        <PomodoroTimer />
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full">
            <img src="https://picsum.photos/40/40" alt="User Avatar" className="rounded-full" />
        </div>
      </div>
    </header>
  );
};
