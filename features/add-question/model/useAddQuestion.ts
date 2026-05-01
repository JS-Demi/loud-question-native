import { useState } from 'react'
import { Alert } from 'react-native'
import { useQuestions } from '@/entities/question'
import { TDifficulty, IQuestion } from '@/entities/question'

interface IFormState {
  text: string
  answer: string
  category: string
  difficulty: TDifficulty
}

const INITIAL_FORM: IFormState = {
  text: '',
  answer: '',
  category: '',
  difficulty: 'easy',
}

export const useAddQuestion = () => {
  const { addQuestion, addQuestions } = useQuestions()
  const [form, setForm] = useState<IFormState>(INITIAL_FORM)
  const [isSaving, setIsSaving] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  const setField = <K extends keyof IFormState>(key: K, value: IFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const isFormValid = form.text.trim().length > 0 && form.answer.trim().length > 0

  const save = async (): Promise<boolean> => {
    if (!isFormValid) return false
    setIsSaving(true)
    try {
      await addQuestion({
        text: form.text.trim(),
        answer: form.answer.trim(),
        category: form.category.trim() || 'Общее',
        difficulty: form.difficulty,
      })
      setForm(INITIAL_FORM)
      return true
    } finally {
      setIsSaving(false)
    }
  }

  const importJson = async (raw: string): Promise<void> => {
    setIsImporting(true)
    try {
      const parsed: unknown = JSON.parse(raw)
      if (!Array.isArray(parsed)) throw new Error('Ожидается массив JSON')

      const valid = parsed.filter(
        (item): item is Omit<IQuestion, 'id'> =>
          typeof item === 'object' &&
          item !== null &&
          typeof (item as IQuestion).text === 'string' &&
          typeof (item as IQuestion).answer === 'string',
      ).map((item) => ({
        text: (item as IQuestion).text,
        answer: (item as IQuestion).answer,
        category: (item as IQuestion).category ?? 'Общее',
        difficulty: (['easy', 'medium', 'hard'].includes((item as IQuestion).difficulty)
          ? (item as IQuestion).difficulty
          : 'easy') as TDifficulty,
      }))

      if (valid.length === 0) throw new Error('Нет корректных вопросов в массиве')
      await addQuestions(valid)
      Alert.alert('Готово!', `Импортировано ${valid.length} вопросов`)
    } catch (e) {
      Alert.alert('Ошибка', e instanceof Error ? e.message : 'Не удалось разобрать JSON')
    } finally {
      setIsImporting(false)
    }
  }

  return { form, setField, isFormValid, isSaving, isImporting, save, importJson }
}
