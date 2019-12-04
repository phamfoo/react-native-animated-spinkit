import * as React from 'react'
import { Animated, Easing } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { anim, stagger } from './utils'

export default class Chase extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps

  chase = new Animated.Value(0)
  chaseDot = new Animated.Value(0)
  chaseDotValues: Animated.AnimatedInterpolation[]
  chaseDotBefore = new Animated.Value(0)
  chaseDotBeforeValues: Animated.AnimatedInterpolation[]
  animation: Animated.CompositeAnimation

  constructor(props: SpinnerProps) {
    super(props)

    const { animation: chaseDotAnimation, values: chaseDotValues } = stagger(
      100,
      6,
      {
        duration: 2000,
        value: this.chaseDot,
        keyframes: [0, 80, 100],
      }
    )
    this.chaseDotValues = chaseDotValues

    const {
      animation: chaseDotBeforeAnimation,
      values: chaseDotBeforeValues,
    } = stagger(100, 6, {
      duration: 2000,
      value: this.chaseDot,
      keyframes: [0, 80, 100],
    })
    this.chaseDotBeforeValues = chaseDotBeforeValues

    const chaseAnimation = anim({
      duration: 2500,
      easing: Easing.linear,
      value: this.chase,
    })

    this.animation = Animated.parallel([
      chaseAnimation,
      chaseDotAnimation,
      chaseDotBeforeAnimation,
    ])
  }

  render() {
    const { size, color, style, ...rest } = this.props
    const circleStyle = {
      position: 'absolute',
      width: size / 4,
      height: size / 4,
      backgroundColor: color,
      borderRadius: size / 8,
    }
    return (
      <AnimationContainer animation={this.animation}>
        <Animated.View
          style={[
            {
              width: size,
              height: size,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [
                {
                  rotate: this.chase.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
            style,
          ]}
          {...rest}
        >
          {this.chaseDotValues.map((value, index) => (
            <Animated.View
              key={index}
              style={[
                circleStyle,
                {
                  transform: [
                    {
                      rotate: value.interpolate({
                        inputRange: [0, 80, 100],
                        outputRange: ['0deg', '360deg', '360deg'],
                      }),
                    },
                    { translateY: -size / 2 + size / 8 },
                    {
                      scale: this.chaseDotBeforeValues[index].interpolate({
                        inputRange: [0, 50, 100],
                        outputRange: [1, 0.4, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </Animated.View>
      </AnimationContainer>
    )
  }
}
