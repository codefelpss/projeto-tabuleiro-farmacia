import type { Cell } from '../types/game';

// 18 cells clockwise from INÍCIO (bottom-left).
// Coordinates calibrated against the actual board image (WhatsApp Image 2026-05-30).
// Each row/column cell occupies ~20% of the image dimension.
// Percentage represents the CENTER of each cell.
export const CELLS: Cell[] = [
  // ── Bottom row, left → right (y ≈ 88%) ──────────────────────────────────
  { id: 0,  type: 'inicio',           label: 'Início',              position: { x: 9,  y: 88 } },
  { id: 1,  type: 'multipla-escolha', label: 'Múltipla Escolha',    position: { x: 25, y: 88 } },
  { id: 2,  type: 'verdadeiro-falso', label: 'Verdadeiro ou Falso', position: { x: 41, y: 88 } },
  { id: 3,  type: 'pergunta-aberta',  label: 'Pergunta Aberta',     position: { x: 57, y: 88 } },
  { id: 4,  type: 'multipla-escolha', label: 'Múltipla Escolha',    position: { x: 73, y: 88 } },
  { id: 5,  type: 'avance-duas',      label: 'Avance 2 Casas',      position: { x: 89, y: 88 } },
  // ── Right column, bottom → top (x ≈ 90%) ────────────────────────────────
  { id: 6,  type: 'pergunta-aberta',  label: 'Pergunta Aberta',     position: { x: 90, y: 69 } },
  { id: 7,  type: 'verdadeiro-falso', label: 'Verdadeiro ou Falso', position: { x: 90, y: 50 } },
  { id: 8,  type: 'multipla-escolha', label: 'Múltipla Escolha',    position: { x: 90, y: 31 } },
  // ── Top row, right → left (y ≈ 12%) ─────────────────────────────────────
  { id: 9,  type: 'curiosidade',      label: 'Curiosidade',         position: { x: 90, y: 12 } },
  { id: 10, type: 'verdadeiro-falso', label: 'Verdadeiro ou Falso', position: { x: 73, y: 12 } },
  { id: 11, type: 'multipla-escolha', label: 'Múltipla Escolha',    position: { x: 57, y: 12 } },
  { id: 12, type: 'pergunta-aberta',  label: 'Pergunta Aberta',     position: { x: 41, y: 12 } },
  { id: 13, type: 'avance-duas',      label: 'Avance 2 Casas',      position: { x: 25, y: 12 } },
  { id: 14, type: 'verdadeiro-falso', label: 'Verdadeiro ou Falso', position: { x: 9,  y: 12 } },
  // ── Left column, top → bottom (x ≈ 9%) ──────────────────────────────────
  { id: 15, type: 'pergunta-aberta',  label: 'Pergunta Aberta',     position: { x: 9,  y: 31 } },
  { id: 16, type: 'multipla-escolha', label: 'Múltipla Escolha',    position: { x: 9,  y: 50 } },
  { id: 17, type: 'chegada',          label: 'Chegada',             position: { x: 9,  y: 69 } },
];

export const TOTAL_CELLS = CELLS.length;

const QUESTION_TYPES = new Set([
  'verdadeiro-falso',
  'multipla-escolha',
  'pergunta-aberta',
  'curiosidade',
]);

export function isQuestionCell(type: string): boolean {
  return QUESTION_TYPES.has(type);
}
