#!/bin/bash

# 🚀 Script de Deploy Rápido para Vercel
# Zenith - SO Pessoal

echo "🌟 Zenith SO Pessoal - Deploy no Vercel"
echo "========================================"
echo ""

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null
then
    echo "⚠️  Vercel CLI não encontrado!"
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
    echo "✅ Vercel CLI instalado!"
    echo ""
fi

# Verificar se está logado
echo "🔐 Verificando login..."
vercel whoami &> /dev/null

if [ $? -ne 0 ]; then
    echo "⚠️  Você não está logado no Vercel"
    echo "🔑 Fazendo login..."
    vercel login
    echo ""
fi

# Build local para verificar erros
echo "🔨 Testando build localmente..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build! Corrija os erros antes de fazer deploy."
    exit 1
fi

echo "✅ Build local bem-sucedido!"
echo ""

# Perguntar tipo de deploy
echo "Escolha o tipo de deploy:"
echo "1) Preview (teste)"
echo "2) Produção"
read -p "Digite 1 ou 2: " choice

echo ""

case $choice in
    1)
        echo "🚀 Fazendo deploy de preview..."
        vercel
        ;;
    2)
        echo "🚀 Fazendo deploy em PRODUÇÃO..."
        vercel --prod
        ;;
    *)
        echo "❌ Opção inválida. Execute o script novamente."
        exit 1
        ;;
esac

echo ""
echo "✅ Deploy concluído!"
echo "🌐 Acesse o link gerado acima para visualizar seu site."
echo ""
echo "📊 Para ver o dashboard: https://vercel.com/dashboard"
echo ""
