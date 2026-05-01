import * as Haptics from 'expo-haptics'
import { Button } from 'heroui-native'
import { Pressable, Text, TextInput, View } from 'react-native'
import { TDifficulty } from 'entities/question'
import { COLORS } from 'shared/constants/colors'
import { DIFFICULTY_LABELS } from 'shared/constants/game'
import { Card } from 'shared/ui/Card'

const DIFFICULTIES: TDifficulty[] = ['easy', 'medium', 'hard']

const DIFFICULTY_COLOR: Record<TDifficulty, string> = {
  easy: COLORS.easy,
  medium: COLORS.medium,
  hard: COLORS.hard,
}

const inputStyle = {
  color: COLORS.foreground,
  backgroundColor: COLORS.background,
  borderColor: COLORS.mutedDim,
  borderWidth: 1,
  borderRadius: 12,
  padding: 14,
  fontSize: 15,
}

interface IAddQuestionFormProps {
  readonly text: string
  readonly answer: string
  readonly category: string
  readonly difficulty: TDifficulty
  readonly isFormValid: boolean
  readonly isSaving: boolean
  readonly onChangeText: (v: string) => void
  readonly onChangeAnswer: (v: string) => void
  readonly onChangeCategory: (v: string) => void
  readonly onChangeDifficulty: (v: TDifficulty) => void
  readonly onSave: () => void
}

export const AddQuestionForm = ({
  text, answer, category, difficulty,
  isFormValid, isSaving,
  onChangeText, onChangeAnswer, onChangeCategory, onChangeDifficulty, onSave,
}: IAddQuestionFormProps) => (
  <Card>
    <Text className="text-xs uppercase tracking-widest mb-4" style={{ color: COLORS.muted }}>
      Новый вопрос
    </Text>

    <Text className="font-semibold mb-2" style={{ color: COLORS.foreground }}>Вопрос *</Text>
    <TextInput
      style={inputStyle}
      placeholder="Введи текст вопроса..."
      placeholderTextColor={COLORS.muted}
      value={text}
      onChangeText={onChangeText}
      multiline
      numberOfLines={3}
      textAlignVertical="top"
    />

    <Text className="font-semibold mt-4 mb-2" style={{ color: COLORS.foreground }}>Ответ *</Text>
    <TextInput
      style={inputStyle}
      placeholder="Правильный ответ..."
      placeholderTextColor={COLORS.muted}
      value={answer}
      onChangeText={onChangeAnswer}
    />

    <Text className="font-semibold mt-4 mb-2" style={{ color: COLORS.foreground }}>Категория</Text>
    <TextInput
      style={inputStyle}
      placeholder="Наука, Спорт, История..."
      placeholderTextColor={COLORS.muted}
      value={category}
      onChangeText={onChangeCategory}
    />

    <Text className="font-semibold mt-4 mb-2" style={{ color: COLORS.foreground }}>Сложность</Text>
    <View className="flex-row gap-3">
      {DIFFICULTIES.map((d) => {
        const isActive = difficulty === d
        const color = DIFFICULTY_COLOR[d]
        return (
          <Pressable
            key={d}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              onChangeDifficulty(d)
            }}
            className="flex-1 items-center py-3 rounded-2xl border"
            style={{
              backgroundColor: isActive ? `${color}20` : COLORS.background,
              borderColor: isActive ? color : COLORS.mutedDim,
            }}
          >
            <Text className="font-bold text-sm" style={{ color: isActive ? color : COLORS.muted }}>
              {DIFFICULTY_LABELS[d]}
            </Text>
          </Pressable>
        )
      })}
    </View>

    <Button
      className="mt-5"
      variant="primary"
      isDisabled={!isFormValid || isSaving}
      onPress={onSave}
    >
      {isSaving ? 'Сохранение...' : 'Сохранить вопрос'}
    </Button>
  </Card>
)
