export const QUESTION_TIMES = [60, 120, 180] as const

export const QUESTION_TIME_LABELS: Record<number, string> = {
  60: '1 мин',
  120: '2 мин',
  180: '3 мин',
}

export const DIFFICULTY_LABELS = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
} as const

export const STORAGE_KEYS = {
  questions: 'lq_questions',
  settings: 'lq_settings',
} as const
