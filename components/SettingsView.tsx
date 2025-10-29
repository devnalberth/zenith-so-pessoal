import React, { useRef } from 'react';
import { Card } from './Card';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';

export const SettingsView: React.FC = () => {
  const { exportData, importData, clearAllData } = useApp();
  const { theme, setTheme, effectiveTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      importData(content);
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    exportData();
  };

  const handleClearData = () => {
    clearAllData();
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">Configurações</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-8">
        Personalize sua experiência e gerencie seus dados
      </p>

      {/* Tema */}
      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-50 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          Aparência
        </h2>
        
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Escolha como você quer que o aplicativo apareça
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Light */}
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl border-2 transition-all ${
                theme === 'light'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 mb-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Claro</span>
              </div>
            </button>

            {/* Dark */}
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl border-2 transition-all ${
                theme === 'dark'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 mb-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Escuro</span>
              </div>
            </button>

            {/* System */}
            <button
              onClick={() => setTheme('system')}
              className={`p-4 rounded-2xl border-2 transition-all ${
                theme === 'system'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 mb-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Sistema</span>
              </div>
            </button>
          </div>

          <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <strong>Tema atual:</strong> {effectiveTheme === 'dark' ? 'Escuro' : 'Claro'}
              {theme === 'system' && ' (detectado automaticamente)'}
            </p>
          </div>
        </div>
      </Card>

      {/* Dados */}
      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-50 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
          Gerenciar Dados
        </h2>

        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Faça backup ou restaure seus dados. Todos os dados são salvos localmente no seu navegador.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Exportar */}
            <button
              onClick={handleExport}
              className="glass-button p-4 rounded-2xl flex items-center justify-center space-x-3 hover-lift"
            >
              <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Exportar Dados</span>
            </button>

            {/* Importar */}
            <button
              onClick={handleImport}
              className="glass-button p-4 rounded-2xl flex items-center justify-center space-x-3 hover-lift"
            >
              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Importar Dados</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Limpar Dados */}
          <div className="mt-6 p-4 border-2 border-red-200 dark:border-red-900/50 rounded-2xl bg-red-50 dark:bg-red-900/20">
            <h3 className="font-bold text-red-800 dark:text-red-300 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Zona de Perigo
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
            </p>
            <button
              onClick={handleClearData}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg"
            >
              Limpar Todos os Dados
            </button>
          </div>
        </div>
      </Card>

      {/* Informações */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-50 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Sobre
        </h2>
        
        <div className="space-y-2 text-slate-600 dark:text-slate-300">
          <p><strong>Zenith - SO Pessoal</strong></p>
          <p>Versão: 1.0.0</p>
          <p className="text-sm">
            Um sistema completo de planejamento pessoal com metodologia GTD, integração com IA e design moderno.
          </p>
          <p className="text-sm mt-4 text-slate-500 dark:text-slate-400">
            Feito com ❤️ usando React, TypeScript e Tailwind CSS
          </p>
        </div>
      </Card>
    </div>
  );
};
