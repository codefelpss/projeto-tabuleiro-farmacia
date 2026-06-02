import React from 'react';
import { motion } from 'framer-motion';
import type { Player } from '../types/game';
import { CELLS } from '../data/boardCells';
import './PlayerPanel.css';

interface PlayerPanelProps {
  players: Player[];
  currentPlayerIndex: number;
}

export const PlayerPanel: React.FC<PlayerPanelProps> = ({ players, currentPlayerIndex }) => {
  return (
    <div className="player-panel">
      <p className="panel-title">Placar</p>

      <div className="player-list">
        {players.map((player, i) => {
          const isActive = i === currentPlayerIndex;
          const cell = CELLS[player.position];
          return (
            <motion.div
              key={player.id}
              className={`player-card${isActive ? ' active' : ''}`}
              style={{ borderLeftColor: player.color }}
              animate={{ scale: isActive ? 1.025 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <div className="player-avatar" style={{ background: player.color }}>
                {player.name.charAt(0).toUpperCase()}
              </div>

              <div className="player-info">
                <p className="player-name">{player.name}</p>
                <p className="player-cell">{cell.label}</p>
                <div className="player-stats">
                  <span className="player-pos-badge">Casa {player.position + 1}</span>
                  <span className="player-score-badge">
                    {player.score} pt{player.score !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {isActive && (
                <motion.div
                  className="active-indicator"
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="active-arrow">▶</span>
                  <span className="active-label">Vez</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
