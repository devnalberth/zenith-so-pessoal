# ✅ CHECKLIST DE DEPLOY - SIGA ESTA ORDEM

## 📋 PROGRESSO ATUAL

```
✅ PASSO 1: Git Inicializado
   ✅ git init
   ✅ git add .
   ✅ git commit -m "..."
   ✅ 56 arquivos, 9.349 linhas commitadas

⬜ PASSO 2: Criar Repositório GitHub
⬜ PASSO 3: Conectar e Push
⬜ PASSO 4: Deploy no Vercel
⬜ PASSO 5: Testar Site
```

---

## 🎯 PASSO 2: CRIAR REPOSITÓRIO NO GITHUB

### ✅ O QUE FAZER AGORA:

1. **Abra seu navegador**

2. **Cole esta URL:**
   ```
   https://github.com/new
   ```

3. **Preencha:**
   - **Repository name:** `zenith-so-pessoal`
   - **Description:** `Sistema de planejamento pessoal com GTD`
   - **Visibilidade:** Public ou Private (sua escolha)
   - ❌ **NÃO marque** "Add a README file"
   - ❌ **NÃO marque** "Add .gitignore"

4. **Clique:** "Create repository" (botão verde)

5. **COPIE a URL** que aparece na próxima página
   - Exemplo: `https://github.com/SEU_USUARIO/zenith-so-pessoal.git`

---

## 🔗 PASSO 3: CONECTAR E PUSH

### Execute no terminal (substitua SEU_USUARIO):

```bash
cd "/Volumes/NVME 01/zenith---so-pessoal (VSCODE)"

git remote add origin https://github.com/SEU_USUARIO/zenith-so-pessoal.git

git branch -M main

git push -u origin main
```

### ⚠️ Se pedir senha:

**Opção A: GitHub CLI (Recomendado)**
```bash
brew install gh
gh auth login
# Siga as instruções na tela
git push -u origin main
```

**Opção B: Personal Access Token**
1. Crie em: https://github.com/settings/tokens/new
2. Nome: "Vercel Deploy"
3. Expire: 90 days
4. Scope: ✅ repo (marque)
5. Generate token
6. COPIE o token (aparece só uma vez!)
7. Use como senha no git push

---

## 🌐 PASSO 4: DEPLOY NO VERCEL

### 1. Acesse:
```
https://vercel.com/new
```

### 2. Login
- Continue with GitHub
- Autorize o Vercel

### 3. Import Repository
- Procure: `zenith-so-pessoal`
- Clique: "Import"

### 4. Configure (deixe padrão!):
```
Project Name: zenith-so-pessoal
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

### 5. Deploy!
- Clique no botão azul "Deploy"
- Aguarde ~1 minuto
- 🎉 Confetes aparecem!

### 6. Copie a URL:
```
https://zenith-so-pessoal-xyz123.vercel.app
```

---

## ✅ PASSO 5: TESTAR

### Abra a URL e teste:

- [ ] Site carrega
- [ ] ThemeToggle funciona (lua/sol no canto)
- [ ] Criar tarefa funciona
- [ ] Dados persistem ao recarregar
- [ ] Configurações acessíveis
- [ ] Export/Import funciona
- [ ] Mobile responsivo

---

## 🎊 APÓS COMPLETAR TODOS OS PASSOS

### Você terá:

✅ Código no GitHub  
✅ Site online no Vercel  
✅ HTTPS automático  
✅ Deploy automático (push → deploy)  
✅ URL compartilhável  
✅ Analytics grátis  

### Para futuras atualizações:

```bash
# Faça mudanças no código
git add .
git commit -m "Nova feature"
git push

# Deploy automático! 🚀
```

---

<div align="center">

# 🚀 COMECE AGORA!

## Passo 2: Criar Repositório GitHub

**Cole no navegador:**

```
https://github.com/new
```

**Nome do repositório:**

```
zenith-so-pessoal
```

**Depois volte aqui para o Passo 3!**

---

**📖 Guia completo:** `DEPLOY-INTERFACE-WEB.md`

</div>
