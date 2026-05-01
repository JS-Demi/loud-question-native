import { Button } from 'heroui-native'
import { useState } from 'react'
import { Text, TextInput } from 'react-native'
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
      <Text className="text-xs uppercase tracking-widest mb-1 text-muted">Массовый импорт</Text>
      <Text className="text-xs mb-4 text-muted">Вставь JSON-массив вопросов</Text>

      <TextInput
        className="text-foreground bg-background border border-border rounded-xl p-4 text-xs"
        style={{ minHeight: 140 }}
        placeholder={EXAMPLE}
        placeholderTextColor="rgba(255,255,255,0.2)"
        value={raw}
        onChangeText={setRaw}
        multiline
        textAlignVertical="top"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <Text className="text-xs mt-3 mb-3 text-muted">
        {'Поля: '}
        <Text className="text-neon-secondary">text</Text>
        {', '}
        <Text className="text-neon-secondary">answer</Text>
        {' — обязательные. '}
        <Text className="text-neon-secondary">category</Text>
        {', '}
        <Text className="text-neon-secondary">difficulty</Text>
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
