export type CellType =
  | 'inicio'
  | 'chegada'
  | 'verdadeiro-falso'
  | 'multipla-escolha'
  | 'pergunta-aberta'
  | 'curiosidade'
  | 'avance-duas';

export interface Cell {
  id: number;
  type: CellType;
  label: string;
  position: { x: number; y: number };
}

export type PawnType =
  | 'capsula-vermelha'
  | 'capsula-azul'
  | 'frasco'
  | 'comprimido'
  | 'seringa'
  | 'pilula';

export const PAWN_COLORS: Record<PawnType, string> = {
  'capsula-vermelha': '#ef4444',
  'capsula-azul': '#3b82f6',
  'frasco': '#f97316',
  'comprimido': '#10b981',
  'seringa': '#f59e0b',
  'pilula': '#ec4899',
};

export const PAWN_LABELS: Record<PawnType, string> = {
  'capsula-vermelha': 'Cápsula Vermelha',
  'capsula-azul': 'Cápsula Azul',
  'frasco': 'Frasco',
  'comprimido': 'Comprimido',
  'seringa': 'Seringa',
  'pilula': 'Pílula Rosa',
};

export interface Player {
  id: number;
  name: string;
  pawnType: PawnType;
  color: string;
  position: number;
  score: number;
}

export type GamePhase =
  | 'setup'
  | 'rolling'
  | 'moving'
  | 'advance'
  | 'question'
  | 'result'
  | 'finished';

export interface QuestionData {
  id: number;
  category: string;
  question: string;
  alternatives?: string[];
  correct?: number | boolean;
  sample?: string;
  info?: string;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  phase: GamePhase;
  diceValue: number | null;
  isRolling: boolean;
  currentQuestion: QuestionData | null;
  questionResult: { isCorrect: boolean; selectedIndex?: number } | null;
  advanceMessage: string | null;
}
