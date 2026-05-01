import { Pressable, Text, View } from 'react-native'
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import { IQuestion } from '@/entities/question'
import { Card } from '@/shared/ui/Card'
import { COLORS } from '@/shared/constants/colors'

interface IQuestionCardProps {
  readonly question: IQuestion
  readonly isAnswerRevealed: boolean
  readonly onReveal: () => void
}

export const QuestionCard = ({ question, isAnswerRevealed, onReveal }: IQuestionCardProps) => {
  const blurOpacity = useSharedValue(1)

  const handleReveal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    blurOpacity.value = withSequence(
      withTiming(0, { duration: 200 }),
      withTiming(1, { duration: 200 }),
    )
    onReveal()
  }

  const answerStyle = useAnimatedStyle(() => ({
    opacity: blurOpacity.value,
  }))

  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <Card className="border border-primary/20" style={{ shadowColor: COLORS.primary, shadowOpacity: 0.08, shadowRadius: 20 }}>
        <Text
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: `${COLORS.primary}99` }}
        >
          Вопрос
        </Text>

        <Text className="text-foreground text-xl font-bold leading-relaxed">
          {question.text}
        </Text>

        <View className="mt-5">
          {isAnswerRevealed ? (
            <Animated.View
              style={answerStyle}
              className="bg-primary/10 border border-primary/30 rounded-2xl p-4"
            >
              <Text className="text-xs text-primary/60 uppercase tracking-widest mb-1">Ответ</Text>
              <Text className="text-foreground text-base font-bold">{question.answer}</Text>
            </Animated.View>
          ) : (
            <Pressable
              onPress={handleReveal}
              className="bg-muted-dim border border-dashed border-muted-dim rounded-2xl p-4 items-center"
            >
              <View className="items-center" style={{ filter: 'blur(6px)' } as object}>
                <Text className="text-foreground/20 text-base text-center">{question.answer}</Text>
              </View>
              <Text className="text-muted text-xs uppercase tracking-widest mt-1">
                Нажми чтобы открыть ответ
              </Text>
            </Pressable>
          )}
        </View>

        <View className="flex-row gap-2 mt-4">
          <View className="bg-secondary-dim border border-secondary/30 rounded-full px-3 py-1">
            <Text className="text-secondary text-xs">{question.category}</Text>
          </View>
        </View>
      </Card>
    </Animated.View>
  )
}
