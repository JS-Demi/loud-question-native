import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { COLORS } from '@/shared/constants/colors'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'

const EXAMPLE_JSON = `[
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
      <Text className="text-muted text-xs uppercase tracking-widest mb-1">Массовый импорт</Text>
      <Text className="text-muted text-xs mb-4">Вставь JSON-массив вопросов</Text>

      <TextInput
        style={{
          color: COLORS.foreground,
          backgroundColor: COLORS.background,
          borderColor: COLORS.mutedDim,
          borderWidth: 1,
          borderRadius: 12,
          padding: 14,
          fontSize: 12,
          fontFamily: 'monospace',
          minHeight: 140,
        }}
        placeholder={EXAMPLE_JSON}
        placeholderTextColor={`${COLORS.muted}60`}
        value={raw}
        onChangeText={setRaw}
        multiline
        textAlignVertical="top"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <View className="mt-3">
        <Text className="text-muted text-xs mb-3">
          Поля: <Text className="text-secondary">text</Text>, <Text className="text-secondary">answer</Text> — обязательные.{' '}
          <Text className="text-secondary">category</Text>, <Text className="text-secondary">difficulty</Text> — опциональные.
        </Text>
      </View>

      <Button
        title={isImporting ? 'Импорт...' : 'Импортировать'}
        variant="outline"
        onPress={() => { if (raw.trim()) onImport(raw.trim()) }}
        disabled={!raw.trim() || isImporting}
      />
    </Card>
  )
}
