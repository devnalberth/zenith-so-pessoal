import React, { useState, useEffect } from 'react';
import { Project, Goal, Priority } from '../types';

const FormField: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
    <div className={`flex flex-col ${className || ''}`}>
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">{label}</label>
        {React.cloneElement(children as React.ReactElement<any>, {
            className: 'w-full h-11 px-4 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-sm transition-all duration-200 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 outline-none text-slate-900 dark:text-white disabled:bg-slate-100/50 dark:disabled:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50'
        })}
    </div>
);

export interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    addProject: (newProjectData: Omit<Project, 'id' | 'completedAt'>) => void;
    goals: Goal[];
    initialData?: Partial<Pick<Project, 'goalId'>>;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, addProject, goals, initialData }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<Project['status']>('not-started');
    const [priority, setPriority] = useState<Priority>('normal');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [goalId, setGoalId] = useState(initialData?.goalId || '');

    const resetForm = () => {
        setName('');
        setDescription('');
        setStatus('not-started');
        setPriority('normal');
        setStartDate('');
        setEndDate('');
        setGoalId(initialData?.goalId || '');
    };

    useEffect(() => {
        if (isOpen) {
            setGoalId(initialData?.goalId || '');
        } else {
            setTimeout(resetForm, 300);
        }
    }, [isOpen, initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) return;

        addProject({
            name,
            description,
            status,
            priority,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            goalId: goalId || undefined,
        });

        onClose();
    };
    
    if (!isOpen) return null;

    const priorities: { id: Priority, label: string }[] = [
        { id: 'baixa', label: '0 - Baixa' },
        { id: 'normal', label: '1 - Normal' },
        { id: 'alta', label: '2 - Alta' },
        { id: 'urgente', label: '3 - Urgente' },
        { id: 'delegar', label: '4 - Delegar' },
    ];
    
    const isContextLocked = !!initialData?.goalId;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/30 dark:bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-slate-50/90 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl w-full max-w-2xl p-8 m-4" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">Criar Novo Projeto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full h-11 px-4 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-lg transition-all duration-200 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 outline-none placeholder-slate-400 text-slate-900 dark:text-white"
                        placeholder="Nome do Projeto"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <textarea
                        className="w-full h-24 p-4 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-sm transition-all duration-200 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 outline-none placeholder-slate-400 text-slate-900 dark:text-white resize-none"
                        placeholder="Descrição do Projeto"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Status">
                            <select value={status} onChange={e => setStatus(e.target.value as Project['status'])}>
                                <option value="not-started">Não Iniciado</option>
                                <option value="in-progress">Em Progresso</option>
                                <option value="completed">Concluído</option>
                            </select>
                        </FormField>
                         <FormField label="Prioridade">
                            <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
                                {priorities.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                            </select>
                        </FormField>
                         <FormField label="Data de Início">
                            <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        </FormField>
                         <FormField label="Data de Término">
                            <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} />
                        </FormField>
                        <FormField label="Meta Associada" className="md:col-span-2">
                             <select value={goalId} onChange={e => setGoalId(e.target.value)} disabled={isContextLocked}>
                                <option value="">Nenhuma</option>
                                {goals.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                            </select>
                        </FormField>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">Cancelar</button>
                        <button type="submit" className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-500/80 dark:hover:bg-cyan-500 rounded-lg text-white font-semibold transition-colors">Salvar Projeto</button>
                    </div>
                </form>
            </div>
        </div>
    );
};