import * as Haptics from 'expo-haptics'
import { Pressable, Switch, Text, View } from 'react-native'
import { COLORS } from 'shared/constants/colors'

// Switch props require raw color strings — COLORS is kept only for that

interface IHostModeToggleProps {
  readonly value: boolean
  readonly onChange: (enabled: boolean) => void
}

export const HostModeToggle = ({ value, onChange }: IHostModeToggleProps) => {
  const handleToggle = (next: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onChange(next)
  }

  return (
    <Pressable
      className="flex-row items-center justify-between bg-surface rounded-2xl px-5 py-4"
      onPress={() => handleToggle(!value)}
    >
      <View className="flex-1 mr-4">
        <Text className="font-bold text-base text-foreground">Режим ведущего</Text>
        <Text className="text-sm mt-1 text-muted">
          Выбирай вопрос вручную вместо случайного
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={handleToggle}
        trackColor={{ false: COLORS.mutedDim, true: COLORS.primaryDim }}
        thumbColor={value ? COLORS.primary : COLORS.muted}
        ios_backgroundColor={COLORS.mutedDim}
      />
    </Pressable>
  )
}
