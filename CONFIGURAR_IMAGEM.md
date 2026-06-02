# 🖼️ CONFIGURAÇÃO DA IMAGEM DO TABULEIRO

## ⚠️ IMPORTANTE: Substitua a imagem placeholder

A imagem atual em `src/assets/board.png` é apenas um placeholder. Você precisa substituir pela imagem real do tabuleiro.

## 📋 Passo a Passo

### Opção 1: Substituição Manual (Recomendado)

1. **Salve a imagem do tabuleiro em seu computador**
   - Copie a imagem enviada para uma pasta
   - Certifique-se que o arquivo é um PNG válido

2. **Substitua o arquivo**
   - Navegue até: `src/assets/`
   - Exclua o arquivo `board.png` existente
   - Cole a nova imagem `board.png` nesta pasta

3. **Pronto!**
   - O jogo carregará automaticamente a nova imagem

### Opção 2: Via Terminal

```bash
# Se você tem a imagem em um caminho específico:
# Windows:
copy "C:\caminho\para\sua\imagem.png" "src\assets\board.png"

# Mac/Linux:
cp /caminho/para/sua/imagem.png src/assets/board.png
```

## 🎨 Requisitos da Imagem

- **Formato**: PNG, JPG ou WebP
- **Tamanho recomendado**: Entre 800x600 e 1400x1000px
- **Proporção**: Aproximadamente 4:3
- **Qualidade**: Imagem clara e nítida

## ✅ Verificar se funcionou

1. Execute `npm run dev`
2. A imagem do tabuleiro deve aparecer no centro da tela
3. O peão (💊) deve se mover sobre a imagem

## 🐛 Problemas Comuns

### "Imagem não carrega"
- Verifique se o arquivo está em `src/assets/board.png`
- Certifique-se que o arquivo não está corrompido
- Limpe o cache do navegador (Ctrl+Shift+Delete)

### "Imagem muito pequena ou muito grande"
- A imagem é redimensionada automaticamente pelo CSS
- Se necessário, edite o arquivo `src/components/Board.css` alterando a propriedade `aspect-ratio`

### "Qualidade ruim"
- Use uma imagem de maior resolução (mínimo 800x600px)
- Certifique-se que o PNG está bem comprimido

## 📝 Notas

- Não modifique o nome do arquivo (deve ser `board.png`)
- Não altere a pasta de destino (`src/assets/`)
- O jogo funciona com qualquer imagem de tabuleiro desde que tenha proporções similares

---

**Após substituir a imagem, recarregue o navegador para ver as alterações!**
