import React from 'react';
import { motion } from 'framer-motion';
import type { Player, PawnType } from '../types/game';
import { CELLS } from '../data/boardCells';
import './Pawn.css';

interface PawnProps {
  player: Player;
  isActive: boolean;
  offsetX?: number;
  offsetY?: number;
}

/* ─── Ícones SVG — simples e legíveis em 26px ─── */

function CapsuleIcon({ color, uid }: { color: string; uid: string }) {
  const ta = `ca-${uid}`;
  const tb = `cb-${uid}`;
  return (
    <svg viewBox="0 0 20 34" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <clipPath id={ta}><rect x="0" y="0"  width="20" height="17" /></clipPath>
        <clipPath id={tb}><rect x="0" y="17" width="20" height="17" /></clipPath>
      </defs>
      {/* metade de cima — cor do jogador */}
      <rect x="2" y="2" width="16" height="30" rx="8" fill={color} clipPath={`url(#${ta})`} />
      {/* metade de baixo — branco com borda colorida */}
      <rect x="2" y="2" width="16" height="30" rx="8" fill="#f0f4ff" clipPath={`url(#${tb})`} />
      {/* contorno geral */}
      <rect x="2" y="2" width="16" height="30" rx="8" fill="none" stroke={color} strokeWidth="2" />
      {/* linha divisória */}
      <line x1="2" y1="17" x2="18" y2="17" stroke={color} strokeWidth="1.5" />
      {/* brilho */}
      <ellipse cx="8" cy="9" rx="3" ry="2" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

function FlaskIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* pescoço */}
      <rect x="9" y="1" width="6" height="12" rx="2" fill={color} />
      {/* corpo triangular */}
      <path d="M9 13 L2 26 C2 28 7 30 12 30 C17 30 22 28 22 26 L15 13 Z" fill={color} />
      {/* líquido claro no fundo */}
      <path d="M9 21 L4 26 C4 28 8 30 12 30 C16 30 20 28 20 26 L15 21 Z" fill="rgba(255,255,255,0.28)" />
      {/* contorno */}
      <path d="M9 1 h6 v12 l13 13 C28 29 22 31 12 31 C2 31 -4 29 2 26 Z"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* brilho no pescoço */}
      <rect x="11" y="3" width="2" height="8" rx="1" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

function TabletIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* corpo oval */}
      <ellipse cx="16" cy="11" rx="14" ry="9" fill={color} />
      {/* linha de ranhura */}
      <line x1="16" y1="3" x2="16" y2="19" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round" />
      {/* contorno */}
      <ellipse cx="16" cy="11" rx="14" ry="9" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* brilho */}
      <ellipse cx="9" cy="7" rx="4" ry="2.5" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}

function SyringeIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* agulha */}
      <path d="M9 28 L7 34 L11 34 Z" fill="#94a3b8" />
      {/* barril */}
      <rect x="5" y="9" width="8" height="20" rx="3" fill={color} />
      {/* êmbolo topo */}
      <rect x="4" y="5" width="10" height="4" rx="2" fill="#94a3b8" />
      <rect x="8" y="2"  width="2" height="5" rx="1" fill="#94a3b8" />
      {/* marcações */}
      <line x1="5" y1="16" x2="13" y2="16" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <line x1="5" y1="22" x2="13" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      {/* contorno barril */}
      <rect x="5" y="9" width="8" height="20" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* brilho */}
      <rect x="7" y="11" width="2" height="7" rx="1" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}

function PillIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* círculo */}
      <circle cx="14" cy="14" r="12" fill={color} />
      {/* brilho grande */}
      <ellipse cx="9" cy="9" rx="5" ry="3.5" fill="rgba(255,255,255,0.5)" />
      {/* contorno */}
      <circle cx="14" cy="14" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* reflexo menor */}
      <ellipse cx="19" cy="19" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}

function PawnIcon({ type, color, uid }: { type: PawnType; color: string; uid: string }) {
  switch (type) {
    case 'capsula-vermelha':
    case 'capsula-azul':
      return <CapsuleIcon color={color} uid={uid} />;
    case 'frasco':
      return <FlaskIcon color={color} />;
    case 'comprimido':
      return <TabletIcon color={color} />;
    case 'seringa':
      return <SyringeIcon color={color} />;
    case 'pilula':
    default:
      return <PillIcon color={color} />;
  }
}

/* ─── Peão principal ─── */

export const Pawn: React.FC<PawnProps> = ({ player, isActive, offsetX = 0, offsetY = 0 }) => {
  const cell = CELLS[player.position];
  const x = cell.position.x + offsetX;
  const y = cell.position.y + offsetY;
  const uid = `p${player.id}`;

  return (
    <motion.div
      className={`pawn${isActive ? ' pawn-active' : ''}`}
      animate={{ left: `${x}%`, top: `${y}%` }}
      initial={{ left: `${x}%`, top: `${y}%` }}
      transition={{ duration: 0.9, ease: [0.34, 1.2, 0.64, 1] }}
      title={player.name}
    >
      {/* Sombra projetada */}
      <div className="pawn-shadow" />

      {/* Anel pulsante (jogador ativo) */}
      {isActive && (
        <div className="pawn-ring" style={{ borderColor: player.color }} />
      )}

      {/* Círculo branco principal — garante contraste em qualquer fundo */}
      <div
        className="pawn-circle"
        style={{ borderColor: player.color }}
      >
        <div className="pawn-icon-wrap">
          <PawnIcon type={player.pawnType} color={player.color} uid={uid} />
        </div>
      </div>

      {/* Estrela acima do peão ativo */}
      {isActive && <span className="pawn-crown">★</span>}
    </motion.div>
  );
};
