import { HeroUINativeProvider } from "heroui-native";
import type { HeroUINativeConfig } from "heroui-native";
import { Stack } from "expo-router";
import "../global.css";

const config: HeroUINativeConfig = {
  textProps: {
    minimumFontScale: 0.5,
    maxFontSizeMultiplier: 1.5,
  },
};
export default function RootLayout() {
  return (
    <HeroUINativeProvider config={config}>
      <Stack screenOptions={{ headerShown: false }} />
    </HeroUINativeProvider>
  );
}
