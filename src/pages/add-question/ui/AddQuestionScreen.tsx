import { Alert, ScrollView, Text, View } from 'react-native'
import { AddQuestionForm, JsonImportSection, useAddQuestion } from 'features/add-question'
import { COLORS } from 'shared/constants/colors'
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
        <Text className="text-xl font-black tracking-wider uppercase mb-6" style={{ color: COLORS.primary }}>
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
    </StyledSafeAreaView>
  )
}
