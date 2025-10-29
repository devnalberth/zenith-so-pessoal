# 🚀 FASE 1 - REFERÊNCIA RÁPIDA

## ✅ Arquivos Criados

### Contexts
- ✅ `contexts/AppContext.tsx` - Estado global (tarefas, projetos, metas)
- ✅ `contexts/ThemeContext.tsx` - Gerenciamento de tema

### Hooks
- ✅ `hooks/useLocalStorage.ts` - Persistência com localStorage

### Utilitários
- ✅ `utils/storage.ts` - Importação/Exportação de dados

### Componentes
- ✅ `components/ThemeToggle.tsx` - Toggle de tema animado
- ✅ `components/SettingsView.tsx` - Tela de configurações
- ✅ `components/GlassCard.tsx` - Card com variantes glass

### Estilos
- ✅ `styles/glass.css` - Efeitos glassmorphism
- ✅ `styles/animations.css` - Animações reutilizáveis
- ✅ `index.css` - Estilos globais

### Documentação
- ✅ `FASE1-COMPLETA.md` - Resumo da Fase 1

---

## 📦 Como Usar os Contexts

### AppContext (Estado Global)

```tsx
import { useApp } from './contexts/AppContext';

function MeuComponente() {
  const {
    tasks,
    projects,
    goals,
    goalsWithProgress,
    addTask,
    updateTask,
    deleteTask,
    addProject,
    updateProject,
    deleteProject,
    addGoal,
    updateGoal,
    deleteGoal,
    exportData,
    importData,
    clearAllData,
  } = useApp();

  return <div>...</div>;
}
```

### ThemeContext (Tema)

```tsx
import { useTheme } from './contexts/ThemeContext';

function MeuComponente() {
  const { theme, effectiveTheme, setTheme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Tema atual: {effectiveTheme}
    </button>
  );
}
```

---

## 🎨 Classes CSS Disponíveis

### Glass Effects

```html
<!-- Glass padrão -->
<div class="glass-card rounded-3xl p-6">...</div>

<!-- Glass light (mais transparente) -->
<div class="glass-light rounded-3xl p-6">...</div>

<!-- Glass strong (mais opaco) -->
<div class="glass-strong rounded-3xl p-6">...</div>

<!-- Liquid glass (com gradiente) -->
<div class="liquid-glass rounded-3xl p-6">...</div>

<!-- Frosted glass (vidro fosco) -->
<div class="frosted-glass rounded-3xl p-6">...</div>
```

### Botões Glass

```html
<button class="glass-button px-6 py-3 rounded-xl">
  Clique aqui
</button>
```

### Animações

```html
<!-- Fade In -->
<div class="animate-fade-in">...</div>

<!-- Slide Up -->
<div class="animate-slide-up">...</div>

<!-- Scale In -->
<div class="animate-scale-in">...</div>

<!-- Float (flutuar) -->
<div class="animate-float">...</div>

<!-- Glow (brilho pulsante) -->
<div class="animate-glow">...</div>

<!-- Pulse Soft -->
<div class="animate-pulse-soft">...</div>

<!-- Shimmer (brilho deslizante) -->
<div class="shimmer">...</div>
```

### Hover Effects

```html
<!-- Levanta no hover -->
<div class="hover-lift">...</div>

<!-- Brilha no hover -->
<div class="hover-glow">...</div>
```

### Transições

```html
<!-- Transição suave -->
<div class="transition-smooth">...</div>

<!-- Transição rápida -->
<div class="transition-fast">...</div>

<!-- Transição lenta -->
<div class="transition-slow">...</div>
```

---

## 🎨 Usando GlassCard Component

```tsx
import { GlassCard } from './components/GlassCard';

// Card padrão
<GlassCard>
  Conteúdo
</GlassCard>

// Com variante
<GlassCard variant="liquid">
  Conteúdo com gradiente
</GlassCard>

// Com hover e shimmer
<GlassCard variant="glass" hover shimmer>
  Card interativo
</GlassCard>

// Sem hover effect
<GlassCard hover={false}>
  Card estático
</GlassCard>

// Com click handler
<GlassCard onClick={() => console.log('Clicado!')}>
  Card clicável
</GlassCard>
```

### Variantes Disponíveis:
- `glass` - Padrão, balanceado
- `frosted` - Vidro fosco com mais blur
- `liquid` - Com gradiente animado no hover

---

## 💾 Persistência de Dados

### Usando useLocalStorage

```tsx
import { useLocalStorage } from './hooks/useLocalStorage';

function MeuComponente() {
  const [nome, setNome] = useLocalStorage('user-name', 'Anônimo');

  return (
    <input 
      value={nome}
      onChange={(e) => setNome(e.target.value)}
    />
  );
}
```

### Exportar Dados

```tsx
import { useApp } from './contexts/AppContext';

function MeuComponente() {
  const { exportData } = useApp();

  return (
    <button onClick={exportData}>
      Exportar Backup
    </button>
  );
}
```

### Importar Dados

```tsx
import { useApp } from './contexts/AppContext';

function MeuComponente() {
  const { importData } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      importData(content);
    };
    reader.readAsText(file);
  };

  return (
    <>
      <input 
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        hidden
      />
      <button onClick={() => fileInputRef.current?.click()}>
        Importar Backup
      </button>
    </>
  );
}
```

---

## 🌓 Gerenciamento de Tema

### Opções de Tema:
- `light` - Tema claro
- `dark` - Tema escuro
- `system` - Detecta automaticamente do sistema

### Como Usar:

```tsx
import { useTheme } from './contexts/ThemeContext';

function SeletorTema() {
  const { theme, setTheme, effectiveTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
      
      <p>Tema atual: {effectiveTheme}</p>
    </div>
  );
}
```

### Toggle Rápido:

```tsx
import { useTheme } from './contexts/ThemeContext';

function ToggleRapido() {
  const { toggleTheme, effectiveTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {effectiveTheme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
```

---

## 🎯 Paleta de Cores

### Light Mode
```css
background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
cards: rgba(255, 255, 255, 0.7);
text: #0f172a;
```

### Dark Mode
```css
background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
cards: rgba(15, 23, 42, 0.5);
text: #f1f5f9;
```

### Accent Colors
```css
indigo: #6366f1
purple: #a855f7
pink: #ec4899
emerald: #10b981
blue: #3b82f6
```

---

## 🚀 Comandos Úteis

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

---

## 📋 Checklist de Funcionalidades

### ✅ Implementado
- [x] Persistência de dados com localStorage
- [x] Context API para estado global
- [x] Sistema de tema Dark/Light/System
- [x] Toggle de tema animado
- [x] Efeitos glassmorphism
- [x] Animações e transições
- [x] Exportação de dados (JSON)
- [x] Importação de dados
- [x] Limpeza de dados
- [x] Tela de configurações
- [x] Scrollbar customizado
- [x] Selection customizada
- [x] Focus visible para acessibilidade

### 🚧 Próximas Fases
- [ ] Chat com IA (Gemini)
- [ ] Sistema GTD completo
- [ ] Subtarefas
- [ ] Tags customizadas
- [ ] Drag-and-drop
- [ ] Gráficos de produtividade
- [ ] Módulos específicos
- [ ] Framer Motion
- [ ] PWA

---

## 🐛 Troubleshooting

### Dados não estão sendo salvos?
- Verifique se o localStorage está habilitado no navegador
- Abra o DevTools → Application → Local Storage
- Procure por chaves: `zenith-tasks`, `zenith-projects`, `zenith-goals`, `zenith-theme`

### Tema não está mudando?
- Verifique se o ThemeProvider está envolvendo o App no `index.tsx`
- Abra o console e procure por erros
- Verifique se as classes `dark` estão sendo aplicadas no `<html>`

### Estilos glass não aparecem?
- Verifique se o `index.css` está sendo importado no `index.html`
- Confirme que os arquivos CSS estão na pasta `styles/`
- Limpe o cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R)

---

## 💡 Dicas

1. **Use sempre o Context API** para acessar dados globais
2. **Prefira classes CSS** em vez de estilos inline
3. **Use GlassCard** para consistência visual
4. **Adicione animações** com as classes prontas
5. **Exporte dados regularmente** para backup

---

## 📚 Referências

- [React Context API](https://react.dev/reference/react/useContext)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [CSS Backdrop Filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)

---

<div align="center">

**🎉 Fase 1 Completa - Sistema Fundacional Estabelecido! 🎉**

*Pronto para iniciar a Fase 2*

</div>
