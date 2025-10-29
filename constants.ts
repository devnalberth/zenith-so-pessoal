import { Task, Project, Goal } from './types';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const sixMonthsFromNow = new Date();
sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
const twoMonthsFromNow = new Date();
twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

export const INITIAL_TASKS: Task[] = [
  { id: 'task-1', content: 'Revisar o relatório financeiro trimestral', status: 'todo', createdAt: yesterday.toISOString(), priority: 'urgente', endDate: yesterday.toISOString(), area: 'Profissional', startDate: new Date(yesterday.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'task-2', content: 'Comprar passagens para as férias de verão', status: 'todo', projectId: 'proj-3', createdAt: new Date().toISOString(), priority: 'alta', endDate: nextWeek.toISOString(), area: 'Pessoal' },
  { id: 'task-3', content: 'Enviar e-mail para o João sobre a atualização do projeto', status: 'todo', createdAt: new Date().toISOString(), priority: 'delegar', endDate: tomorrow.toISOString(), area: 'Profissional' },
  { id: 'task-4', content: 'Esboçar proposta inicial para o projeto Zenith', status: 'doing', projectId: 'proj-1', createdAt: new Date().toISOString(), priority: 'urgente', endDate: nextWeek.toISOString(), area: 'Profissional' },
  { id: 'task-5', content: 'Aguardar feedback do marketing sobre a nova campanha', status: 'todo', createdAt: new Date().toISOString(), priority: 'alta', area: 'Profissional' },
  { id: 'task-6', content: 'Aprender Espanhol', status: 'todo', createdAt: new Date().toISOString(), priority: 'baixa' },
  { id: 'task-7', content: 'Pesquisar novas oportunidades de investimento', status: 'todo', projectId: 'proj-4', createdAt: new Date().toISOString(), priority: 'alta', endDate: tomorrow.toISOString(), area: 'Financeiro' },
  { id: 'task-8', content: 'Concluir curso de React sobre hooks avançados', status: 'done', projectId: 'proj-2', createdAt: '2023-10-15T10:00:00.000Z', completedAt: today.toISOString(), priority: 'alta', area: 'Profissional' },
  { id: 'task-9', content: 'Definir escopo do app Zenith', status: 'done', projectId: 'proj-1', createdAt: '2023-09-01T10:00:00.000Z', completedAt: yesterday.toISOString(), priority: 'urgente', area: 'Profissional' },
  { id: 'task-10', content: 'Agendar consulta médica de rotina', status: 'todo', createdAt: new Date().toISOString(), priority: 'urgente', endDate: yesterday.toISOString(), area: 'Saúde e Corpo' },
  { id: 'task-11', content: 'Fazer supermercado da semana', status: 'todo', createdAt: new Date().toISOString(), priority: 'normal', endDate: today.toISOString(), area: 'Pessoal' },
  { id: 'task-12', content: 'Finalizar apresentação para reunião de segunda-feira', status: 'done', createdAt: new Date().toISOString(), completedAt: today.toISOString(), priority: 'urgente', endDate: today.toISOString(), area: 'Profissional' },
];

export const INITIAL_PROJECTS: Project[] = [
  { id: 'proj-1', name: 'Lançar Zenith SO Pessoal', description: 'Concluir o desenvolvimento e marketing para o novo aplicativo de produtividade.', status: 'in-progress', goalId: 'goal-1', priority: 'urgente', startDate: yesterday.toISOString(), endDate: sixMonthsFromNow.toISOString() },
  { id: 'proj-2', name: 'Aprimorar Habilidades em Frontend', description: 'Aprofundar conhecimento em React, TypeScript e CSS moderno.', status: 'completed', goalId: 'goal-2', completedAt: '2023-10-28T18:00:00.000Z', priority: 'alta', startDate: '2023-08-01T10:00:00.000Z', endDate: '2023-10-28T18:00:00.000Z' },
  { id: 'proj-3', name: 'Planejar Viagem para a Europa', description: 'Organizar roteiro, reservas e orçamento para uma viagem de 2 semanas.', status: 'not-started', goalId: 'goal-3', priority: 'normal', startDate: nextWeek.toISOString(), endDate: twoMonthsFromNow.toISOString() },
  { id: 'proj-4', name: 'Carteira de Investimentos 2024', description: 'Definir e executar a estratégia de alocação de ativos.', status: 'in-progress', goalId: 'goal-4', priority: 'alta', startDate: new Date(new Date().getFullYear(), 0, 1).toISOString(), endDate: new Date(new Date().getFullYear(), 11, 31).toISOString() },
];

export const INITIAL_GOALS: Goal[] = [
  { id: 'goal-1', name: 'Lançar um Produto SaaS de Sucesso', description: 'Criar e comercializar um produto de software que ajude as pessoas.', area: 'Profissional', deadline: '2024-12-31' },
  { id: 'goal-2', name: 'Tornar-se Engenheiro Frontend Sênior', description: 'Alcançar um nível mais alto de expertise técnica e responsabilidade.', area: 'Profissional', deadline: '2025-06-30' },
  { id: 'goal-3', name: 'Viajar para 3 Novos Países', description: 'Explorar novas culturas e ampliar meus horizontes.', area: 'Pessoal', deadline: '2025-12-31' },
  { id: 'goal-4', name: 'Alcançar Independência Financeira', description: 'Construir um portfólio de investimentos sólido.', area: 'Financeiro', deadline: '2030-01-01' },
];