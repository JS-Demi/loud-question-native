import { Pressable, Text } from 'react-native'
import { tv } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import * as Haptics from 'expo-haptics'

const button = tv({
  base: 'items-center justify-center rounded-2xl',
  variants: {
    variant: {
      primary: 'bg-primary',
      ghost: 'bg-surface border border-muted-dim',
      outline: 'bg-transparent border border-primary',
    },
    size: {
      md: 'px-5 py-4',
      sm: 'px-3 py-2',
      icon: 'w-14 h-14',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

const label = tv({
  base: 'font-bold text-center',
  variants: {
    variant: {
      primary: 'text-white text-sm tracking-wide',
      ghost: 'text-muted text-sm',
      outline: 'text-primary text-sm tracking-wide',
    },
  },
  defaultVariants: { variant: 'primary' },
})

interface IButtonProps {
  readonly title: string
  readonly onPress: () => void
  readonly variant?: 'primary' | 'ghost' | 'outline'
  readonly size?: 'md' | 'sm' | 'icon'
  readonly className?: string
  readonly disabled?: boolean
}

export const Button = ({ title, onPress, variant = 'primary', size = 'md', className, disabled }: IButtonProps) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onPress()
  }

  return (
    <Pressable
      className={twMerge(button({ variant, size }), className)}
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => ({ opacity: pressed || disabled ? 0.7 : 1 })}
    >
      <Text className={label({ variant })}>{title}</Text>
    </Pressable>
  )
}
