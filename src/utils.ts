import { EasingFunction, Easing, Animated } from 'react-native'

export function createKeyframeEasingFunction(
  keyframes: number[],
  easing: EasingFunction
) {
  return (t: number) => {
    for (
      let keyframeIndex = 1;
      keyframeIndex < keyframes.length;
      keyframeIndex++
    ) {
      if (t < keyframes[keyframeIndex] / 100) {
        const prev = keyframes[keyframeIndex - 1] / 100
        const current =
          (keyframes[keyframeIndex] - keyframes[keyframeIndex - 1]) / 100

        return prev + easing((t - prev) / current) * current
      }
    }
    return t
  }
}

export interface AnimationConfig {
  duration: number
  value: Animated.Value
  keyframes?: number[]
  toValue?: number
  easing?: EasingFunction
  infinite?: boolean
  delay?: number
}

export function anim({
  duration,
  value,
  keyframes = [0, 100],
  easing = Easing.bezier(0.42, 0.0, 0.58, 1.0),
  toValue = 100,
  infinite = true,
  delay = 0,
}: AnimationConfig) {
  const timing = Animated.timing(value, {
    duration: duration,
    easing: createKeyframeEasingFunction(keyframes, easing),
    toValue: toValue,
    useNativeDriver: true,
    delay: delay,
  })
  return infinite ? Animated.loop(timing) : timing
}

export function createAnimatedValues(
  numberOfValues: number,
  initialValue: number = 0
) {
  return Array(numberOfValues)
    .fill(null)
    .map(_ => new Animated.Value(initialValue))
}
