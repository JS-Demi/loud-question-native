import { router } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { tv } from 'tailwind-variants'
import { useQuestionsStore } from 'entities/question'
import { HostModeToggle, TimeSelector, useSettingsStore } from 'features/settings'
import { Card } from 'shared/ui/Card'
import { StyledSafeAreaView } from 'shared/styledSafeAreaView'

const statCount = tv({
  base: 'font-bold',
  variants: {
    kind: {
      total: 'text-accent',
      easy: 'text-success',
      medium: 'text-warning',
      hard: 'text-danger',
    },
  },
})

export const SettingsScreen = () => {
  const timePerQuestion = useSettingsStore((s) => s.timePerQuestion)
  const hostMode = useSettingsStore((s) => s.hostMode)
  const setTimePerQuestion = useSettingsStore((s) => s.setTimePerQuestion)
  const setHostMode = useSettingsStore((s) => s.setHostMode)
  const questions = useQuestionsStore((s) => s.questions)

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center gap-3 mb-6">
          <Pressable onPress={() => router.back()}>
            <Text className="text-muted text-sm">← Назад</Text>
          </Pressable>
          <Text className="text-xl font-black tracking-wider uppercase text-accent">
            Настройки
          </Text>
        </View>

        <Card className="mb-4">
          <Text className="text-xs uppercase tracking-widest mb-4 text-muted">
            Время на вопрос
          </Text>
          <TimeSelector value={timePerQuestion} onChange={setTimePerQuestion} />
        </Card>

        <HostModeToggle value={hostMode} onChange={setHostMode} />

        <Card className="mt-4">
          <Text className="text-xs uppercase tracking-widest mb-3 text-muted">
            Статистика базы
          </Text>
          <View className="flex-row justify-between">
            <Text className="text-foreground">Всего вопросов</Text>
            <Text className={statCount({ kind: 'total' })}>{questions.length}</Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-foreground">Лёгких</Text>
            <Text className={statCount({ kind: 'easy' })}>
              {questions.filter((q) => q.difficulty === 'easy').length}
            </Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-foreground">Средних</Text>
            <Text className={statCount({ kind: 'medium' })}>
              {questions.filter((q) => q.difficulty === 'medium').length}
            </Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-foreground">Сложных</Text>
            <Text className={statCount({ kind: 'hard' })}>
              {questions.filter((q) => q.difficulty === 'hard').length}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </StyledSafeAreaView>
  )
}
