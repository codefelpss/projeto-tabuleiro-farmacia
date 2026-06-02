# 🏥 Assistência Farmacêutica - Jogo Educativo Interativo

Um jogo web interativo desenvolvido com **React + TypeScript + Vite**, baseado no tabuleiro educativo de Assistência Farmacêutica.

## 🎮 Funcionalidades

- ✅ **Dado 3D Interativo**: Rotação 3D realista com efeitos visuais
- ✅ **Sistema de Movimento**: Peão se move automaticamente pelas casas do tabuleiro
- ✅ **Questões Dinâmicas**: 4 categorias de perguntas (Verdadeiro/Falso, Pergunta Aberta, Múltipla Escolha, Curiosidade)
- ✅ **Animações Suaves**: Framer Motion para transições profissionais
- ✅ **Responsivo**: Funciona em desktop, tablet e mobile
- ✅ **Sistema de Pontuação**: Rastreamento de acertos e erros

## 📋 Requisitos

- Node.js >= 16.0.0
- npm ou yarn

## 🚀 Instalação e Execução

### 1. Instalar dependências
```bash
npm install
```

### 2. Adicionar a imagem do tabuleiro
A imagem do tabuleiro já está incluída em `src/assets/board.png`. Se desejar usar outra imagem, substitua o arquivo mantendo o mesmo nome.

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

O jogo abrirá automaticamente em `http://localhost:3000`

### 4. Construir para produção
```bash
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Board.tsx              # Tabuleiro principal
│   ├── Board.css              # Estilos do tabuleiro
│   ├── Dice3D.tsx             # Dado 3D
│   ├── Dice3D.css             # Estilos do dado
│   ├── CardDeck.tsx           # Sistema de cartas
│   ├── CardDeck.css           # Estilos das cartas
│   ├── ModalQuestion.tsx      # Modal de questões
│   ├── ModalQuestion.css      # Estilos do modal
│   ├── Pawn.tsx               # Peão do jogo
│   └── Pawn.css               # Estilos do peão
├── data/
│   └── questions.json         # Base de questões
├── assets/
│   └── board.png              # Imagem do tabuleiro
├── App.tsx                    # Componente principal
├── App.css                    # Estilos globais
├── main.tsx                   # Ponto de entrada
├── index.css                  # Estilos base
├── vite.config.ts             # Configuração Vite
├── tsconfig.json              # Configuração TypeScript
└── tsconfig.node.json         # Config TypeScript Node

index.html                      # HTML base
package.json                    # Dependências
```

## 🎯 Como Jogar

1. **Inicie o jogo** - Você começa na casa "INÍCIO"
2. **Clique em "Rolar Dado"** - O dado girará e exibirá um número de 1 a 6
3. **Movimento Automático** - Seu peão (💊) se move automaticamente pelas casas
4. **Responda Perguntas** - Uma carta com a pergunta aparecerá (depende do tipo de casa)
5. **Continuar Jogando** - Após responder, continue rolando o dado até chegar ao final
6. **Vitória** - Quando alcançar a última casa, o jogo termina e exibe seu desempenho

## 🎨 Categorias de Perguntas

- **✓/✗ Verdadeiro ou Falso**: Questões que você deve avaliar como verdadeiras ou falsas
- **📝 Pergunta Aberta**: Questões descritivas com respostas esperadas
- **🎯 Múltipla Escolha**: Questões com 4 alternativas de resposta
- **💡 Curiosidade**: Fatos interessantes sobre farmácia

## 🛠️ Tecnologias

- **React 18**: Framework UI
- **TypeScript**: Tipagem de código
- **Vite**: Build tool rápido
- **Framer Motion**: Animações
- **CSS 3D**: Efeitos 3D do dado

## 📱 Responsividade

O jogo é totalmente responsivo:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔧 Desenvolvimento

Para adicionar novas questões, edite `src/data/questions.json`:

```json
{
  "id": 1,
  "category": "verdadeiro-falso",
  "question": "Sua pergunta aqui",
  "correct": true,
  "alternatives": ["Verdadeiro", "Falso"]
}
```

## 📊 Estatísticas

O jogo rastreia:
- Posição atual no tabuleiro
- Número de acertos
- Total de questões respondidas
- Percentual de acerto final

## ✨ Características Visuais

- Gradientes visuais profissionais
- Efeitos de sombra e profundidade
- Animações suaves em todas as interações
- Sistema de cores intuitivo
- Feedback visual para ações do usuário

## 🎓 Objetivo Educativo

Este jogo foi desenvolvido para auxiliar no aprendizado de conceitos sobre Assistência Farmacêutica de forma interativa e divertida.

## 📝 Licença

Este projeto é de código aberto para fins educacionais.

---

**Desenvolvido com ❤️ para Assistência Farmacêutica**
