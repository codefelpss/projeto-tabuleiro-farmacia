import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { SetupScreen } from './components/SetupScreen';
import { Board } from './components/Board';
import { Dice3D } from './components/Dice3D';
import { PlayerPanel } from './components/PlayerPanel';
import { ModalQuestion } from './components/ModalQuestion';
import { VictoryScreen } from './components/VictoryScreen';
import { Logo } from './components/Logo';
import { DeckWidget } from './components/DeckWidget';
import './App.css';

function App() {
  const { state, setupPlayers, onDiceResult, resolveAdvance, answerQuestion, closeResult, resetGame } = useGameState();

  useEffect(() => {
    if (state.phase !== 'advance') return;
    const t = setTimeout(resolveAdvance, 2000);
    return () => clearTimeout(t);
  }, [state.phase, resolveAdvance]);

  if (state.phase === 'setup') {
    return <SetupScreen onStart={setupPlayers} />;
  }

  if (state.phase === 'finished') {
    return <VictoryScreen players={state.players} onRestart={resetGame} />;
  }

  const currentPlayer = state.players[state.currentPlayerIndex];
  const canRoll = state.phase === 'rolling';
  const isQuestionActive = state.phase === 'question' || state.phase === 'result';

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-logo-area">
            <Logo variant="header" />
          </div>
          <button className="header-reset" onClick={resetGame} title="Reiniciar jogo">
            ↩ Novo Jogo
          </button>
        </div>
      </header>

      <main className={`app-main${isQuestionActive ? ' question-active' : ''}`}>
        {/* Painel esquerdo: jogadores */}
        <aside className="side-panel left-panel">
          <PlayerPanel
            players={state.players}
            currentPlayerIndex={state.currentPlayerIndex}
          />
          <DeckWidget />
          {state.diceValue !== null && (
            <div className="dice-info-strip">
              <span className="dice-info-label">Último dado</span>
              <span className="dice-info-value">{state.diceValue}</span>
            </div>
          )}
        </aside>

        {/* Centro: tabuleiro */}
        <section className="board-section">
          <Board
            players={state.players}
            currentPlayerIndex={state.currentPlayerIndex}
          />
        </section>

        {/* Painel direito: dado + turno  OU  carta de pergunta */}
        <aside className={`side-panel right-panel${isQuestionActive ? ' question-panel' : ''}`}>
          {isQuestionActive ? (
            <ModalQuestion
              question={state.currentQuestion}
              phase={state.phase as 'question' | 'result'}
              result={state.questionResult}
              onAnswer={answerQuestion}
              onClose={closeResult}
              playerName={currentPlayer.name}
            />
          ) : (
            <>
              <div className="turn-card">
                <p className="turn-label">Vez de jogar</p>
                <div
                  className="turn-avatar"
                  style={{ background: currentPlayer.color }}
                >
                  {currentPlayer.name.charAt(0).toUpperCase()}
                </div>
                <p className="turn-name">{currentPlayer.name}</p>
              </div>

              <Dice3D onRoll={onDiceResult} disabled={!canRoll} />

              {!canRoll && state.phase !== 'advance' && (
                <p className="wait-msg">
                  {state.phase === 'moving' ? 'Peão se movendo…' : ''}
                </p>
              )}
            </>
          )}
        </aside>
      </main>

      {/* Toast: avance duas casas */}
      <AnimatePresence>
        {state.phase === 'advance' && state.advanceMessage && (
          <motion.div
            className="advance-toast"
            initial={{ opacity: 0, y: -50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            {state.advanceMessage}
            <p className="advance-sub">Movendo 2 casas à frente…</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
