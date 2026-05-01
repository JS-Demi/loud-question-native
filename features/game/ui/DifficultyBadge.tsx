import { Text, View } from 'react-native'
import { tv } from 'tailwind-variants'
import { DIFFICULTY_LABELS } from '@/shared/constants/game'
import { TDifficulty } from '@/entities/question'

const badge = tv({
  base: 'px-3 py-1 rounded-full border',
  variants: {
    difficulty: {
      easy: 'bg-easy/10 border-easy/40',
      medium: 'bg-medium/10 border-medium/40',
      hard: 'bg-hard/10 border-hard/40',
    },
  },
})

const text = tv({
  base: 'text-xs font-bold uppercase tracking-widest',
  variants: {
    difficulty: {
      easy: 'text-easy',
      medium: 'text-medium',
      hard: 'text-hard',
    },
  },
})

interface IDifficultyBadgeProps {
  readonly difficulty: TDifficulty
}

export const DifficultyBadge = ({ difficulty }: IDifficultyBadgeProps) => (
  <View className={badge({ difficulty })}>
    <Text className={text({ difficulty })}>{DIFFICULTY_LABELS[difficulty]}</Text>
  </View>
)
