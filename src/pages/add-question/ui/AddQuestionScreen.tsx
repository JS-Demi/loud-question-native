import { router } from 'expo-router'
import { Alert, Pressable, ScrollView, Text, View } from 'react-native'
import { AddQuestionForm, JsonImportSection, useAddQuestion } from 'features/add-question'
import { StyledSafeAreaView } from 'shared/styledSafeAreaView'

export const AddQuestionScreen = () => {
  const { form, setField, isFormValid, isSaving, isImporting, save, importJson } = useAddQuestion()

  const handleSave = async () => {
    const ok = await save()
    if (ok) Alert.alert('Сохранено!', 'Вопрос добавлен в базу')
  }

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row items-center gap-3 mb-6">
          <Pressable onPress={() => router.back()}>
            <Text className="text-muted text-sm">← Назад</Text>
          </Pressable>
          <Text className="text-xl font-black tracking-wider uppercase text-accent">
            Добавить вопрос
          </Text>
        </View>

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
    </StyledSafeAreaView>
  )
}
