import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './Dice3D.css';

interface Dice3DProps {
  onRoll: (result: number) => void;
  disabled?: boolean;
}

const T = true;
const F = false;

// Padrão de pontos de cada face (grid 3×3)
const DOT_PATTERNS: Record<number, boolean[]> = {
  1: [F, F, F,  F, T, F,  F, F, F],
  2: [F, F, T,  F, F, F,  T, F, F],
  3: [F, F, T,  F, T, F,  T, F, F],
  4: [T, F, T,  F, F, F,  T, F, T],
  5: [T, F, T,  F, T, F,  T, F, T],
  6: [T, F, T,  T, F, T,  T, F, T],
};

/**
 * Rotação final correta para cada face.
 * Calculado como: 720° base (2 voltas completas) + offset da face.
 * Adicionar múltiplos de 360° a qualquer eixo não muda a face visível.
 * Isso garante que a animação sempre mostra a face correta.
 */
const FACE_FINALS: Record<number, [number, number]> = {
  // [rotateX, rotateY]   — base 720 + offset do FACE_RESTS original
  1: [720,  720],   // rotateX(0)    rotateY(0)
  2: [720,  630],   // rotateX(0)    rotateY(-90)  → 720-90=630
  3: [630,  720],   // rotateX(-90)  rotateY(0)    → 720-90=630
  4: [810,  720],   // rotateX(90)   rotateY(0)    → 720+90=810
  5: [720,  810],   // rotateX(0)    rotateY(90)   → 720+90=810
  6: [900,  720],   // rotateX(180)  rotateY(0)    → 720+180=900
};

function DiceFace({ value }: { value: number }) {
  const dots = DOT_PATTERNS[value];
  return (
    <div className="dice-face-grid">
      {dots.map((on, i) => (
        <div key={i} className={`dice-dot${on ? ' on' : ''}`} />
      ))}
    </div>
  );
}

export const Dice3D: React.FC<Dice3DProps> = ({ onRoll, disabled = false }) => {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const diceRef = useRef<HTMLDivElement>(null);

  const roll = () => {
    if (rolling || disabled) return;
    // Haptic feedback em dispositivos mobile que suportam a Vibration API
    if ('vibrate' in navigator) navigator.vibrate(30);
    setRolling(true);
    setResult(null);

    const face = Math.floor(Math.random() * 6) + 1;
    const [baseX, baseY] = FACE_FINALS[face];

    // Variabilidade extra: 0, 360 ou 720 graus extras (múltiplos de 360 → não mudam a face)
    const extraSpins = Math.floor(Math.random() * 3) * 360;
    const finalX = baseX + extraSpins;
    const finalY = baseY + (Math.random() > 0.5 ? extraSpins : 0);

    if (diceRef.current) {
      // Reset para posição de canto — mostra 3 faces, dá aspecto cúbico imediato
      diceRef.current.style.transition = 'none';
      diceRef.current.style.transform  = 'rotateX(-18deg) rotateY(22deg)';
      void diceRef.current.offsetHeight; // força reflow

      // Anima para a face correta com impulso físico
      // Os FACE_FINALS já incluem 720° de base, então a animação percorre um longo caminho
      diceRef.current.style.transition = 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
      diceRef.current.style.transform  = `rotateX(${finalX}deg) rotateY(${finalY}deg)`;
    }

    setTimeout(() => {
      setResult(face);
      setRolling(false);
      onRoll(face);
    }, 1200);
  };

  return (
    <div className="dice-panel">
      <div className="dice-scene">
        <div ref={diceRef} className="dice-cube">
          <div className="dice-face front">  <DiceFace value={1} /></div>
          <div className="dice-face right">  <DiceFace value={2} /></div>
          <div className="dice-face top">    <DiceFace value={3} /></div>
          <div className="dice-face bottom"> <DiceFace value={4} /></div>
          <div className="dice-face left">   <DiceFace value={5} /></div>
          <div className="dice-face back">   <DiceFace value={6} /></div>
        </div>
      </div>

      {/* Resultado aparece só após a animação terminar */}
      <div className="dice-result-area">
        {rolling ? (
          <p className="dice-rolling-text">Rolando…</p>
        ) : result !== null ? (
          <motion.div
            key={result}
            className="dice-result"
            initial={{ opacity: 0, scale: 0.7, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span className="dice-result-label">Resultado</span>
            <span className="dice-result-number">{result}</span>
          </motion.div>
        ) : (
          <p className="dice-idle-text">Clique para rolar</p>
        )}
      </div>

      <motion.button
        className={`roll-btn${rolling ? ' rolling' : ''}${disabled ? ' disabled' : ''}`}
        onClick={roll}
        disabled={rolling || disabled}
        whileHover={!rolling && !disabled ? { scale: 1.05 } : {}}
        whileTap={!rolling && !disabled ? { scale: 0.95 } : {}}
      >
        {rolling ? 'Rolando…' : disabled ? 'Aguarde' : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="3"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
            Rolar Dado
          </>
        )}
      </motion.button>
    </div>
  );
};
