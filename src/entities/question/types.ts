export type TDifficulty = 'easy' | 'medium' | 'hard'

export interface IQuestion {
  id: string
  text: string
  answer: string
  category: string
  difficulty: TDifficulty
}
