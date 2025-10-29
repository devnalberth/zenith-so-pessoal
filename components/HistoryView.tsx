import React, { useState, useMemo } from 'react';
import { Task, Project, Goal, Area } from '../types';
import { Card } from './Card';
import { ProjectsIcon, TasksIcon } from './icons';

interface HistoryViewProps {
    tasks: Task[];
    projects: Project[];
    goals: Goal[];
}

type FilterType = 'all' | 'tasks' | 'projects';
type FilterPeriod = 'all' | '7d' | '30d' | '90d';
type FilterArea = 'all' | Area;

const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(dateString));
};

export const HistoryView: React.FC<HistoryViewProps> = ({ tasks, projects, goals }) => {
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('all');
    const [filterArea, setFilterArea] = useState<FilterArea>('all');

    const completedItems = useMemo(() => {
        const completedTasks = tasks
            .filter(t => t.status === 'done' && t.completedAt)
            .map(t => ({ ...t, type: 'task' as const }));

        const completedProjects = projects
            .filter(p => p.status === 'completed' && p.completedAt)
            .map(p => ({ ...p, type: 'project' as const }));

        return [...completedTasks, ...completedProjects]
            .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());

    }, [tasks, projects]);

    const filteredItems = useMemo(() => {
        let items = completedItems;

        if (filterType !== 'all') {
            items = items.filter(item => item.type === filterType.slice(0, -1));
        }

        if (filterPeriod !== 'all') {
            const days = parseInt(filterPeriod.replace('d', ''));
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);
            items = items.filter(item => new Date(item.completedAt!) >= cutoffDate);
        }
        
        if (filterArea !== 'all') {
            const goalMap = new Map(goals.map(g => [g.id, g.area]));
            items = items.filter(item => {
                if (item.type === 'task' && item.area) {
                    return item.area === filterArea;
                }
                
                let goalId = item.goalId;
                if (!goalId && item.type === 'task' && item.projectId) {
                    const project = projects.find(p => p.id === item.projectId);
                    goalId = project?.goalId;
                }
                const area = goalId ? goalMap.get(goalId) : undefined;
                return area === filterArea;
            });
        }

        return items;
    }, [completedItems, filterType, filterPeriod, filterArea, goals, projects]);
    
    const goalAreas: Area[] = ['Pessoal', 'Profissional', 'Financeiro', 'Saúde e Corpo'];

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-slate-50">Histórico de Conclusões</h1>

            <Card className="mb-6 p-4 flex flex-wrap gap-4 items-center">
                <FilterSelect label="Tipo" value={filterType} onChange={e => setFilterType(e.target.value as FilterType)}>
                    <option value="all">Todos</option>
                    <option value="tasks">Tarefas</option>
                    <option value="projects">Projetos</option>
                </FilterSelect>
                <FilterSelect label="Período" value={filterPeriod} onChange={e => setFilterPeriod(e.target.value as FilterPeriod)}>
                    <option value="all">Todo o período</option>
                    <option value="7d">Últimos 7 dias</option>
                    <option value="30d">Últimos 30 dias</option>
                    <option value="90d">Últimos 90 dias</option>
                </FilterSelect>
                 <FilterSelect label="Área" value={filterArea} onChange={e => setFilterArea(e.target.value as FilterArea)}>
                    <option value="all">Todas as Áreas</option>
                    {goalAreas.map(area => <option key={area} value={area}>{area}</option>)}
                </FilterSelect>
            </Card>

            <div className="space-y-4">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => <HistoryItem key={`${item.type}-${item.id}`} item={item} />)
                ) : (
                    <Card className="text-center py-12">
                        <p className="text-slate-500 dark:text-slate-400">Nenhum item concluído encontrado com os filtros selecionados.</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

const FilterSelect: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }> = ({ label, value, onChange, children }) => (
    <div className="flex flex-col">
        <label className="text-xs text-slate-500 dark:text-slate-300 mb-1">{label}</label>
        <select value={value} onChange={onChange} className="bg-slate-100/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg p-2 text-slate-800 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition">
            {children}
        </select>
    </div>
);


const HistoryItem: React.FC<{ item: (Task & { type: 'task'}) | (Project & { type: 'project' }) }> = ({ item }) => (
    <Card className="p-4 flex items-center justify-between">
        <div className="flex items-center">
            <div className={`p-3 rounded-xl mr-4 ${item.type === 'task' ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300' : 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300'}`}>
                {item.type === 'task' ? <TasksIcon className="h-5 w-5" /> : <ProjectsIcon className="h-5 w-5" />}
            </div>
            <div>
                <p className="font-semibold text-slate-800 dark:text-slate-50">{item.type === 'task' ? item.content : item.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{item.type}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-sm text-slate-600 dark:text-slate-300">{formatDate(item.completedAt)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-500">Concluído</p>
        </div>
    </Card>
);