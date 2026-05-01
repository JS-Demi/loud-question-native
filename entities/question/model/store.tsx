import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { STORAGE_KEYS } from '@/shared/constants/game'
import { storage } from '@/shared/lib/storage'
import { IQuestion } from '../types'
import { SEED_QUESTIONS } from './seedQuestions'

interface IQuestionsContext {
  questions: IQuestion[]
  isLoading: boolean
  addQuestion: (q: Omit<IQuestion, 'id'>) => Promise<void>
  addQuestions: (qs: Omit<IQuestion, 'id'>[]) => Promise<void>
  removeQuestion: (id: string) => Promise<void>
}

const QuestionsContext = createContext<IQuestionsContext | null>(null)

interface IQuestionsProviderProps {
  readonly children: React.ReactNode
}

export const QuestionsProvider = ({ children }: IQuestionsProviderProps) => {
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    storage.get<IQuestion[]>(STORAGE_KEYS.questions).then((saved) => {
      if (saved && saved.length > 0) {
        setQuestions(saved)
      } else {
        setQuestions(SEED_QUESTIONS)
        storage.set(STORAGE_KEYS.questions, SEED_QUESTIONS)
      }
      setIsLoading(false)
    })
  }, [])

  const persist = useCallback(async (next: IQuestion[]) => {
    setQuestions(next)
    await storage.set(STORAGE_KEYS.questions, next)
  }, [])

  const addQuestion = useCallback(async (q: Omit<IQuestion, 'id'>) => {
    const newQ: IQuestion = { ...q, id: `${Date.now()}-${Math.random()}` }
    await persist([...questions, newQ])
  }, [questions, persist])

  const addQuestions = useCallback(async (qs: Omit<IQuestion, 'id'>[]) => {
    const newQs = qs.map((q): IQuestion => ({ ...q, id: `${Date.now()}-${Math.random()}` }))
    await persist([...questions, ...newQs])
  }, [questions, persist])

  const removeQuestion = useCallback(async (id: string) => {
    await persist(questions.filter((q) => q.id !== id))
  }, [questions, persist])

  return (
    <QuestionsContext.Provider value={{ questions, isLoading, addQuestion, addQuestions, removeQuestion }}>
      {children}
    </QuestionsContext.Provider>
  )
}

export const useQuestions = (): IQuestionsContext => {
  const ctx = useContext(QuestionsContext)
  if (!ctx) throw new Error('useQuestions must be used inside QuestionsProvider')
  return ctx
}
