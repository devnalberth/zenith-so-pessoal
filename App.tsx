import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TasksView } from './components/TasksView';
import { ProjectsView } from './components/ProjectsView';
import { GoalsView } from './components/GoalsView';
import { HistoryView } from './components/HistoryView';
import { PlaceholderView } from './components/PlaceholderView';
import { SettingsView } from './components/SettingsView';
import { ThemeToggle } from './components/ThemeToggle';
import { useApp } from './contexts/AppContext';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('projects');
  const {
    tasks,
    projects,
    goals,
    goalsWithProgress,
    addTask,
    addProject,
    addGoal,
    updateTask,
    updateProject,
  } = useApp();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard tasks={tasks} projects={projects} goals={goals} />;
      case 'tasks':
        return <TasksView tasks={tasks} projects={projects} goals={goals} addTask={addTask} updateTask={updateTask} />;
      case 'projects':
        return <ProjectsView projects={projects} tasks={tasks} goals={goals} addProject={addProject} addTask={addTask} updateTask={updateTask} />;
      case 'goals':
        return <GoalsView 
                    goals={goalsWithProgress}
                    projects={projects}
                    tasks={tasks}
                    allGoals={goals}
                    addGoal={addGoal}
                    addProject={addProject}
                    addTask={addTask}
                    updateTask={updateTask}
                />;
      case 'history':
        return <HistoryView tasks={tasks} projects={projects} goals={goals} />;
      case 'travel':
        return <PlaceholderView title="Viagens" />;
      case 'finance':
        return <PlaceholderView title="Financeiro" />;
      case 'workouts':
        return <PlaceholderView title="Treinos" />;
      case 'studies':
        return <PlaceholderView title="Estudos" />;
      case 'settings':
        return <SettingsView />;
      default:
        return <TasksView tasks={tasks} projects={projects} goals={goals} addTask={addTask} updateTask={updateTask} />;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Theme Toggle - Posicionado no canto superior direito */}
      <div className="fixed top-6 right-6 z-[101]">
        <ThemeToggle />
      </div>
      
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="p-4 sm:p-8 pb-28 animate-fade-in">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;