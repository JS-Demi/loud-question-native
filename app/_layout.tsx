import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QuestionsProvider } from '@/entities/question'
import { SettingsProvider } from '@/features/settings'
import './global.css'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsProvider>
        <QuestionsProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </QuestionsProvider>
      </SettingsProvider>
    </GestureHandlerRootView>
  )
}
