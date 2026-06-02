import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuestionData } from '../types/game';
import './ModalQuestion.css';

const logoGlob = import.meta.glob(
  '../assets/logo.{png,jpg,jpeg,PNG,JPG,JPEG,webp}',
  { eager: true, query: '?url', import: 'default' },
);
const assetLogoUrl = (Object.values(logoGlob)[0] as string) || null;

const CATEGORY_META: Record<string, { label: string; color: string; icon: string; bg: string }> = {
  'verdadeiro-falso': { label: 'Verdadeiro ou Falso', color: '#b45309', icon: '✓✗',  bg: 'linear-gradient(135deg,#d97706,#92400e)' },
  'multipla-escolha': { label: 'Múltipla Escolha',   color: '#065f46', icon: 'ABC', bg: 'linear-gradient(135deg,#059669,#064e3b)' },
  'pergunta-aberta':  { label: 'Pergunta Aberta',     color: '#1e40af', icon: '✏',  bg: 'linear-gradient(135deg,#2563eb,#1e3a8a)' },
  'curiosidade':      { label: 'Curiosidade',         color: '#5b21b6', icon: '💡', bg: 'linear-gradient(135deg,#7c3aed,#4c1d95)' },
};

function getCorrectIndex(q: QuestionData): number {
  if (q.category === 'verdadeiro-falso') return q.correct === true ? 0 : 1;
  return q.correct as number;
}

interface ModalQuestionProps {
  question: QuestionData | null;
  phase: 'question' | 'result';
  result: { isCorrect: boolean; selectedIndex?: number } | null;
  onAnswer: (isCorrect: boolean, selectedIndex?: number) => void;
  onClose: () => void;
  playerName: string;
}

export const ModalQuestion: React.FC<ModalQuestionProps> = ({
  question, phase, result, onAnswer, onClose, playerName,
}) => {
  const [selected,    setSelected]    = useState<number | null>(null);
  const [showSample,  setShowSample]  = useState(false);
  const [isFlipped,   setIsFlipped]   = useState(false);
  const [contentReady, setContentReady] = useState(false);

  const isVisible = !!question && (phase === 'question' || phase === 'result');
  const meta       = question ? (CATEGORY_META[question.category] ?? { label: question.category, color: '#64748b', icon: '?', bg: '#64748b' }) : null;
  const correctIdx = question?.alternatives ? getCorrectIndex(question) : -1;

  useEffect(() => {
    if (!isVisible) {
      setIsFlipped(false);
      setContentReady(false);
      return;
    }
    setSelected(null);
    setShowSample(false);
    setIsFlipped(false);
    setContentReady(false);

    const t1 = setTimeout(() => setIsFlipped(true),    900);
    const t2 = setTimeout(() => setContentReady(true), 1620);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [question?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (phase === 'result') setContentReady(true);
  }, [phase]);

  function submitAnswer() {
    if (!question) return;
    if (question.category === 'curiosidade') { onAnswer(true); return; }
    if (question.category === 'pergunta-aberta') return;
    if (selected === null) return;
    onAnswer(selected === correctIdx, selected);
  }

  function selfReport(ok: boolean) { onAnswer(ok); }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="mq-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Carta animada — sai do baralho (esquerda) e desliza para o painel */}
          <motion.div
            className="mq-card-wrapper"
            style={{ transformPerspective: 1100 }}
            initial={{
              x: -380, y: 30,
              scale: 0.55,
              rotateY: -55,
              rotateZ: -14,
              opacity: 0,
            }}
            animate={{
              x:       [-380, -90,  10,   0],
              y:       [  30,  -8,   4,   0],
              scale:   [0.55, 0.88, 1.03,  1],
              rotateY: [ -55,  -14,   4,   0],
              rotateZ: [ -14,   -4,   1.5, 0],
              opacity: [   0,  0.75,  1,   1],
            }}
            exit={{
              x: -220, y: 20,
              scale: 0.6,
              rotateY: -40,
              rotateZ: -10,
              opacity: 0,
              transition: { duration: 0.38, ease: [0.55, 0, 1, 0.45] },
            }}
            transition={{
              duration: 0.9,
              times:    [0, 0.32, 0.68, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mq-card-perspective">
              <div className={`mq-card-inner ${isFlipped ? 'flipped' : ''}`}>

                {/* ════ VERSO DA CARTA ════ */}
                <div className="mq-card-face mq-card-back">
                  <span className="cb-corner cb-tl">✚</span>
                  <span className="cb-corner cb-tr">✚</span>
                  <span className="cb-corner cb-bl">✚</span>
                  <span className="cb-corner cb-br">✚</span>
                  <div className="cb-inner-border" />
                  <div className="cb-logo-area">
                    {assetLogoUrl ? (
                      <img src={assetLogoUrl} className="cb-logo-img" alt="Logo" />
                    ) : (
                      <div className="cb-logo-fallback">
                        <svg width="56" height="56" viewBox="0 0 52 52" fill="none">
                          <circle cx="26" cy="26" r="24" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                          <rect x="20" y="10" width="12" height="32" rx="3" fill="#fff"/>
                          <rect x="10" y="20" width="32" height="12" rx="3" fill="#fff"/>
                          <rect x="20" y="20" width="12" height="12" rx="2" fill="#fbbf24"/>
                        </svg>
                        <p className="cb-fallback-title">JOGO DE FARMÁCIA</p>
                      </div>
                    )}
                  </div>
                  <p className="cb-subtitle">Assistência Farmacêutica</p>
                </div>

                {/* ════ FRENTE DA CARTA ════ */}
                <div className="mq-card-face mq-card-front">
                  {/* Header colorido por categoria */}
                  <div className="mq-front-header" style={{ background: meta?.bg }}>
                    <span className="mq-front-icon">{meta?.icon}</span>
                    <div className="mq-front-header-text">
                      <span className="mq-front-category">{meta?.label}</span>
                      <span className="mq-front-player">vez de {playerName}</span>
                    </div>
                    <div className="mq-front-mini-logo">
                      {assetLogoUrl ? (
                        <img src={assetLogoUrl} className="mq-front-logo-img" alt="Logo" />
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
                          <rect x="10" y="2"  width="6" height="22" rx="2" fill="rgba(255,255,255,0.9)"/>
                          <rect x="2"  y="10" width="22" height="6"  rx="2" fill="rgba(255,255,255,0.9)"/>
                          <rect x="10" y="10" width="6" height="6"   rx="1" fill="#fbbf24"/>
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Corpo */}
                  <div className="mq-front-body">
                    <p className="mq-question-text">{question?.question}</p>

                    {/* ── CURIOSIDADE ── */}
                    {question?.category === 'curiosidade' && (
                      <div className="mq-info-box">
                        <span className="mq-info-icon">💡</span>
                        <p>{question.info}</p>
                      </div>
                    )}

                    {/* ── PERGUNTA ABERTA ── */}
                    {question?.category === 'pergunta-aberta' && phase === 'question' && contentReady && (
                      <div className="mq-open-area">
                        {!showSample ? (
                          <button className="mq-btn-secondary" onClick={() => setShowSample(true)}>
                            Ver Resposta Esperada
                          </button>
                        ) : (
                          <>
                            <div className="mq-sample-box">
                              <p className="mq-sample-label">Resposta esperada:</p>
                              <p className="mq-sample-text">{question.sample}</p>
                            </div>
                            <div className="mq-self-report">
                              <button className="mq-btn-correct" onClick={() => selfReport(true)}>✅ Acertei</button>
                              <button className="mq-btn-wrong"   onClick={() => selfReport(false)}>❌ Errei</button>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* ── MÚLTIPLA ESCOLHA / VERDADEIRO-FALSO ── */}
                    {question?.alternatives && phase === 'question' && contentReady && (
                      <div className="mq-alternatives">
                        {question.alternatives.map((alt, i) => (
                          <button
                            key={i}
                            className={`mq-alt${selected === i ? ' selected' : ''}`}
                            onClick={() => setSelected(i)}
                          >
                            <span className="mq-alt-letter">{String.fromCharCode(65 + i)}</span>
                            <span className="mq-alt-text">{alt}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* ── RESULTADO ── */}
                    {phase === 'result' && result && question?.category !== 'curiosidade' && (
                      <div className={`mq-result-box ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                        <p className="mq-result-title">
                          {result.isCorrect ? '✅ Correto! +1 ponto' : '❌ Incorreto!'}
                        </p>
                        {question?.alternatives && (
                          <div className="mq-alt-result">
                            {question.alternatives.map((alt, i) => (
                              <div key={i} className={`mq-alt-r ${i === correctIdx ? 'r-correct' : i === result.selectedIndex ? 'r-wrong' : ''}`}>
                                <span className="mq-alt-letter">{String.fromCharCode(65 + i)}</span>
                                <span className="mq-alt-text">{alt}</span>
                                {i === correctIdx && <span className="mq-check">✓</span>}
                                {i === result.selectedIndex && i !== correctIdx && <span className="mq-cross">✗</span>}
                              </div>
                            ))}
                          </div>
                        )}
                        {question?.category === 'pergunta-aberta' && (
                          <div className="mq-sample-box">
                            <p className="mq-sample-label">Resposta esperada:</p>
                            <p className="mq-sample-text">{question.sample}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {phase === 'result' && result && question?.category === 'curiosidade' && (
                      <div className="mq-info-box">
                        <span className="mq-info-icon">💡</span>
                        <p>{question.info}</p>
                      </div>
                    )}
                  </div>

                  {/* Rodapé com botões */}
                  <div className="mq-front-footer">
                    {phase === 'question' && contentReady && question?.category !== 'curiosidade' && question?.category !== 'pergunta-aberta' && (
                      <button
                        className="mq-btn-primary"
                        disabled={selected === null}
                        onClick={submitAnswer}
                      >
                        Confirmar Resposta
                      </button>
                    )}
                    {phase === 'question' && contentReady && question?.category === 'curiosidade' && (
                      <button className="mq-btn-primary" onClick={submitAnswer}>
                        Entendi! 👍
                      </button>
                    )}
                    {phase === 'result' && (
                      <button className="mq-btn-primary continue" onClick={onClose}>
                        Próximo Turno →
                      </button>
                    )}
                    {!contentReady && (
                      <p className="mq-loading-text">Revelando carta…</p>
                    )}
                  </div>
                </div>

              </div>{/* /card-inner */}
            </div>{/* /card-perspective */}
          </motion.div>{/* /card-wrapper */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
