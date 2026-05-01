import * as Haptics from 'expo-haptics'
import { Pressable, Text, View } from 'react-native'
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { IQuestion } from 'entities/question'
import { Card } from 'shared/ui/Card'
import { COLORS } from 'shared/constants/colors'

interface IQuestionCardProps {
  readonly question: IQuestion
  readonly isAnswerRevealed: boolean
  readonly onReveal: () => void
}

export const QuestionCard = ({ question, isAnswerRevealed, onReveal }: IQuestionCardProps) => {
  const blurOpacity = useSharedValue(1)

  const handleReveal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    blurOpacity.value = withSequence(withTiming(0, { duration: 150 }), withTiming(1, { duration: 150 }))
    onReveal()
  }

  const answerAnimStyle = useAnimatedStyle(() => ({ opacity: blurOpacity.value }))

  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <Card style={{ borderWidth: 1, borderColor: COLORS.primaryBorder }}>
        <Text
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: `${COLORS.primary}99` }}
        >
          Вопрос
        </Text>

        <Text className="text-xl font-bold leading-relaxed" style={{ color: COLORS.foreground }}>
          {question.text}
        </Text>

        <View className="mt-5">
          {isAnswerRevealed ? (
            <Animated.View
              style={[answerAnimStyle, { backgroundColor: COLORS.primaryDim, borderColor: COLORS.primaryBorder, borderWidth: 1, borderRadius: 16, padding: 16 }]}
            >
              <Text className="text-xs uppercase tracking-widest mb-1" style={{ color: `${COLORS.primary}99` }}>
                Ответ
              </Text>
              <Text className="text-base font-bold" style={{ color: COLORS.foreground }}>
                {question.answer}
              </Text>
            </Animated.View>
          ) : (
            <Pressable
              onPress={handleReveal}
              className="items-center rounded-2xl p-4"
              style={{ backgroundColor: COLORS.mutedDim, borderWidth: 1, borderStyle: 'dashed', borderColor: COLORS.mutedDim }}
            >
              <View style={{ opacity: 0.15 }}>
                <Text className="text-base text-center" style={{ color: COLORS.foreground }}>
                  {question.answer}
                </Text>
              </View>
              <Text className="text-xs uppercase tracking-widest mt-2" style={{ color: COLORS.muted }}>
                Нажми чтобы открыть ответ
              </Text>
            </Pressable>
          )}
        </View>

        <View className="flex-row gap-2 mt-4">
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: COLORS.secondaryDim, borderWidth: 1, borderColor: `${COLORS.secondary}40` }}
          >
            <Text className="text-xs" style={{ color: COLORS.secondary }}>
              {question.category}
            </Text>
          </View>
        </View>
      </Card>
    </Animated.View>
  )
}
