# 🚀 Deploy no GitHub Pages - Guia Completo

## ✅ O que foi configurado

1. **vite.config.ts** - Configurado com base path correto
2. **GitHub Actions Workflow** - Deploy automático em cada push
3. **Scripts npm** - Comandos de build e preview

---

## 📋 Passo a Passo (5 minutos)

### 1️⃣ Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. **Repository name**: `zenith---so-pessoal`
3. **Visibility**: Public (necessário para GitHub Pages grátis)
4. **NÃO** marque "Initialize with README"
5. Clique em **Create repository**

---

### 2️⃣ Conectar e Fazer Push

No terminal do VS Code, execute:

```bash
# Adicionar remote (substitua SEU-USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU-USUARIO/zenith---so-pessoal.git

# Renomear branch para main (se necessário)
git branch -M main

# Fazer push
git push -u origin main
```

**⚠️ IMPORTANTE**: Na primeira vez, o GitHub vai pedir suas credenciais.

---

### 3️⃣ Ativar GitHub Pages

1. No seu repositório no GitHub, vá em **Settings**
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione:
   - **Source**: GitHub Actions
4. Pronto! Não precisa fazer mais nada

---

### 4️⃣ Acompanhar o Deploy

1. Vá na aba **Actions** do seu repositório
2. Você verá o workflow "Deploy to GitHub Pages" rodando
3. Aguarde ~2-3 minutos até ficar verde ✅
4. Seu site estará disponível em:

```
https://SEU-USUARIO.github.io/zenith---so-pessoal/
```

---

## 🔄 Atualizações Futuras

Toda vez que você fizer push para `main`, o site será atualizado automaticamente:

```bash
git add .
git commit -m "feat: nova funcionalidade"
git push
```

---

## 🆘 Troubleshooting

### ❌ Erro 404 ao acessar o site

**Problema**: O `base` no vite.config.ts está errado

**Solução**: Verifique se o nome do repositório está correto:
```typescript
base: '/nome-exato-do-repositorio/'
```

### ❌ Página em branco

**Problema**: Erro no caminho dos assets

**Solução**: Verifique o console do navegador e confirme o `base` no vite.config.ts

### ❌ Workflow falhou

**Problema**: Erro no build

**Solução**: 
1. Vá na aba Actions
2. Clique no workflow que falhou
3. Veja os logs para identificar o erro
4. Corrija localmente e faça push novamente

### ❌ GitHub Pages não aparece nas configurações

**Problema**: Repositório privado

**Solução**: GitHub Pages grátis só funciona com repositórios públicos

---

## 🎯 Checklist Rápido

- [ ] Repositório criado no GitHub (público)
- [ ] Git remote configurado
- [ ] Push realizado (`git push -u origin main`)
- [ ] GitHub Pages ativado (Settings > Pages > Source: GitHub Actions)
- [ ] Workflow rodou com sucesso (aba Actions)
- [ ] Site acessível em `https://SEU-USUARIO.github.io/zenith---so-pessoal/`

---

## 💡 Dicas

### Testar Localmente Antes

```bash
npm run build
npm run preview
```

Acesse http://localhost:4173/zenith---so-pessoal/

### Ver Logs em Tempo Real

```bash
# Acompanhar o status do último workflow
gh run watch
```

(Requer GitHub CLI: `brew install gh`)

### Custom Domain (Opcional)

Se você tiver um domínio:

1. Adicione o arquivo `CNAME` na pasta `public/`:
   ```
   seudominio.com
   ```

2. Configure no seu provedor de DNS:
   ```
   A Record: 185.199.108.153
   A Record: 185.199.109.153
   A Record: 185.199.110.153
   A Record: 185.199.111.153
   ```

---

## 📊 Vantagens do GitHub Pages

✅ **Grátis** - 100% gratuito  
✅ **Automático** - Deploy em cada push  
✅ **Rápido** - CDN global  
✅ **HTTPS** - SSL/TLS incluído  
✅ **Simples** - Sem configurações complexas  
✅ **Confiável** - Infraestrutura do GitHub  

---

## 🔗 Links Úteis

- [Documentação GitHub Pages](https://docs.github.com/pages)
- [GitHub Actions](https://docs.github.com/actions)
- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)

---

**Pronto para começar!** 🎉

Execute os comandos acima e em 5 minutos seu site estará no ar!
