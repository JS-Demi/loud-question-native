import { Text, View } from 'react-native'
import { DIFFICULTY_LABELS } from 'shared/constants/game'
import { COLORS } from 'shared/constants/colors'
import { TDifficulty } from 'entities/question'

const DIFFICULTY_COLORS: Record<TDifficulty, string> = {
  easy: COLORS.easy,
  medium: COLORS.medium,
  hard: COLORS.hard,
}

interface IDifficultyBadgeProps {
  readonly difficulty: TDifficulty
}

export const DifficultyBadge = ({ difficulty }: IDifficultyBadgeProps) => {
  const color = DIFFICULTY_COLORS[difficulty]
  return (
    <View
      className="px-3 py-1 rounded-full border"
      style={{ backgroundColor: `${color}20`, borderColor: `${color}60` }}
    >
      <Text className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
        {DIFFICULTY_LABELS[difficulty]}
      </Text>
    </View>
  )
}
