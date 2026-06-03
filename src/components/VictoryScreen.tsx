import React from 'react';
import { motion } from 'framer-motion';
import type { Player } from '../types/game';
import './VictoryScreen.css';

interface VictoryScreenProps {
  players: Player[];
  onRestart: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({ players, onRestart }) => {
  const sorted = [...players].sort((a, b) => {
    if (b.position !== a.position) return b.position - a.position;
    return b.score - a.score;
  });

  const winner = sorted[0];
  const medalColors = ['#f59e0b', '#94a3b8', '#b45309'];

  return (
    <div className="victory-screen">
      <motion.div
        className="victory-card"
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <div className="victory-header">
          <motion.div
            className="victory-trophy"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
              <path d="M4 22h16"/>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
            </svg>
          </motion.div>
          <h1 className="victory-title">Fim de Jogo!</h1>
          <p className="victory-winner">
            <span
              className="winner-dot"
              style={{ background: winner.color }}
            />
            {winner.name} venceu!
          </p>
        </div>

        <div className="victory-ranking">
          <h2 className="ranking-title">Ranking Final</h2>
          <div className="ranking-list">
            {sorted.map((player, i) => (
              <motion.div
                key={player.id}
                className={`ranking-row ${i === 0 ? 'first' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <span className="rank-medal" style={i < 3 ? { color: medalColors[i], borderColor: medalColors[i] } : {}}>
                  {i + 1}°
                </span>
                <div
                  className="rank-avatar"
                  style={{ background: player.color }}
                >
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <span className="rank-name">{player.name}</span>
                <div className="rank-stats">
                  <span className="rank-pos">Casa {player.position + 1}</span>
                  <span className="rank-score">{player.score} pt{player.score !== 1 ? 's' : ''}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          className="restart-btn"
          onClick={onRestart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          Jogar Novamente
        </motion.button>
      </motion.div>
    </div>
  );
};
