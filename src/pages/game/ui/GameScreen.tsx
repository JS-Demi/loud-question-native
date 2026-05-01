import { Button } from 'heroui-native'
import { router } from 'expo-router'
import { List } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useThemeColor } from 'heroui-native'
import { DifficultyBadge, HostQuestionPicker, QuestionCard, Timer, useGame } from 'features/game'
import { StyledSafeAreaView } from 'shared/styledSafeAreaView'

export const GameScreen = () => {
  const {
    currentQuestion,
    isAnswerRevealed,
    isTimerRunning,
    timePerQuestion,
    hostMode,
    questions,
    pickQuestion,
    revealAnswer,
    nextQuestion,
    onTimerEnd,
  } = useGame()

  const mutedColor = useThemeColor('muted')
  const [isPickerVisible, setPickerVisible] = useState(false)
  const hasQuestion = currentQuestion !== null

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-xl font-black tracking-wider uppercase text-accent">
            🎧 Громкий
          </Text>
          <View className="flex-row items-center gap-3">
            {hasQuestion && <DifficultyBadge difficulty={currentQuestion.difficulty} />}
            <Pressable onPress={() => router.back()}>
              <Text className="text-muted text-sm">Закончить</Text>
            </Pressable>
          </View>
        </View>

        {/* Timer */}
        <View className="items-center mb-6">
          <Timer duration={timePerQuestion} isRunning={isTimerRunning} onComplete={onTimerEnd} />
        </View>

        {/* Question or empty state */}
        {hasQuestion ? (
          <QuestionCard
            question={currentQuestion}
            isAnswerRevealed={isAnswerRevealed}
            onReveal={revealAnswer}
          />
        ) : (
          <View className="items-center justify-center py-16">
            <Text className="text-base text-center mb-6 text-muted">
              {questions.length === 0
                ? 'Вопросов нет. Вернись и добавь их.'
                : hostMode
                  ? 'Выбери вопрос в режиме ведущего'
                  : 'Загрузка вопроса...'}
            </Text>
          </View>
        )}

        {/* Bottom controls */}
        <View className="flex-row gap-3 mt-6">
          {hostMode && (
            <Pressable
              className="rounded-2xl p-4 items-center justify-center bg-surface border border-border"
              onPress={() => setPickerVisible(true)}
            >
              <List size={22} color={mutedColor} />
            </Pressable>
          )}
          <Button
            className="flex-1"
            variant="primary"
            isDisabled={questions.length === 0}
            onPress={hostMode ? () => setPickerVisible(true) : nextQuestion}
          >
            {hasQuestion ? 'Следующий вопрос →' : 'Начать'}
          </Button>
        </View>

        {questions.length > 0 && (
          <Text className="text-xs text-center mt-4 text-muted">
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
    </StyledSafeAreaView>
  )
}
