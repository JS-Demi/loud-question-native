import { FlatList, Modal, Pressable, Text, View } from 'react-native'
import { X } from 'lucide-react-native'
import { useThemeColor } from 'heroui-native'
import { tv } from 'tailwind-variants'
import { IQuestion } from 'entities/question'
import { DIFFICULTY_LABELS } from 'shared/constants/game'

const diffBadge = tv({
  base: 'px-2 rounded-full py-0.5',
  variants: {
    difficulty: {
      easy: 'bg-success/15',
      medium: 'bg-warning/15',
      hard: 'bg-danger/15',
    },
  },
})

const diffLabel = tv({
  base: 'text-xs font-bold',
  variants: {
    difficulty: {
      easy: 'text-success',
      medium: 'text-warning',
      hard: 'text-danger',
    },
  },
})

interface IHostQuestionPickerProps {
  readonly visible: boolean
  readonly questions: IQuestion[]
  readonly onSelect: (question: IQuestion) => void
  readonly onClose: () => void
}

export const HostQuestionPicker = ({ visible, questions, onSelect, onClose }: IHostQuestionPickerProps) => {
  const mutedColor = useThemeColor('muted')

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View className="flex-1 bg-background">
        <View className="flex-row items-center justify-between px-5 pt-6 pb-4 border-b border-border">
          <Text className="text-xl font-bold text-foreground">Выбрать вопрос</Text>
          <Pressable onPress={onClose} className="rounded-full p-2 bg-surface">
            <X size={20} color={mutedColor} />
          </Pressable>
        </View>

        <FlatList
          data={questions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => { onSelect(item); onClose() }}
              className="rounded-2xl p-4 bg-surface border border-border"
            >
              <View className="flex-row items-center gap-2 mb-2">
                <View className={diffBadge({ difficulty: item.difficulty })}>
                  <Text className={diffLabel({ difficulty: item.difficulty })}>
                    {DIFFICULTY_LABELS[item.difficulty]}
                  </Text>
                </View>
                <Text className="text-xs text-muted">{item.category}</Text>
              </View>
              <Text className="font-semibold text-sm text-foreground">{item.text}</Text>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  )
}
