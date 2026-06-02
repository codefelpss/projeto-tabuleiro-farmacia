import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Player, PawnType } from '../types/game';
import { PAWN_COLORS, PAWN_LABELS } from '../types/game';
import { Logo } from './Logo';
import './SetupScreen.css';

interface SetupScreenProps {
  onStart: (players: Player[]) => void;
}

const PAWN_TYPES: PawnType[] = [
  'capsula-azul',
  'capsula-vermelha',
  'frasco',
  'comprimido',
  'seringa',
  'pilula',
];

const DEFAULT_NAMES = ['Jogador 1', 'Jogador 2', 'Jogador 3', 'Jogador 4', 'Jogador 5', 'Jogador 6'];


export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [count, setCount] = useState(2);
  const [names, setNames] = useState<string[]>(['', '', '', '', '', '']);
  const [pawns, setPawns] = useState<PawnType[]>([
    'capsula-azul',
    'capsula-vermelha',
    'frasco',
    'comprimido',
    'seringa',
    'pilula',
  ]);

  function updateName(i: number, value: string) {
    const next = [...names];
    next[i] = value;
    setNames(next);
  }

  function updatePawn(i: number, type: PawnType) {
    const next = [...pawns];
    next[i] = type;
    setPawns(next);
  }

  function startGame() {
    const players: Player[] = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: names[i].trim() || DEFAULT_NAMES[i],
      pawnType: pawns[i],
      color: PAWN_COLORS[pawns[i]],
      position: 0,
      score: 0,
    }));
    onStart(players);
  }

  return (
    <div className="setup-screen">
      <motion.div
        className="setup-card"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── Header ── */}
        <div className="setup-header">
          <div className="setup-logo-wrapper">
            <Logo variant="full" />
          </div>
        </div>

        {/* ── Corpo ── */}
        <div className="setup-body">

          {/* Número de jogadores */}
          <div>
            <p className="setup-section-label">Número de jogadores</p>
            <div className="player-count-btns">
              {[2, 3, 4, 5, 6].map(n => (
                <motion.button
                  key={n}
                  className={`count-btn${count === n ? ' selected' : ''}`}
                  onClick={() => setCount(n)}
                  whileTap={{ scale: 0.92 }}
                >
                  {n}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Linhas de jogadores */}
          <div>
            <p className="setup-section-label">Jogadores</p>
            <div className="setup-players">
              {Array.from({ length: count }, (_, i) => (
                <motion.div
                  key={i}
                  className="setup-player-row"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055, duration: 0.3 }}
                >
                  <div
                    className="setup-player-num"
                    style={{ background: PAWN_COLORS[pawns[i]] }}
                  >
                    {i + 1}
                  </div>
                  <input
                    className="setup-name-input"
                    type="text"
                    placeholder={DEFAULT_NAMES[i]}
                    value={names[i]}
                    onChange={e => updateName(i, e.target.value)}
                    maxLength={20}
                  />
                  <select
                    className="setup-pawn-select"
                    value={pawns[i]}
                    onChange={e => updatePawn(i, e.target.value as PawnType)}
                    style={{ borderColor: PAWN_COLORS[pawns[i]] }}
                  >
                    {PAWN_TYPES.map(pt => (
                      <option key={pt} value={pt}>
                        {PAWN_LABELS[pt]}
                      </option>
                    ))}
                  </select>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Rodapé ── */}
        <div className="setup-footer">
          <motion.button
            className="start-btn"
            onClick={startGame}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
          >
            Iniciar Jogo →
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
