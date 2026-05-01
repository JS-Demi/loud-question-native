import { ScrollView, Text, View } from 'react-native'
import { useQuestionsStore } from 'entities/question'
import { HostModeToggle, TimeSelector, useSettingsStore } from 'features/settings'
import { COLORS } from 'shared/constants/colors'
import { Card } from 'shared/ui/Card'
import { StyledSafeAreaView } from 'shared/styledSafeAreaView'

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
        <Text className="text-xl font-black tracking-wider uppercase mb-6" style={{ color: COLORS.primary }}>
          Настройки
        </Text>

        <Card className="mb-4">
          <Text className="text-xs uppercase tracking-widest mb-4" style={{ color: COLORS.muted }}>
            Время на вопрос
          </Text>
          <TimeSelector value={timePerQuestion} onChange={setTimePerQuestion} />
        </Card>

        <HostModeToggle value={hostMode} onChange={setHostMode} />

        <Card className="mt-4">
          <Text className="text-xs uppercase tracking-widest mb-3" style={{ color: COLORS.muted }}>
            Статистика базы
          </Text>
          {([
            ['Всего вопросов', questions.length, COLORS.primary],
            ['Лёгких', questions.filter((q) => q.difficulty === 'easy').length, COLORS.easy],
            ['Средних', questions.filter((q) => q.difficulty === 'medium').length, COLORS.medium],
            ['Сложных', questions.filter((q) => q.difficulty === 'hard').length, COLORS.hard],
          ] as [string, number, string][]).map(([label, count, color], i) => (
            <View key={label} className={`flex-row justify-between${i > 0 ? ' mt-2' : ''}`}>
              <Text style={{ color: COLORS.foreground }}>{label}</Text>
              <Text className="font-bold" style={{ color }}>{count}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </StyledSafeAreaView>
  )
}
