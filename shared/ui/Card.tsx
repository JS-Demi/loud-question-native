import { View, ViewStyle } from 'react-native'
import { twMerge } from 'tailwind-merge'

interface ICardProps {
  readonly children: React.ReactNode
  readonly className?: string
  readonly style?: ViewStyle
}

export const Card = ({ children, className, style }: ICardProps) => (
  <View className={twMerge('bg-surface rounded-3xl p-6', className)} style={style}>
    {children}
  </View>
)
