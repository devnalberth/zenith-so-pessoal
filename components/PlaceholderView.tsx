import React from 'react';
import { Card } from './Card';

interface PlaceholderViewProps {
  title: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="text-center max-w-md p-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-300 dark:to-purple-300 mb-4">{title}</h1>
        <p className="text-slate-600 dark:text-slate-300">Esta área está em construção.</p>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Novas funcionalidades para gerenciar seus {title.toLowerCase()} chegarão em breve!</p>
      </Card>
    </div>
  );
};