import { useState } from 'react'
import { Alert } from 'react-native'
import { IQuestion, TDifficulty, useQuestionsStore } from 'entities/question'

interface IFormState {
  text: string
  answer: string
  category: string
  difficulty: TDifficulty
}

const INITIAL_FORM: IFormState = { text: '', answer: '', category: '', difficulty: 'easy' }

export const useAddQuestion = () => {
  const addQuestion = useQuestionsStore((s) => s.addQuestion)
  const addQuestions = useQuestionsStore((s) => s.addQuestions)

  const [form, setForm] = useState<IFormState>(INITIAL_FORM)
  const [isSaving, setIsSaving] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  const setField = <K extends keyof IFormState>(key: K, value: IFormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const isFormValid = form.text.trim().length > 0 && form.answer.trim().length > 0

  const save = async (): Promise<boolean> => {
    if (!isFormValid) return false
    setIsSaving(true)
    try {
      addQuestion({
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

      const valid = (parsed as IQuestion[]).filter(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          typeof item.text === 'string' &&
          typeof item.answer === 'string',
      )
      if (valid.length === 0) throw new Error('Нет корректных вопросов в массиве')
      addQuestions(valid)
      Alert.alert('Готово!', `Импортировано ${valid.length} вопросов`)
    } catch (e) {
      Alert.alert('Ошибка', e instanceof Error ? e.message : 'Не удалось разобрать JSON')
    } finally {
      setIsImporting(false)
    }
  }

  return { form, setField, isFormValid, isSaving, isImporting, save, importJson }
}
