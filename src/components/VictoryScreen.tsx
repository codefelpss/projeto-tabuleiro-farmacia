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
  const medals = ['🥇', '🥈', '🥉'];

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
            🏆
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
                <span className="rank-medal">
                  {i < 3 ? medals[i] : `${i + 1}°`}
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
          Jogar Novamente ↩
        </motion.button>
      </motion.div>
    </div>
  );
};
