import { Button } from 'heroui-native'
import { useState } from 'react'
import { Text, TextInput } from 'react-native'
import { COLORS } from 'shared/constants/colors'
import { Card } from 'shared/ui/Card'

const EXAMPLE = `[
  {
    "text": "В чём измеряется сила тока?",
    "answer": "Амперы (А)",
    "category": "Физика",
    "difficulty": "easy"
  }
]`

interface IJsonImportSectionProps {
  readonly isImporting: boolean
  readonly onImport: (raw: string) => void
}

export const JsonImportSection = ({ isImporting, onImport }: IJsonImportSectionProps) => {
  const [raw, setRaw] = useState('')

  return (
    <Card>
      <Text className="text-xs uppercase tracking-widest mb-1" style={{ color: COLORS.muted }}>
        Массовый импорт
      </Text>
      <Text className="text-xs mb-4" style={{ color: COLORS.muted }}>
        Вставь JSON-массив вопросов
      </Text>

      <TextInput
        style={{
          color: COLORS.foreground,
          backgroundColor: COLORS.background,
          borderColor: COLORS.mutedDim,
          borderWidth: 1,
          borderRadius: 12,
          padding: 14,
          fontSize: 12,
          minHeight: 140,
        }}
        placeholder={EXAMPLE}
        placeholderTextColor={`${COLORS.muted}60`}
        value={raw}
        onChangeText={setRaw}
        multiline
        textAlignVertical="top"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <Text className="text-xs mt-3 mb-3" style={{ color: COLORS.muted }}>
        {'Поля: '}
        <Text style={{ color: COLORS.secondary }}>text</Text>
        {', '}
        <Text style={{ color: COLORS.secondary }}>answer</Text>
        {' — обязательные. '}
        <Text style={{ color: COLORS.secondary }}>category</Text>
        {', '}
        <Text style={{ color: COLORS.secondary }}>difficulty</Text>
        {' — опциональные.'}
      </Text>

      <Button
        variant="ghost"
        isDisabled={!raw.trim() || isImporting}
        onPress={() => { if (raw.trim()) onImport(raw.trim()) }}
      >
        {isImporting ? 'Импорт...' : 'Импортировать'}
      </Button>
    </Card>
  )
}
