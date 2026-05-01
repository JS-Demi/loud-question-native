import * as Haptics from 'expo-haptics'
import { Button } from 'heroui-native'
import { Pressable, Text, TextInput, View } from 'react-native'
import { tv } from 'tailwind-variants'
import { TDifficulty } from 'entities/question'
import { DIFFICULTY_LABELS } from 'shared/constants/game'
import { Card } from 'shared/ui/Card'

const DIFFICULTIES: TDifficulty[] = ['easy', 'medium', 'hard']

const diffBtn = tv({
  base: 'flex-1 items-center py-3 rounded-2xl border',
  variants: {
    difficulty: { easy: '', medium: '', hard: '' },
    active: { true: '', false: 'border-border bg-background' },
  },
  compoundVariants: [
    { difficulty: 'easy', active: true, class: 'bg-success/10 border-success' },
    { difficulty: 'medium', active: true, class: 'bg-warning/10 border-warning' },
    { difficulty: 'hard', active: true, class: 'bg-danger/10 border-danger' },
  ],
})

const diffLabel = tv({
  base: 'font-bold text-sm',
  variants: {
    difficulty: { easy: '', medium: '', hard: '' },
    active: { true: '', false: 'text-muted' },
  },
  compoundVariants: [
    { difficulty: 'easy', active: true, class: 'text-success' },
    { difficulty: 'medium', active: true, class: 'text-warning' },
    { difficulty: 'hard', active: true, class: 'text-danger' },
  ],
})

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
    <Text className="text-xs uppercase tracking-widest mb-4 text-muted">Новый вопрос</Text>

    <Text className="font-semibold mb-2 text-foreground">Вопрос *</Text>
    <TextInput
      className="text-foreground bg-background border border-border rounded-xl p-4 text-base"
      placeholder="Введи текст вопроса..."
      placeholderTextColor="rgba(255,255,255,0.35)"
      value={text}
      onChangeText={onChangeText}
      multiline
      numberOfLines={3}
      textAlignVertical="top"
    />

    <Text className="font-semibold mt-4 mb-2 text-foreground">Ответ *</Text>
    <TextInput
      className="text-foreground bg-background border border-border rounded-xl p-4 text-base"
      placeholder="Правильный ответ..."
      placeholderTextColor="rgba(255,255,255,0.35)"
      value={answer}
      onChangeText={onChangeAnswer}
    />

    <Text className="font-semibold mt-4 mb-2 text-foreground">Категория</Text>
    <TextInput
      className="text-foreground bg-background border border-border rounded-xl p-4 text-base"
      placeholder="Наука, Спорт, История..."
      placeholderTextColor="rgba(255,255,255,0.35)"
      value={category}
      onChangeText={onChangeCategory}
    />

    <Text className="font-semibold mt-4 mb-2 text-foreground">Сложность</Text>
    <View className="flex-row gap-3">
      {DIFFICULTIES.map((d) => {
        const active = difficulty === d
        return (
          <Pressable
            key={d}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              onChangeDifficulty(d)
            }}
            className={diffBtn({ difficulty: d, active })}
          >
            <Text className={diffLabel({ difficulty: d, active })}>{DIFFICULTY_LABELS[d]}</Text>
          </Pressable>
        )
      })}
    </View>

    <Button className="mt-5" variant="primary" isDisabled={!isFormValid || isSaving} onPress={onSave}>
      {isSaving ? 'Сохранение...' : 'Сохранить вопрос'}
    </Button>
  </Card>
)
