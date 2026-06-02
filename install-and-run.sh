#!/bin/bash

echo ""
echo "===================================="
echo "Instalando dependências..."
echo "===================================="
echo ""

npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Erro na instalação de dependências"
    exit 1
fi

echo ""
echo "===================================="
echo "Iniciando servidor de desenvolvimento..."
echo "===================================="
echo ""

npm run dev
