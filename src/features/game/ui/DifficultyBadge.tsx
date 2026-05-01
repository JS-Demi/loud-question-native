import { Text, View } from 'react-native'
import { tv } from 'tailwind-variants'
import { DIFFICULTY_LABELS } from 'shared/constants/game'
import { TDifficulty } from 'entities/question'

const badge = tv({
  base: 'px-3 py-1 rounded-full border',
  variants: {
    difficulty: {
      easy: 'bg-success/10 border-success/40',
      medium: 'bg-warning/10 border-warning/40',
      hard: 'bg-danger/10 border-danger/40',
    },
  },
})

const label = tv({
  base: 'text-xs font-bold uppercase tracking-widest',
  variants: {
    difficulty: {
      easy: 'text-success',
      medium: 'text-warning',
      hard: 'text-danger',
    },
  },
})

interface IDifficultyBadgeProps {
  readonly difficulty: TDifficulty
}

export const DifficultyBadge = ({ difficulty }: IDifficultyBadgeProps) => (
  <View className={badge({ difficulty })}>
    <Text className={label({ difficulty })}>{DIFFICULTY_LABELS[difficulty]}</Text>
  </View>
)
