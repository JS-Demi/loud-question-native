import { FlatList, Modal, Pressable, Text, View } from 'react-native'
import { X } from 'lucide-react-native'
import { IQuestion } from '@/entities/question'
import { COLORS } from '@/shared/constants/colors'
import { DIFFICULTY_LABELS } from '@/shared/constants/game'

interface IHostQuestionPickerProps {
  readonly visible: boolean
  readonly questions: IQuestion[]
  readonly onSelect: (question: IQuestion) => void
  readonly onClose: () => void
}

export const HostQuestionPicker = ({ visible, questions, onSelect, onClose }: IHostQuestionPickerProps) => (
  <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-5 pt-6 pb-4 border-b border-muted-dim">
        <Text className="text-foreground text-xl font-bold">Выбрать вопрос</Text>
        <Pressable onPress={onClose} className="bg-surface rounded-full p-2">
          <X size={20} color={COLORS.muted} />
        </Pressable>
      </View>

      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => { onSelect(item); onClose() }}
            className="bg-surface rounded-2xl p-4 border border-muted-dim active:border-primary"
          >
            <View className="flex-row items-center gap-2 mb-2">
              <View
                className="px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor:
                    item.difficulty === 'easy' ? `${COLORS.easy}20`
                    : item.difficulty === 'medium' ? `${COLORS.medium}20`
                    : `${COLORS.hard}20`,
                }}
              >
                <Text
                  className="text-xs font-bold"
                  style={{
                    color:
                      item.difficulty === 'easy' ? COLORS.easy
                      : item.difficulty === 'medium' ? COLORS.medium
                      : COLORS.hard,
                  }}
                >
                  {DIFFICULTY_LABELS[item.difficulty]}
                </Text>
              </View>
              <Text className="text-muted text-xs">{item.category}</Text>
            </View>
            <Text className="text-foreground font-semibold text-sm">{item.text}</Text>
          </Pressable>
        )}
      />
    </View>
  </Modal>
)
