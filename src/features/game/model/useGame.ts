import * as Haptics from 'expo-haptics'
import { useCallback, useEffect, useState } from 'react'
import { IQuestion, useQuestionsStore } from 'entities/question'
import { useSettingsStore } from 'features/settings'

interface IGameState {
  currentQuestion: IQuestion | null
  isAnswerRevealed: boolean
  isTimerRunning: boolean
  hasStarted: boolean
}

export const useGame = () => {
  const questions = useQuestionsStore((s) => s.questions)
  const timePerQuestion = useSettingsStore((s) => s.timePerQuestion)
  const hostMode = useSettingsStore((s) => s.hostMode)

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
    pickRandom()
  }, [pickRandom])

  const onTimerEnd = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    setState((prev) => ({ ...prev, isTimerRunning: false }))
  }, [])

  useEffect(() => {
    if (!state.hasStarted && questions.length > 0 && !hostMode) {
      pickRandom()
    }
  }, [questions, hostMode, state.hasStarted, pickRandom])

  return {
    currentQuestion: state.currentQuestion,
    isAnswerRevealed: state.isAnswerRevealed,
    isTimerRunning: state.isTimerRunning,
    hasStarted: state.hasStarted,
    timePerQuestion,
    hostMode,
    questions,
    pickRandom,
    pickQuestion,
    revealAnswer,
    nextQuestion,
    onTimerEnd,
  }
}
