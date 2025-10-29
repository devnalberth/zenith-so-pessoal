import React, { useState, useMemo } from 'react';
import { Task, Priority, Area } from '../types';
import { Card } from './Card';
import { DonutChart, BarChart } from './charts';
import { CheckIcon, CalendarIcon, SparklesIcon } from './icons';

interface AnalysisViewProps {
    tasks: Task[];
}

type Period = 'week' | 'month' | 'all';

const priorityColors: Record<Priority, string> = {
    'urgente': '#ef4444', // red-500
    'alta': '#f59e0b',    // amber-500
    'normal': '#3b82f6',  // blue-500
    'baixa': '#6b7280',   // gray-500
    'delegar': '#22c55e', // green-500
};

const areaColors: Record<Area, string> = {
    'Profissional': '#8b5cf6', // violet-500
    'Pessoal': '#06b6d4',      // cyan-500
    'Financeiro': '#10b981',   // emerald-500
    'Saúde e Corpo': '#ec4899',   // pink-500
};

const weekDayOrder = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const AnalysisView: React.FC<AnalysisViewProps> = ({ tasks }) => {
    const [period, setPeriod] = useState<Period>('week');

    const completedTasks = useMemo(() => {
        return tasks.filter(t => t.status === 'done' && t.completedAt);
    }, [tasks]);

    const filteredTasks = useMemo(() => {
        if (period === 'all') return completedTasks;
        const now = new Date();
        const daysToFilter = period === 'week' ? 7 : 30;
        const cutoffDate = new Date(now.setDate(now.getDate() - daysToFilter));
        return completedTasks.filter(t => new Date(t.completedAt!) >= cutoffDate);
    }, [completedTasks, period]);

    const stats = useMemo(() => {
        if (filteredTasks.length === 0) {
            return { total: 0, dailyAvg: 0, mostProductiveDay: 'N/A' };
        }

        const completionDates = filteredTasks.map(t => new Date(t.completedAt!).toDateString());
        const uniqueDays = new Set(completionDates).size;
        const total = filteredTasks.length;
        const dailyAvg = total / (uniqueDays || 1);

        const dayCounts = completionDates.reduce((acc, date) => {
            const dayIndex = new Date(date).getDay();
            const dayName = weekDayOrder[dayIndex];
            acc[dayName] = (acc[dayName] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        const mostProductiveDay = Object.keys(dayCounts).reduce((a, b) => dayCounts[a] > dayCounts[b] ? a : b, 'N/A');

        return {
            total,
            dailyAvg: parseFloat(dailyAvg.toFixed(1)),
            mostProductiveDay,
        };
    }, [filteredTasks]);

    const priorityData = useMemo(() => {
        const counts = filteredTasks.reduce((acc, task) => {
            acc[task.priority] = (acc[task.priority] || 0) + 1;
            return acc;
        }, {} as Record<Priority, number>);

        return Object.entries(counts).map(([label, value]) => ({
            label: label.charAt(0).toUpperCase() + label.slice(1),
            value,
            color: priorityColors[label as Priority]
        }));
    }, [filteredTasks]);

    const areaData = useMemo(() => {
        const counts = filteredTasks.reduce((acc, task) => {
            if (task.area) {
                acc[task.area] = (acc[task.area] || 0) + 1;
            }
            return acc;
        }, {} as Record<Area, number>);

        return Object.entries(counts).map(([label, value]) => ({
            label,
            value,
            color: areaColors[label as Area]
        }));
    }, [filteredTasks]);
    
    const dailyCompletionData = useMemo(() => {
        const counts = weekDayOrder.reduce((acc, day) => {
            acc[day] = 0;
            return acc;
        }, {} as Record<string, number>);

        filteredTasks.forEach(task => {
            const dayName = weekDayOrder[new Date(task.completedAt!).getDay()];
            counts[dayName]++;
        });

        return weekDayOrder.map(day => ({ label: day, value: counts[day] }));
    }, [filteredTasks]);

    const statCards = [
        { label: "Total de Tarefas Concluídas", value: stats.total, icon: CheckIcon },
        { label: "Média Diária", value: stats.dailyAvg, icon: SparklesIcon },
        { label: "Dia Mais Produtivo", value: stats.mostProductiveDay, icon: CalendarIcon },
    ];
    
    return (
        <div className="space-y-8 mt-8 animate-fade-in">
            <Card className="p-4">
                <div className="flex items-center justify-center gap-2">
                    <FilterButton period="week" activePeriod={period} setPeriod={setPeriod}>Esta Semana</FilterButton>
                    <FilterButton period="month" activePeriod={period} setPeriod={setPeriod}>Este Mês</FilterButton>
                    <FilterButton period="all" activePeriod={period} setPeriod={setPeriod}>Todo o Período</FilterButton>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map(card => (
                    <Card key={card.label} className="p-5 text-center">
                        <card.icon className="w-8 h-8 mx-auto text-cyan-500 dark:text-cyan-400 mb-3" />
                        <p className="text-3xl font-bold text-slate-800 dark:text-slate-50">{card.value}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{card.label}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 dark:text-slate-50 text-lg mb-4">Conclusões por Prioridade</h3>
                    {priorityData.length > 0 ? <DonutChart data={priorityData} /> : <NoDataMessage />}
                </Card>
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 dark:text-slate-50 text-lg mb-4">Conclusões por Área</h3>
                    {areaData.length > 0 ? <DonutChart data={areaData} /> : <NoDataMessage />}
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-50 text-lg mb-4">Conclusão de Tarefas por Dia da Semana</h3>
                {filteredTasks.length > 0 ? <BarChart data={dailyCompletionData} /> : <NoDataMessage />}
            </Card>
        </div>
    );
};

const FilterButton: React.FC<{ period: Period; activePeriod: Period; setPeriod: (p: Period) => void; children: React.ReactNode }> = 
({ period, activePeriod, setPeriod, children }) => (
    <button
        onClick={() => setPeriod(period)}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
            activePeriod === period
                ? 'bg-slate-900 dark:bg-white/90 text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-white'
        }`}
    >
        {children}
    </button>
);

const NoDataMessage = () => (
    <div className="flex items-center justify-center h-48 text-slate-500 dark:text-slate-500">
        Nenhum dado disponível para o período selecionado.
    </div>
);