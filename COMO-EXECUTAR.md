# 🚀 COMO EXECUTAR - ZENITH SO PESSOAL

## ⚡ Start Rápido

```bash
# 1. Entre na pasta do projeto
cd "/Volumes/NVME 01/zenith---so-pessoal (VSCODE)"

# 2. Instale as dependências (se ainda não instalou)
npm install

# 3. Execute o projeto
npm run dev

# 4. Abra no navegador
# http://localhost:5173
```

---

## 📋 Pré-requisitos

- ✅ Node.js 18+ instalado
- ✅ npm ou yarn
- ✅ Navegador moderno (Chrome, Firefox, Safari, Edge)

---

## 🎯 Primeira Execução

### 1. Verificar se as dependências estão instaladas

```bash
npm install
```

Isso irá instalar:
- React 19.2.0
- React DOM 19.2.0
- TypeScript 5.8.2
- Vite 6.2.0
- Outras dependências de desenvolvimento

### 2. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Você verá algo como:

```
  VITE v6.2.0  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 3. Acessar no navegador

Abra seu navegador e acesse:
```
http://localhost:5173
```

---

## 🎨 Testando as Features da Fase 1

### 1. **Testar Persistência de Dados**

1. Acesse qualquer view (Tarefas, Projetos, Metas)
2. Crie alguns itens
3. **Recarregue a página** (F5 ou Cmd+R)
4. ✅ Os dados devem permanecer!

### 2. **Testar Tema Dark/Light**

**Opção 1: Toggle rápido**
1. Procure o botão de lua/sol no **canto superior direito**
2. Clique para alternar entre dark e light
3. ✅ Transição deve ser suave

**Opção 2: Configurações**
1. Clique no ícone de engrenagem na sidebar (último ícone)
2. Na seção "Aparência", escolha:
   - ☀️ Claro
   - 🌙 Escuro
   - 🖥️ Sistema (detecta automaticamente)
3. ✅ Tema é salvo automaticamente

### 3. **Testar Exportação de Dados**

1. Acesse **Configurações** (ícone de engrenagem)
2. Role até "Gerenciar Dados"
3. Clique em **"Exportar Dados"**
4. ✅ Um arquivo JSON será baixado

Arquivo baixado: `zenith-backup-YYYY-MM-DD.json`

### 4. **Testar Importação de Dados**

1. Em **Configurações**, clique em **"Importar Dados"**
2. Selecione um arquivo JSON válido
3. ✅ Dados são carregados e alerta aparece

### 5. **Testar Efeitos Glass**

1. Observe os cards nas diferentes views
2. Passe o mouse sobre eles
3. ✅ Devem ter efeito de "levitar" (hover-lift)
4. ✅ Background deve ter efeito de vidro fosco

### 6. **Testar Sincronização entre Abas**

1. Com o app aberto, **duplique a aba** (Ctrl+Shift+T)
2. Em uma aba, crie uma tarefa
3. Vá para a outra aba
4. ✅ A tarefa deve aparecer automaticamente!

---

## 🛠️ Comandos Disponíveis

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Servidor fica disponível em http://localhost:5173
# Hot reload ativo - mudanças refletem automaticamente
```

### Build de Produção

```bash
# Criar build otimizado
npm run build

# Arquivos gerados em: dist/
```

### Preview de Produção

```bash
# Após fazer o build, visualize:
npm run preview

# Servidor de preview em http://localhost:4173
```

---

## 🔍 Verificando se está tudo OK

### Checklist de Verificação:

- [ ] Servidor iniciou sem erros
- [ ] Página abre no navegador
- [ ] Tema dark/light funciona
- [ ] Toggle de tema no canto superior direito aparece
- [ ] Cards têm efeito glass (vidro fosco)
- [ ] Criar tarefa funciona
- [ ] Dados persistem após recarregar
- [ ] Exportar dados gera arquivo JSON
- [ ] Configurações abre e funciona

Se todos os itens acima funcionarem, está tudo OK! ✅

---

## 🐛 Resolução de Problemas

### Problema: Porta 5173 já está em uso

**Solução:**
```bash
# O Vite automaticamente usa a próxima porta disponível
# Ou você pode especificar uma porta:
npm run dev -- --port 3000
```

### Problema: Tema não muda

**Solução:**
1. Abra o DevTools (F12)
2. Vá em Console
3. Procure por erros relacionados a "theme"
4. Limpe o cache: Ctrl+Shift+Delete (ou Cmd+Shift+Delete)
5. Recarregue a página

### Problema: Dados não persistem

**Solução:**
1. Abra DevTools (F12)
2. Vá em Application → Local Storage
3. Procure por: `zenith-tasks`, `zenith-projects`, `zenith-goals`
4. Se não aparecerem, verifique se localStorage está habilitado
5. Tente em modo anônimo para testar

### Problema: Estilos glass não aparecem

**Solução:**
1. Verifique se `index.css` está sendo importado
2. Limpe o cache do navegador
3. Force reload: Ctrl+Shift+R (ou Cmd+Shift+R)
4. Verifique se os arquivos CSS estão na pasta `styles/`

### Problema: Erro de compilação TypeScript

**Solução:**
```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install

# Se ainda houver erro, limpe cache do Vite
rm -rf node_modules/.vite
npm run dev
```

---

## 📱 Testando em Diferentes Dispositivos

### Desktop
✅ Testado e funcionando

### Tablet
⚠️ Responsividade básica implementada
🚧 Melhorias planejadas para Fase 5

### Mobile
⚠️ Responsividade básica implementada
🚧 Sidebar móvel planejada para Fase 5

---

## 🌐 Navegadores Suportados

### ✅ Totalmente Suportado:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### ⚠️ Suporte Parcial:
- Chrome 80-89 (sem backdrop-filter)
- Firefox 80-87 (sem backdrop-filter)

### ❌ Não Suportado:
- Internet Explorer (qualquer versão)
- Opera Mini
- Navegadores muito antigos

---

## 💾 Dados e LocalStorage

### O que é salvo:

| Chave | Conteúdo | Tamanho Médio |
|-------|----------|---------------|
| `zenith-tasks` | Array de tarefas | ~5KB |
| `zenith-projects` | Array de projetos | ~3KB |
| `zenith-goals` | Array de metas | ~2KB |
| `zenith-theme` | Tema escolhido | <1KB |

### Limite do LocalStorage:
- **Máximo:** ~5-10MB (varia por navegador)
- **Uso atual:** ~10KB
- **Espaço livre:** ~99.8% 🎉

---

## 🚀 Dicas de Performance

### Durante Desenvolvimento:

1. **Hot Reload é automático**
   - Salve o arquivo
   - Vite recarrega instantaneamente
   - Não precisa recarregar manualmente

2. **DevTools aberto consome recursos**
   - Feche quando não precisar
   - Use com parcimônia

3. **Múltiplas abas abertas**
   - Sincronização funciona
   - Mas consume mais memória

### Para Build de Produção:

```bash
# Build otimizado
npm run build

# Arquivos minificados em dist/
# Tamanho típico: ~150-200KB (gzipped)
```

---

## 📊 Estrutura de Arquivos Importante

```
zenith---so-pessoal/
├── index.html          # Entry point
├── index.tsx           # React entry (com Providers)
├── App.tsx             # Componente principal
├── index.css           # Estilos globais
├── components/         # Todos os componentes
├── contexts/           # Context API
├── hooks/              # Custom hooks
├── styles/             # CSS customizados
├── utils/              # Utilitários
└── types.ts            # Tipos TypeScript
```

---

## 🎓 Próximos Passos Após Executar

1. ✅ **Familiarize-se com a interface**
   - Navegue pelas diferentes views
   - Crie algumas tarefas de teste
   - Experimente o tema dark/light

2. ✅ **Teste todas as funcionalidades**
   - Use o checklist de verificação acima
   - Reporte qualquer problema encontrado

3. ✅ **Leia a documentação**
   - `REFERENCIA-RAPIDA.md` - Como usar
   - `ROADMAP-COMPLETO.md` - Próximas features
   - `RELATORIO-FASE1.md` - O que foi implementado

4. 🚧 **Aguarde a Fase 2**
   - Sistema GTD completo
   - Subtarefas e tags
   - Dashboard com gráficos

---

## 📞 Suporte

### Documentação:
- 📖 `FASE1-COMPLETA.md` - Resumo da Fase 1
- 📖 `REFERENCIA-RAPIDA.md` - Guia rápido
- 📖 `ROADMAP-COMPLETO.md` - Roadmap completo
- 📖 `RELATORIO-FASE1.md` - Relatório detalhado

### Em caso de problemas:
1. Verifique a seção "Resolução de Problemas" acima
2. Consulte a documentação
3. Verifique o console do navegador (F12)

---

<div align="center">

# 🎉 Pronto para Começar!

Execute `npm run dev` e explore o **Zenith SO Pessoal**

**Fase 1 Completa** • **MVP em Desenvolvimento**

---

```bash
npm run dev
```

**↑ Execute este comando e divirta-se! ↑**

</div>
