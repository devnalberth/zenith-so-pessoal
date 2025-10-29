import React, { useState, useEffect } from 'react';
import { Goal, Area } from '../types';

const FormField: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
    <div className={`flex flex-col ${className || ''}`}>
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">{label}</label>
        {React.cloneElement(children as React.ReactElement<any>, {
            className: 'w-full h-11 px-4 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-sm transition-all duration-200 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 outline-none text-slate-900 dark:text-white'
        })}
    </div>
);

export interface AddGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    addGoal: (newGoalData: Omit<Goal, 'id'>) => void;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, addGoal }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState<Area>('Pessoal');
    const [deadline, setDeadline] = useState('');

    const resetForm = () => {
        setName('');
        setDescription('');
        setArea('Pessoal');
        setDeadline('');
    };

    useEffect(() => {
        if (!isOpen) {
            setTimeout(resetForm, 300);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) return;

        addGoal({
            name,
            description,
            area,
            deadline: deadline || undefined,
        });

        onClose();
    };
    
    if (!isOpen) return null;

    const goalAreas: Area[] = ['Pessoal', 'Profissional', 'Financeiro', 'Saúde e Corpo'];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/30 dark:bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-slate-50/90 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl w-full max-w-2xl p-8 m-4" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">Criar Nova Meta</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full h-11 px-4 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-lg transition-all duration-200 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 outline-none placeholder-slate-400 text-slate-900 dark:text-white"
                        placeholder="Nome da Meta"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <textarea
                        className="w-full h-24 p-4 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-sm transition-all duration-200 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 outline-none placeholder-slate-400 text-slate-900 dark:text-white resize-none"
                        placeholder="Descrição da Meta"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Área">
                            <select value={area} onChange={e => setArea(e.target.value as Area)}>
                                {goalAreas.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </FormField>
                         <FormField label="Prazo Final">
                            <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
                        </FormField>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">Cancelar</button>
                        <button type="submit" className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-500/80 dark:hover:bg-cyan-500 rounded-lg text-white font-semibold transition-colors">Salvar Meta</button>
                    </div>
                </form>
            </div>
        </div>
    );
};