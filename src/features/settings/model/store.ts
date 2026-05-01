import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ISettings, TQuestionTime } from '../types'

interface ISettingsStore extends ISettings {
  setTimePerQuestion: (time: TQuestionTime) => void
  setHostMode: (enabled: boolean) => void
}

export const useSettingsStore = create<ISettingsStore>()(
  persist(
    (set) => ({
      timePerQuestion: 60,
      hostMode: false,
      setTimePerQuestion: (time) => set({ timePerQuestion: time }),
      setHostMode: (enabled) => set({ hostMode: enabled }),
    }),
    {
      name: 'lq_settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
