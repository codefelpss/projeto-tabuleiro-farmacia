import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import questions from '../data/questions.json';
import './CardDeck.css';

interface CardDeckProps {
  cellType: string;
}

export const CardDeck: React.FC<CardDeckProps> = ({ cellType }) => {
  const categoryQuestions = useMemo(() => {
    const categoryMap: Record<string, string> = {
      'verdadeiro-falso': 'verdadeiro-falso',
      'pergunta-aberta': 'pergunta-aberta',
      'multipla-escolha': 'multipla-escolha',
      'curiosidade': 'curiosidade',
    };

    const mapped = categoryMap[cellType];
    if (!mapped) return [];

    return questions.questions.filter((q) => q.category === mapped);
  }, [cellType]);

  const randomQuestion = useMemo(() => {
    if (categoryQuestions.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
    return categoryQuestions[randomIndex];
  }, [categoryQuestions, cellType]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'verdadeiro-falso': '#FFD700',
      'pergunta-aberta': '#4A90E2',
      'multipla-escolha': '#7ED321',
      'curiosidade': '#FF69B4',
    };
    return colors[category] || '#667eea';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'verdadeiro-falso': '✓/✗',
      'pergunta-aberta': '📝',
      'multipla-escolha': '🎯',
      'curiosidade': '💡',
    };
    return icons[category] || '🎴';
  };

  return (
    <div className="card-deck">
      {randomQuestion && (
        <motion.div
          className="card"
          initial={{ opacity: 0, x: 50, rotateY: -20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: -50, rotateY: 20 }}
          style={{
            borderColor: getCategoryColor(randomQuestion.category),
          }}
        >
          <div className="card-header" style={{ background: getCategoryColor(randomQuestion.category) }}>
            <span className="card-icon">{getCategoryIcon(randomQuestion.category)}</span>
            <span className="card-category">
              {randomQuestion.category === 'verdadeiro-falso' && 'Verdadeiro ou Falso'}
              {randomQuestion.category === 'pergunta-aberta' && 'Pergunta Aberta'}
              {randomQuestion.category === 'multipla-escolha' && 'Múltipla Escolha'}
              {randomQuestion.category === 'curiosidade' && 'Curiosidade'}
            </span>
          </div>
          <div className="card-body">
            <p className="card-text">{randomQuestion.question}</p>
            {randomQuestion.sample && (
              <p className="card-sample">{randomQuestion.sample}</p>
            )}
            {randomQuestion.info && (
              <p className="card-info">{randomQuestion.info}</p>
            )}
          </div>
        </motion.div>
      )}

      <motion.div
        className="card-stack"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card-back" style={{ transform: `translateY(${i * 8}px) rotate(${i * 2}deg)` }} />
        ))}
      </motion.div>
    </div>
  );
};
