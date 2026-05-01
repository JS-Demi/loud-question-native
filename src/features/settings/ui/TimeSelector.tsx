import * as Haptics from 'expo-haptics'
import { Pressable, Text, View } from 'react-native'
import { tv } from 'tailwind-variants'
import { QUESTION_TIME_LABELS, QUESTION_TIMES } from 'shared/constants/game'
import { TQuestionTime } from '../types'

const btn = tv({
  base: 'flex-1 items-center justify-center py-4 rounded-2xl border',
  variants: {
    active: {
      true: 'bg-accent/15 border-accent/60',
      false: 'bg-surface border-border',
    },
  },
})

const label = tv({
  base: 'font-bold text-base',
  variants: {
    active: {
      true: 'text-accent',
      false: 'text-muted',
    },
  },
})

interface ITimeSelectorProps {
  readonly value: TQuestionTime
  readonly onChange: (time: TQuestionTime) => void
}

export const TimeSelector = ({ value, onChange }: ITimeSelectorProps) => (
  <View className="flex-row gap-3">
    {QUESTION_TIMES.map((time) => {
      const active = value === time
      return (
        <Pressable
          key={time}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            onChange(time)
          }}
          className={btn({ active })}
        >
          <Text className={label({ active })}>{QUESTION_TIME_LABELS[time]}</Text>
        </Pressable>
      )
    })}
  </View>
)
