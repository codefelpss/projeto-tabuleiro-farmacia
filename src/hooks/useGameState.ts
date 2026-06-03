import { useState, useCallback, useRef } from 'react';
import type { GameState, Player, QuestionData } from '../types/game';
import { CELLS, TOTAL_CELLS, isQuestionCell } from '../data/boardCells';
import questionsRaw from '../data/questions.json';

const ALL_QUESTIONS: QuestionData[] = (questionsRaw as { questions: QuestionData[] }).questions;

function pickQuestion(category: string): QuestionData | null {
  const pool = ALL_QUESTIONS.filter(q => q.category === category);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function checkForQuestion(position: number): QuestionData | null {
  const cell = CELLS[position];
  if (!isQuestionCell(cell.type)) return null;
  return pickQuestion(cell.type);
}

const BLANK: GameState = {
  players: [],
  currentPlayerIndex: 0,
  phase: 'setup',
  diceValue: null,
  isRolling: false,
  currentQuestion: null,
  questionResult: null,
  advanceMessage: null,
};

export function useGameState() {
  const [state, setState] = useState<GameState>(BLANK);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Stores each player's position before the dice roll so we can revert on wrong answer
  const preRollPositions = useRef<number[]>([]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const setupPlayers = useCallback((players: Player[]) => {
    setState({ ...BLANK, players, phase: 'rolling' });
  }, []);

  // Dice component calls this after animation completes
  const onDiceResult = useCallback((value: number) => {
    setState(prev => {
      const player = prev.players[prev.currentPlayerIndex];
      // Save position BEFORE moving so we can revert on wrong answer
      preRollPositions.current[prev.currentPlayerIndex] = player.position;
      const newPos = Math.min(player.position + value, TOTAL_CELLS - 1);
      const updatedPlayers = prev.players.map((p, i) =>
        i === prev.currentPlayerIndex ? { ...p, position: newPos } : p,
      );
      return { ...prev, diceValue: value, isRolling: false, phase: 'moving', players: updatedPlayers };
    });

    // Wait for pawn animation then resolve landing
    clearTimer();
    timerRef.current = setTimeout(() => {
      setState(prev => {
        const player = prev.players[prev.currentPlayerIndex];

        if (player.position >= TOTAL_CELLS - 1) {
          return { ...prev, phase: 'finished' };
        }

        const cell = CELLS[player.position];

        if (cell.type === 'avance-duas') {
          const newPos = Math.min(player.position + 2, TOTAL_CELLS - 1);
          const updatedPlayers = prev.players.map((p, i) =>
            i === prev.currentPlayerIndex ? { ...p, position: newPos } : p,
          );
          return {
            ...prev,
            players: updatedPlayers,
            phase: 'advance',
            advanceMessage: 'Parabéns! Avance 2 casas!',
          };
        }

        const question = checkForQuestion(player.position);
        if (question) {
          return { ...prev, phase: 'question', currentQuestion: question, questionResult: null };
        }

        // No special action — next player
        const nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
        return { ...prev, phase: 'rolling', currentPlayerIndex: nextIndex, diceValue: null };
      });
    }, 1100);
  }, []);

  // Called after the advance animation finishes (2s auto-timer in App)
  const resolveAdvance = useCallback(() => {
    setState(prev => {
      const player = prev.players[prev.currentPlayerIndex];

      if (player.position >= TOTAL_CELLS - 1) {
        return { ...prev, phase: 'finished', advanceMessage: null };
      }

      const question = checkForQuestion(player.position);
      if (question) {
        return { ...prev, phase: 'question', currentQuestion: question, questionResult: null, advanceMessage: null };
      }

      const nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
      return { ...prev, phase: 'rolling', currentPlayerIndex: nextIndex, diceValue: null, advanceMessage: null };
    });
  }, []);

  const answerQuestion = useCallback((isCorrect: boolean, selectedIndex?: number) => {
    setState(prev => {
      const idx = prev.currentPlayerIndex;
      if (isCorrect) {
        const updatedPlayers = prev.players.map((p, i) =>
          i === idx ? { ...p, score: p.score + 1 } : p,
        );
        return { ...prev, players: updatedPlayers, phase: 'result', questionResult: { isCorrect, selectedIndex } };
      }
      // Wrong answer — move player back to position before the roll
      const revertPos = preRollPositions.current[idx] ?? prev.players[idx].position;
      const updatedPlayers = prev.players.map((p, i) =>
        i === idx ? { ...p, position: revertPos } : p,
      );
      return { ...prev, players: updatedPlayers, phase: 'result', questionResult: { isCorrect, selectedIndex } };
    });
  }, []);

  const closeResult = useCallback(() => {
    setState(prev => {
      const nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
      return {
        ...prev,
        phase: 'rolling',
        currentPlayerIndex: nextIndex,
        diceValue: null,
        currentQuestion: null,
        questionResult: null,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    clearTimer();
    setState(BLANK);
  }, []);

  return { state, setupPlayers, onDiceResult, resolveAdvance, answerQuestion, closeResult, resetGame };
}
