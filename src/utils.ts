import { EasingFunction, Easing, Animated, Platform } from 'react-native'

function createKeyframeEasingFunction(
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

interface AnimationConfig {
  duration: number
  value: Animated.Value
  keyframes?: number[]
  toValue?: number
  easing?: EasingFunction
}

function loop({
  duration,
  value,
  keyframes = [0, 100],
  easing = Easing.bezier(0.42, 0.0, 0.58, 1.0),
  toValue = 100,
}: AnimationConfig) {
  const timing = Animated.timing(value, {
    duration: duration,
    easing: createKeyframeEasingFunction(keyframes, easing),
    toValue: toValue,
    useNativeDriver: Platform.OS !== 'web',
  })

  return Animated.loop(timing)
}

function stagger(
  time: number,
  amount: number,
  animationConfig: AnimationConfig
) {
  const {
    duration,
    value,
    keyframes = [0, 100],
    easing = Easing.bezier(0.42, 0.0, 0.58, 1.0),
    toValue = 100,
  } = animationConfig
  const easingFunction = createKeyframeEasingFunction(keyframes, easing)

  if (Platform.OS === 'web') {
    const values = new Array(amount)
      .fill(null)
      .map((_) => new Animated.Value(0))

    const animations = values.map((value) =>
      loop({
        value,
        duration,
        easing,
        toValue,
        keyframes,
      })
    )

    const animation = Animated.stagger(time, animations)

    return { animation, values }
  }

  const timing = Animated.timing(value, {
    duration: duration,
    easing: easingFunction,
    toValue: toValue,
    useNativeDriver: true,
  })

  const animation = Animated.loop(timing)

  // React Native only does 60fps
  // https://github.com/facebook/react-native/blob/d3980dceab90b118cc7f69696967aa7f8d4388d9/Libraries/Animated/src/animations/TimingAnimation.js#L78
  const frameDuration = 1000.0 / 60.0
  const inputRange: number[] = []
  const numFrames = Math.round(animationConfig.duration / frameDuration)

  for (let frame = 0; frame < numFrames; frame++) {
    inputRange.push(easingFunction(frame / numFrames) * 100)
  }

  const values = []
  for (let index = amount - 1; index >= 0; index--) {
    const delayedFrames = Math.round(
      ((index * time) / animationConfig.duration) * numFrames
    )
    const outputRange = inputRange
      .slice(delayedFrames)
      .concat(inputRange.slice(0, delayedFrames))

    const value =
      index === 0
        ? animationConfig.value
        : animationConfig.value.interpolate({ inputRange, outputRange })
    values.push(value)
  }

  return { animation, values }
}

export { loop, stagger, AnimationConfig }
