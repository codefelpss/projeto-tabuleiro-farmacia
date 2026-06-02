import React from 'react';
import type { Player } from '../types/game';
import { Pawn } from './Pawn';
import boardImage from '../assets/WhatsApp Image 2026-05-30 at 21.37.41.jpeg';
import './Board.css';

interface BoardProps {
  players: Player[];
  currentPlayerIndex: number;
}

function getPawnOffsets(players: Player[]): { x: number; y: number }[] {
  const byPosition = new Map<number, number[]>();
  players.forEach((p, i) => {
    const arr = byPosition.get(p.position) ?? [];
    arr.push(i);
    byPosition.set(p.position, arr);
  });

  return players.map((p, i) => {
    const group = byPosition.get(p.position) ?? [i];
    const count = group.length;
    if (count === 1) return { x: 0, y: 0 };
    const idx   = group.indexOf(i);
    const angle = (idx / count) * 2 * Math.PI - Math.PI / 2;
    const r = 2.8;
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
  });
}

export const Board: React.FC<BoardProps> = ({ players, currentPlayerIndex }) => {
  const offsets = getPawnOffsets(players);

  return (
    <div className="board-wrapper">
      <img
        src={boardImage}
        alt="Tabuleiro Assistência Farmacêutica"
        className="board-image"
        draggable={false}
      />

      {/* ── Camada dos peões ── */}
      <div className="board-pawn-layer">
        {players.map((player, idx) => (
          <Pawn
            key={player.id}
            player={player}
            isActive={idx === currentPlayerIndex}
            offsetX={offsets[idx].x}
            offsetY={offsets[idx].y}
          />
        ))}
      </div>
    </div>
  );
};
