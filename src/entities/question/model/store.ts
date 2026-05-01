import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { IQuestion, TDifficulty } from '../types'
import { SEED_QUESTIONS } from './seedQuestions'

interface IQuestionsStore {
  questions: IQuestion[]
  addQuestion: (q: Omit<IQuestion, 'id'>) => void
  addQuestions: (qs: Omit<IQuestion, 'id'>[]) => void
  removeQuestion: (id: string) => void
}

export const useQuestionsStore = create<IQuestionsStore>()(
  persist(
    (set) => ({
      questions: SEED_QUESTIONS,
      addQuestion: (q) =>
        set((state) => ({
          questions: [
            ...state.questions,
            { ...q, id: `${Date.now()}-${Math.random()}` },
          ],
        })),
      addQuestions: (qs) =>
        set((state) => ({
          questions: [
            ...state.questions,
            ...qs.map(
              (q): IQuestion => ({
                ...q,
                difficulty: (['easy', 'medium', 'hard'].includes(q.difficulty)
                  ? q.difficulty
                  : 'easy') as TDifficulty,
                category: q.category ?? 'Общее',
                id: `${Date.now()}-${Math.random()}`,
              }),
            ),
          ],
        })),
      removeQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        })),
    }),
    {
      name: 'lq_questions',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
