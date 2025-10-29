# 🌟 Zenith - SO Pessoal

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

### Sistema Completo de Planejamento Pessoal

Um aplicativo moderno e completo para gerenciar metas, projetos e tarefas usando metodologia GTD, com design Liquid Glass e integração com IA.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)](https://vitejs.dev/)

</div>

---

## ✅ FASE 1 COMPLETA! 

### 🎉 O que foi implementado:

#### 1. **Sistema de Persistência de Dados** ✅
- ✅ Hook `useLocalStorage` com sincronização entre abas
- ✅ Context API com `AppContext` e `ThemeContext`
- ✅ Persistência automática de tarefas, projetos e metas
- ✅ Exportação/Importação de dados em JSON
- ✅ Função de limpeza de dados

#### 2. **Sistema de Tema Dark/Light** ✅
- ✅ ThemeProvider com suporte a Light/Dark/System
- ✅ Componente ThemeToggle animado (canto superior direito)
- ✅ Detecção automática de preferência do sistema
- ✅ Transições suaves entre temas
- ✅ Persistência do tema escolhido

#### 3. **Design Liquid Glass Refinado** ✅
- ✅ Arquivo `glass.css` com classes reutilizáveis
- ✅ Componentes Card e GlassCard
- ✅ Efeitos de backdrop-blur e saturação
- ✅ Variantes: glass, glass-light, glass-strong, liquid-glass
- ✅ Scrollbar customizado
- ✅ Efeitos hover e shimmer

#### 4. **Animações e Transições** ✅
- ✅ Arquivo `animations.css` com animações prontas
- ✅ fadeIn, slideUp, slideDown, scaleIn
- ✅ float, pulse, glow, shimmer
- ✅ Hover effects (lift, glow)
- ✅ Stagger children animation

#### 5. **Tela de Configurações Completa** ✅
- ✅ Interface de configurações com glass effect
- ✅ Seletor visual de tema (Light/Dark/System)
- ✅ Gerenciamento de dados (exportar/importar/limpar)
- ✅ Informações sobre o aplicativo
- ✅ Zona de perigo para limpar dados

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+

### Passos

1. **Instale as dependências**
```bash
npm install
```

2. **Execute o projeto**
```bash
npm run dev
```

3. **Acesse no navegador**
```
http://localhost:5173
```

---

## 📁 Estrutura Criada (Fase 1)

```
zenith---so-pessoal/
├── components/
│   ├── GlassCard.tsx         # ✨ NOVO - Card com efeitos glass
│   ├── SettingsView.tsx      # ✨ NOVO - Tela de configurações
│   ├── ThemeToggle.tsx       # ✨ NOVO - Toggle de tema
│   ├── Card.tsx              # ✅ ATUALIZADO - Com variantes
│   └── ...
├── contexts/                 # ✨ NOVO - Contexts React
│   ├── AppContext.tsx        # Estado global da aplicação
│   └── ThemeContext.tsx      # Gerenciamento de tema
├── hooks/
│   ├── useLocalStorage.ts    # ✨ NOVO - Hook de localStorage
│   └── usePomodoro.ts
├── styles/                   # ✨ NOVO - Estilos customizados
│   ├── glass.css             # Efeitos glassmorphism
│   └── animations.css        # Animações e transições
├── utils/                    # ✨ NOVO - Utilitários
│   └── storage.ts            # Funções de import/export
├── App.tsx                   # ✅ ATUALIZADO - Com contexts
├── index.tsx                 # ✅ ATUALIZADO - Com Providers
├── index.css                 # ✨ NOVO - Estilos globais
└── ...
```

---

## 🎨 Como Usar

### 1. **Alternar Tema**
- Clique no botão de lua/sol no **canto superior direito**
- Ou vá em **Configurações** e escolha entre:
  - ☀️ **Light** - Tema claro
  - 🌙 **Dark** - Tema escuro
  - 🖥️ **System** - Detecta automaticamente

### 2. **Exportar/Importar Dados**
- Acesse **Configurações** (ícone de engrenagem na sidebar)
- Clique em **Exportar Dados** para fazer backup
- Use **Importar Dados** para restaurar de um backup

### 3. **Usar Classes Glass**
```tsx
import { GlassCard } from './components/GlassCard';

<GlassCard variant="liquid" hover shimmer>
  Conteúdo aqui
</GlassCard>
```

---

## 🎨 Classes CSS Disponíveis

### Glass Effects
```css
.glass-card         /* Glass padrão */
.glass-light        /* Mais transparente */
.glass-strong       /* Mais opaco */
.liquid-glass       /* Com gradiente animado */
.frosted-glass      /* Vidro fosco */
```

### Animações
```css
.animate-fade-in
.animate-slide-up
.animate-scale-in
.animate-float
.animate-glow
.animate-pulse-soft
```

### Hover Effects
```css
.hover-lift         /* Levanta no hover */
.hover-glow         /* Brilha no hover */
```

---

## 🗺 Próximas Fases

### **Fase 2: Features Core** (Próxima)
- [ ] Sistema GTD completo (Inbox, Next Actions)
- [ ] Subtarefas e dependências
- [ ] Tags customizadas
- [ ] Filtros avançados
- [ ] Drag-and-drop
- [ ] Dashboard com gráficos (recharts)

### **Fase 3: Integração com IA**
- [ ] Chat com Gemini API
- [ ] Sugestões inteligentes
- [ ] Auto-categorização
- [ ] Análise de produtividade

### **Fase 4: Módulos Específicos**
- [ ] Financeiro completo
- [ ] Estudos e flashcards
- [ ] Treinos e saúde
- [ ] Planejador de viagens

### **Fase 5: Polimento**
- [ ] Framer Motion para animações avançadas
- [ ] Responsividade total mobile
- [ ] Acessibilidade (A11y)
- [ ] PWA (Progressive Web App)

---

## 💡 Notas Técnicas

### Persistência de Dados
- Todos os dados são salvos automaticamente no **localStorage**
- Sincronização automática entre abas/janelas
- Exportação em formato JSON compatível

### Tema
- Preferência do sistema detectada via `matchMedia`
- Transições CSS suaves (200ms)
- Classes aplicadas no elemento `<html>`

### Performance
- React Context otimizado com useMemo
- Transições CSS (não JS) para melhor performance
- Lazy loading preparado para próximas fases

---

## 🎯 Melhorias da Fase 1

✅ **Antes:** Estado local sem persistência  
✅ **Depois:** Persistência automática com localStorage

✅ **Antes:** Sem gerenciamento de tema  
✅ **Depois:** Sistema completo Dark/Light/System

✅ **Antes:** Estilos inline e Tailwind puro  
✅ **Depois:** Sistema de classes reutilizáveis com liquid glass

✅ **Antes:** Sem backup de dados  
✅ **Depois:** Exportação/Importação completa

✅ **Antes:** Sem configurações  
✅ **Depois:** Tela de configurações profissional

---

## 📝 Link do AI Studio

View your app in AI Studio: https://ai.studio/apps/drive/11U8BjjCfPySTqnDpw4e4qhGjQYpQ3S5j

---

<div align="center">

**Feito com ❤️ usando React, TypeScript e Tailwind CSS**

⭐ **Fase 1 Completa - Fundação Sólida Estabelecida!** ⭐

*Pronto para Fase 2: Features Core*

</div>
