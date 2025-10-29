#!/bin/bash

echo "🚀 Iniciando deploy no Vercel..."
echo ""

cd "/Volumes/NVME 01/zenith---so-pessoal (VSCODE)"

# Fazer deploy respondendo Y para todas as perguntas
vercel --prod << EOF
Y
Y
EOF

echo ""
echo "✅ Deploy concluído!"
echo "🌐 Execute 'vercel list' para ver a URL"
