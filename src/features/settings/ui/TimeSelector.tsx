import * as Haptics from 'expo-haptics'
import { Pressable, Text, View } from 'react-native'
import { QUESTION_TIME_LABELS, QUESTION_TIMES } from 'shared/constants/game'
import { COLORS } from 'shared/constants/colors'
import { TQuestionTime } from '../types'

interface ITimeSelectorProps {
  readonly value: TQuestionTime
  readonly onChange: (time: TQuestionTime) => void
}

export const TimeSelector = ({ value, onChange }: ITimeSelectorProps) => {
  const handleSelect = (time: TQuestionTime) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onChange(time)
  }

  return (
    <View className="flex-row gap-3">
      {QUESTION_TIMES.map((time) => {
        const isActive = value === time
        return (
          <Pressable
            key={time}
            onPress={() => handleSelect(time)}
            className="flex-1 items-center justify-center py-4 rounded-2xl border"
            style={{
              backgroundColor: isActive ? COLORS.primaryDim : COLORS.surface,
              borderColor: isActive ? COLORS.primary : COLORS.mutedDim,
            }}
          >
            <Text
              className="font-bold text-base"
              style={{ color: isActive ? COLORS.primary : COLORS.muted }}
            >
              {QUESTION_TIME_LABELS[time]}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
