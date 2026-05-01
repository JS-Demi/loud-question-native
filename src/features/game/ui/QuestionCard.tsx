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
      <Card className="border border-accent/20">
        <Text className="text-xs font-bold uppercase tracking-widest mb-4 text-accent/60">
          Вопрос
        </Text>

        <Text className="text-xl font-bold leading-relaxed text-foreground">
          {question.text}
        </Text>

        <View className="mt-5">
          {isAnswerRevealed ? (
            <Animated.View
              style={answerAnimStyle}
              className="bg-accent/15 border border-accent/20 rounded-2xl p-4"
            >
              <Text className="text-xs uppercase tracking-widest mb-1 text-accent/60">Ответ</Text>
              <Text className="text-base font-bold text-foreground">{question.answer}</Text>
            </Animated.View>
          ) : (
            <Pressable
              onPress={handleReveal}
              className="items-center rounded-2xl p-4 bg-border border border-border"
            >
              <View className="opacity-15">
                <Text className="text-base text-center text-foreground">{question.answer}</Text>
              </View>
              <Text className="text-xs uppercase tracking-widest mt-2 text-muted">
                Нажми чтобы открыть ответ
              </Text>
            </Pressable>
          )}
        </View>

        <View className="flex-row gap-2 mt-4">
          <View className="bg-neon-secondary/10 border border-neon-secondary/30 px-3 py-1 rounded-full">
            <Text className="text-xs text-neon-secondary">{question.category}</Text>
          </View>
        </View>
      </Card>
    </Animated.View>
  )
}
