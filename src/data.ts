import type { Key } from './i18n';

/* Sample data for Step 1. Every label is a translation key, so each language shows only its own text. */
export const SAMPLE_SUBJECTS: { id: string; key: Key; progress: number }[] = [
  { id: 'sa', key: 'subj_sa', progress: 62 },
  { id: 'es', key: 'subj_es', progress: 48 },
  { id: 'db', key: 'subj_db', progress: 75 },
  { id: 'ca', key: 'subj_ca', progress: 30 },
];
export const SAMPLE_PLAN: { id: string; key: Key; minutes: number }[] = [
  { id: 'p1', key: 'plan1', minutes: 30 },
  { id: 'p2', key: 'plan2', minutes: 45 },
  { id: 'p3', key: 'plan3', minutes: 20 },
  { id: 'p4', key: 'plan4', minutes: 25 },
];
export const SAMPLE_WEAK: { id: string; key: Key; subject: Key; confidence: number }[] = [
  { id: 'w1', key: 'weak1', subject: 'subj_sa', confidence: 35 },
  { id: 'w2', key: 'weak2', subject: 'subj_es', confidence: 40 },
  { id: 'w3', key: 'weak3', subject: 'subj_ca', confidence: 28 },
  { id: 'w4', key: 'weak4', subject: 'subj_db', confidence: 45 },
];
export const SAMPLE_STREAK = 5;
export const SAMPLE_STUDY_MIN_TODAY = 95;

export const todayStr = (d = new Date()): string => {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
export const daysUntil = (iso: string): number => {
  const [y, m, d] = iso.split('-').map(Number);
  const target = new Date(y, m - 1, d).getTime();
  const now = new Date(); const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((target - start) / 86400000);
};
