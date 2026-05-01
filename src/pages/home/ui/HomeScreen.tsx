import { Button } from 'heroui-native'
import { router } from 'expo-router'
import { Text, View } from 'react-native'
import { useQuestionsStore } from 'entities/question'
import { StyledSafeAreaView } from 'shared/styledSafeAreaView'

export const HomeScreen = () => {
  const questions = useQuestionsStore((s) => s.questions)

  return (
    <StyledSafeAreaView className="flex-1 bg-background px-6 justify-between py-8">
      {/* Header */}
      <View className="items-center mt-10">
        <Text className="text-6xl mb-4">🎧</Text>
        <Text className="text-4xl font-black uppercase tracking-widest text-accent">
          Громкий
        </Text>
        <Text className="text-4xl font-black uppercase tracking-widest text-foreground">
          Вопрос
        </Text>
        <Text className="text-muted text-sm mt-3 text-center">
          {questions.length > 0
            ? `${questions.length} вопросов в базе`
            : 'Добавь вопросы чтобы начать'}
        </Text>
      </View>

      {/* Actions */}
      <View className="gap-4">
        <Button
          size="lg"
          variant="primary"
          isDisabled={questions.length === 0}
          onPress={() => router.push('/game')}
        >
          Начать игру
        </Button>

        <Button
          size="lg"
          variant="secondary"
          onPress={() => router.push('/add')}
        >
          Добавить вопросы
        </Button>

        <Button
          size="lg"
          variant="ghost"
          onPress={() => router.push('/settings')}
        >
          Настройки
        </Button>
      </View>
    </StyledSafeAreaView>
  )
}
