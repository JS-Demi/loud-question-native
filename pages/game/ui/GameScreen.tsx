import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { List } from 'lucide-react-native'
import {
  DifficultyBadge,
  HostQuestionPicker,
  QuestionCard,
  Timer,
  useGame,
} from '@/features/game'
import { Button } from '@/shared/ui/Button'
import { COLORS } from '@/shared/constants/colors'

export const GameScreen = () => {
  const {
    currentQuestion,
    isAnswerRevealed,
    isTimerRunning,
    timePerQuestion,
    hostMode,
    questions,
    pickRandom,
    pickQuestion,
    revealAnswer,
    nextQuestion,
    onTimerEnd,
  } = useGame()

  const [isPickerVisible, setPickerVisible] = useState(false)

  const hasQuestion = currentQuestion !== null

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-primary text-xl font-black tracking-wider uppercase">
            🎧 Громкий
          </Text>
          {hasQuestion && <DifficultyBadge difficulty={currentQuestion.difficulty} />}
        </View>

        {/* Timer */}
        <View className="items-center mb-6">
          <Timer
            duration={timePerQuestion}
            isRunning={isTimerRunning}
            onComplete={onTimerEnd}
          />
        </View>

        {/* Question or start prompt */}
        {hasQuestion ? (
          <QuestionCard
            question={currentQuestion}
            isAnswerRevealed={isAnswerRevealed}
            onReveal={revealAnswer}
          />
        ) : (
          <View className="items-center justify-center py-16">
            <Text className="text-muted text-base text-center mb-6">
              {questions.length === 0
                ? 'Вопросов нет. Добавь их на вкладке "+"'
                : hostMode
                ? 'Выбери вопрос в режиме ведущего'
                : 'Нажми чтобы начать игру'}
            </Text>
          </View>
        )}

        {/* Bottom controls */}
        <View className="flex-row gap-3 mt-6">
          {hostMode ? (
            <Pressable
              className="bg-surface border border-muted-dim rounded-2xl p-4 items-center justify-center"
              onPress={() => setPickerVisible(true)}
            >
              <List size={22} color={COLORS.muted} />
            </Pressable>
          ) : null}

          <Button
            title={hasQuestion ? 'Следующий вопрос →' : 'Начать игру'}
            onPress={hostMode ? () => setPickerVisible(true) : nextQuestion}
            className="flex-1"
            disabled={questions.length === 0}
          />
        </View>

        {questions.length > 0 && (
          <Text className="text-muted text-xs text-center mt-4">
            {questions.length} вопросов в базе
          </Text>
        )}
      </ScrollView>

      {hostMode && (
        <HostQuestionPicker
          visible={isPickerVisible}
          questions={questions}
          onSelect={pickQuestion}
          onClose={() => setPickerVisible(false)}
        />
      )}
    </SafeAreaView>
  )
}
