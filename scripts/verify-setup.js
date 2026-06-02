#!/usr/bin/env node

/**
 * Script de Verificação do Projeto
 * Verifica se todos os arquivos estão no lugar certo
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requiredFiles = [
  'package.json',
  'index.html',
  'vite.config.ts',
  'tsconfig.json',
  'src/main.tsx',
  'src/App.tsx',
  'src/components/Board.tsx',
  'src/components/Dice3D.tsx',
  'src/components/CardDeck.tsx',
  'src/components/ModalQuestion.tsx',
  'src/components/Pawn.tsx',
  'src/data/questions.json',
];

const requiredDirs = [
  'src',
  'src/components',
  'src/data',
  'src/assets',
];

console.log('\n🔍 Verificando estrutura do projeto...\n');

let allGood = true;

// Verificar diretórios
console.log('📁 Verificando diretórios:');
requiredDirs.forEach((dir) => {
  const dirPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(dirPath)) {
    console.log(`  ✅ ${dir}`);
  } else {
    console.log(`  ❌ ${dir} - FALTANDO`);
    allGood = false;
  }
});

console.log('\n📄 Verificando arquivos:');
requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - FALTANDO`);
    allGood = false;
  }
});

// Verificar imagem do tabuleiro
console.log('\n🖼️  Verificando imagem do tabuleiro:');
const boardImagePath = path.join(__dirname, '..', 'src/assets/board.png');
if (fs.existsSync(boardImagePath)) {
  const stats = fs.statSync(boardImagePath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  console.log(`  ✅ src/assets/board.png (${sizeMB} MB)`);
  
  if (stats.size < 10000) {
    console.log(`  ⚠️  AVISO: A imagem parece ser muito pequena. Substitua por uma imagem válida.`);
    console.log(`     Veja as instruções em: CONFIGURAR_IMAGEM.md`);
  }
} else {
  console.log(`  ❌ src/assets/board.png - FALTANDO`);
  allGood = false;
}

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('✅ Projeto pronto para desenvolvimento!');
  console.log('\n⚡ Para iniciar, execute: npm run dev\n');
} else {
  console.log('❌ Alguns arquivos estão faltando!');
  console.log('\n📝 Execute novamente a instalação do projeto.\n');
  process.exit(1);
}
