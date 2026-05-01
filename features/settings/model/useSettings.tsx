import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { STORAGE_KEYS } from '@/shared/constants/game'
import { storage } from '@/shared/lib/storage'
import { ISettings, TQuestionTime } from '../types'

const DEFAULT_SETTINGS: ISettings = {
  timePerQuestion: 60,
  hostMode: false,
}

interface ISettingsContext {
  settings: ISettings
  isLoading: boolean
  setTimePerQuestion: (time: TQuestionTime) => Promise<void>
  setHostMode: (enabled: boolean) => Promise<void>
}

const SettingsContext = createContext<ISettingsContext | null>(null)

interface ISettingsProviderProps {
  readonly children: React.ReactNode
}

export const SettingsProvider = ({ children }: ISettingsProviderProps) => {
  const [settings, setSettings] = useState<ISettings>(DEFAULT_SETTINGS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    storage.get<ISettings>(STORAGE_KEYS.settings).then((saved) => {
      if (saved) setSettings(saved)
      setIsLoading(false)
    })
  }, [])

  const persist = useCallback(async (next: ISettings) => {
    setSettings(next)
    await storage.set(STORAGE_KEYS.settings, next)
  }, [])

  const setTimePerQuestion = useCallback(async (time: TQuestionTime) => {
    await persist({ ...settings, timePerQuestion: time })
  }, [settings, persist])

  const setHostMode = useCallback(async (enabled: boolean) => {
    await persist({ ...settings, hostMode: enabled })
  }, [settings, persist])

  return (
    <SettingsContext.Provider value={{ settings, isLoading, setTimePerQuestion, setHostMode }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = (): ISettingsContext => {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider')
  return ctx
}
