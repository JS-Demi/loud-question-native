import { useCallback, useEffect, useState } from 'react'
import * as Haptics from 'expo-haptics'
import { useQuestions } from '@/entities/question'
import { useSettings } from '@/features/settings'
import { IQuestion } from '@/entities/question'

interface IGameState {
  currentQuestion: IQuestion | null
  isAnswerRevealed: boolean
  isTimerRunning: boolean
  hasStarted: boolean
}

export const useGame = () => {
  const { questions } = useQuestions()
  const { settings } = useSettings()

  const [state, setState] = useState<IGameState>({
    currentQuestion: null,
    isAnswerRevealed: false,
    isTimerRunning: false,
    hasStarted: false,
  })

  const pickRandom = useCallback(() => {
    if (!questions.length) return
    const idx = Math.floor(Math.random() * questions.length)
    setState({
      currentQuestion: questions[idx],
      isAnswerRevealed: false,
      isTimerRunning: true,
      hasStarted: true,
    })
  }, [questions])

  const pickQuestion = useCallback((q: IQuestion) => {
    setState({
      currentQuestion: q,
      isAnswerRevealed: false,
      isTimerRunning: true,
      hasStarted: true,
    })
  }, [])

  const revealAnswer = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    setState((prev) => ({ ...prev, isAnswerRevealed: true, isTimerRunning: false }))
  }, [])

  const nextQuestion = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    if (!questions.length) return
    const idx = Math.floor(Math.random() * questions.length)
    setState({
      currentQuestion: questions[idx],
      isAnswerRevealed: false,
      isTimerRunning: true,
      hasStarted: true,
    })
  }, [questions])

  const onTimerEnd = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    setState((prev) => ({ ...prev, isTimerRunning: false }))
  }, [])

  // Auto-pick first question on load (only in non-host mode)
  useEffect(() => {
    if (!state.hasStarted && questions.length > 0 && !settings.hostMode) {
      pickRandom()
    }
  }, [questions, settings.hostMode, state.hasStarted, pickRandom])

  return {
    currentQuestion: state.currentQuestion,
    isAnswerRevealed: state.isAnswerRevealed,
    isTimerRunning: state.isTimerRunning,
    hasStarted: state.hasStarted,
    timePerQuestion: settings.timePerQuestion,
    hostMode: settings.hostMode,
    questions,
    pickRandom,
    pickQuestion,
    revealAnswer,
    nextQuestion,
    onTimerEnd,
  }
}
