# 🚀 Comandos para Deploy - GitHub Pages

## 📋 Cole estes comandos no terminal

### 1️⃣ Verificar status do Git

```bash
git status
```

---

### 2️⃣ Adicionar remote do GitHub

**⚠️ SUBSTITUA `SEU-USUARIO` pelo seu username do GitHub!**

```bash
git remote add origin https://github.com/SEU-USUARIO/zenith---so-pessoal.git
```

---

### 3️⃣ Verificar se o remote foi adicionado

```bash
git remote -v
```

Você deve ver algo como:
```
origin  https://github.com/SEU-USUARIO/zenith---so-pessoal.git (fetch)
origin  https://github.com/SEU-USUARIO/zenith---so-pessoal.git (push)
```

---

### 4️⃣ Renomear branch para main

```bash
git branch -M main
```

---

### 5️⃣ Fazer o primeiro push

```bash
git push -u origin main
```

**📝 Nota**: Na primeira vez, o GitHub pode pedir suas credenciais:
- Username: seu username do GitHub
- Password: use um **Personal Access Token** (não a senha da conta)

---

## 🔐 Se pedir senha, crie um Token

1. Acesse: https://github.com/settings/tokens
2. Clique em **Generate new token (classic)**
3. Nome: `Zenith Deploy`
4. Marque: `repo` (todos os checkboxes)
5. Clique em **Generate token**
6. **COPIE O TOKEN** (você não verá de novo!)
7. Use como senha no terminal

---

## ✅ Depois do Push

1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Pages**
3. Em **Source**, selecione: **GitHub Actions**
4. Aguarde ~2-3 minutos
5. Seu site estará em: `https://SEU-USUARIO.github.io/zenith---so-pessoal/`

---

## 🔄 Para atualizações futuras

```bash
# Adicionar mudanças
git add .

# Commit
git commit -m "feat: descrição da mudança"

# Push (deploy automático)
git push
```

---

## 🆘 Resolução de Problemas

### ❌ Erro: "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/zenith---so-pessoal.git
```

### ❌ Erro: "authentication failed"

Use um Personal Access Token em vez da senha da conta.

### ❌ Erro: "Repository not found"

Verifique se:
1. O repositório existe no GitHub
2. Você está usando o nome correto
3. O repositório é público

---

## 💡 Dica: Testar Localmente Primeiro

Antes de fazer push, teste localmente:

```bash
npm run build
npm run preview
```

Acesse: http://localhost:4173/zenith---so-pessoal/

Se funcionar localmente, funcionará no GitHub Pages!

---

**Pronto! Cole os comandos acima e seu site estará no ar em minutos! 🎉**
