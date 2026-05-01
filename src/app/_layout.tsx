import type { HeroUINativeConfig } from 'heroui-native'
import { HeroUINativeProvider } from 'heroui-native'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import '../global.css'

const config: HeroUINativeConfig = {
  textProps: {
    minimumFontScale: 0.5,
    maxFontSizeMultiplier: 1.5,
  },
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider config={config}>
        <Stack screenOptions={{ headerShown: false }} />
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  )
}
