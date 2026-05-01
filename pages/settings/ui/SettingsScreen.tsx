import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HostModeToggle, TimeSelector, useSettings } from '@/features/settings'
import { useQuestions } from '@/entities/question'
import { Card } from '@/shared/ui/Card'

export const SettingsScreen = () => {
  const { settings, setTimePerQuestion, setHostMode } = useSettings()
  const { questions } = useQuestions()

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-primary text-xl font-black tracking-wider uppercase mb-6">
          Настройки
        </Text>

        <Card className="mb-4">
          <Text className="text-muted text-xs uppercase tracking-widest mb-4">Время на вопрос</Text>
          <TimeSelector
            value={settings.timePerQuestion}
            onChange={setTimePerQuestion}
          />
        </Card>

        <HostModeToggle value={settings.hostMode} onChange={setHostMode} />

        <Card className="mt-4">
          <Text className="text-muted text-xs uppercase tracking-widest mb-3">Статистика базы</Text>
          <View className="flex-row justify-between">
            <Text className="text-foreground">Всего вопросов</Text>
            <Text className="text-primary font-bold">{questions.length}</Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-foreground">Лёгких</Text>
            <Text className="text-easy font-bold">
              {questions.filter((q) => q.difficulty === 'easy').length}
            </Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-foreground">Средних</Text>
            <Text className="text-medium font-bold">
              {questions.filter((q) => q.difficulty === 'medium').length}
            </Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-foreground">Сложных</Text>
            <Text className="text-hard font-bold">
              {questions.filter((q) => q.difficulty === 'hard').length}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}
