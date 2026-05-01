import { Alert, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AddQuestionForm, JsonImportSection, useAddQuestion } from '@/features/add-question'

export const AddQuestionScreen = () => {
  const {
    form, setField,
    isFormValid, isSaving, isImporting,
    save, importJson,
  } = useAddQuestion()

  const handleSave = async () => {
    const ok = await save()
    if (ok) Alert.alert('Сохранено!', 'Вопрос добавлен в базу')
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-primary text-xl font-black tracking-wider uppercase mb-6">
          Добавить вопрос
        </Text>

        <AddQuestionForm
          text={form.text}
          answer={form.answer}
          category={form.category}
          difficulty={form.difficulty}
          isFormValid={isFormValid}
          isSaving={isSaving}
          onChangeText={(v) => setField('text', v)}
          onChangeAnswer={(v) => setField('answer', v)}
          onChangeCategory={(v) => setField('category', v)}
          onChangeDifficulty={(v) => setField('difficulty', v)}
          onSave={handleSave}
        />

        <View className="mt-4">
          <JsonImportSection isImporting={isImporting} onImport={importJson} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
