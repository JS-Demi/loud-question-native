import { useEffect } from 'react'
import { Text, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Circle, Svg } from 'react-native-svg'
import { useTimerCountdown } from '../model/useTimerCountdown'
import { COLORS } from '@/shared/constants/colors'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const SIZE = 140
const STROKE_WIDTH = 6
const RADIUS = (SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface ITimerProps {
  readonly duration: number
  readonly isRunning: boolean
  readonly onComplete?: () => void
}

export const Timer = ({ duration, isRunning, onComplete }: ITimerProps) => {
  const progress = useSharedValue(1)
  const { timeLeft, reset } = useTimerCountdown({ duration, isRunning, onComplete })

  useEffect(() => {
    if (isRunning) {
      progress.value = 1
      progress.value = withTiming(0, {
        duration: duration * 1000,
        easing: Easing.linear,
      })
    } else {
      // freeze the ring where it is
      progress.value = progress.value
    }
  }, [isRunning, duration])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }))

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`

  const isLow = timeLeft <= 15 && isRunning

  return (
    <View className="items-center justify-center" style={{ width: SIZE, height: SIZE }}>
      <Svg width={SIZE} height={SIZE} style={{ position: 'absolute' }}>
        {/* Track */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={COLORS.surface}
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        {/* Progress */}
        <AnimatedCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={isLow ? COLORS.danger : COLORS.primary}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />
      </Svg>
      <Text
        className="font-bold"
        style={{ color: isLow ? COLORS.danger : COLORS.primary, fontSize: 28 }}
      >
        {timeStr}
      </Text>
    </View>
  )
}
