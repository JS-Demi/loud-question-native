import { FlatList, Modal, Pressable, Text, View } from 'react-native'
import { X } from 'lucide-react-native'
import { IQuestion } from 'entities/question'
import { COLORS } from 'shared/constants/colors'
import { DIFFICULTY_LABELS } from 'shared/constants/game'

interface IHostQuestionPickerProps {
  readonly visible: boolean
  readonly questions: IQuestion[]
  readonly onSelect: (question: IQuestion) => void
  readonly onClose: () => void
}

export const HostQuestionPicker = ({ visible, questions, onSelect, onClose }: IHostQuestionPickerProps) => {
  const DIFFICULTY_COLOR = {
    easy: COLORS.easy,
    medium: COLORS.medium,
    hard: COLORS.hard,
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View className="flex-1" style={{ backgroundColor: COLORS.background }}>
        <View
          className="flex-row items-center justify-between px-5 pt-6 pb-4"
          style={{ borderBottomWidth: 1, borderBottomColor: COLORS.mutedDim }}
        >
          <Text className="text-xl font-bold" style={{ color: COLORS.foreground }}>
            Выбрать вопрос
          </Text>
          <Pressable onPress={onClose} className="rounded-full p-2" style={{ backgroundColor: COLORS.surface }}>
            <X size={20} color={COLORS.muted} />
          </Pressable>
        </View>

        <FlatList
          data={questions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item }) => {
            const color = DIFFICULTY_COLOR[item.difficulty]
            return (
              <Pressable
                onPress={() => { onSelect(item); onClose() }}
                className="rounded-2xl p-4"
                style={{ backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.mutedDim }}
              >
                <View className="flex-row items-center gap-2 mb-2">
                  <View
                    className="px-2 rounded-full"
                    style={{ paddingVertical: 2, backgroundColor: `${color}20` }}
                  >
                    <Text className="text-xs font-bold" style={{ color }}>
                      {DIFFICULTY_LABELS[item.difficulty]}
                    </Text>
                  </View>
                  <Text className="text-xs" style={{ color: COLORS.muted }}>
                    {item.category}
                  </Text>
                </View>
                <Text className="font-semibold text-sm" style={{ color: COLORS.foreground }}>
                  {item.text}
                </Text>
              </Pressable>
            )
          }}
        />
      </View>
    </Modal>
  )
}
