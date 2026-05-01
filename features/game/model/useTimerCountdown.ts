import { useEffect, useRef, useState } from 'react'

interface IUseTimerCountdownParams {
  duration: number
  isRunning: boolean
  onComplete?: () => void
}

export const useTimerCountdown = ({ duration, isRunning, onComplete }: IUseTimerCountdownParams) => {
  const [timeLeft, setTimeLeft] = useState(duration)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    clear()

    if (!isRunning) return

    setTimeLeft(duration)

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clear()
          onComplete?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return clear
  }, [isRunning, duration])

  const reset = () => {
    clear()
    setTimeLeft(duration)
  }

  return { timeLeft, reset }
}
