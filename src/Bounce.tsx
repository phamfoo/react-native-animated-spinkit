import * as React from 'react'
import { Animated, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { stagger } from './utils'

export default class Bounce extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps

  value = new Animated.Value(0)
  animation: Animated.CompositeAnimation
  values: Animated.AnimatedInterpolation[]

  constructor(props: SpinnerProps) {
    super(props)

    const { animation, values } = stagger(1000, 2, {
      duration: 2000,
      value: this.value,
      keyframes: [0, 45, 55, 100],
    })

    this.animation = animation
    this.values = values
  }

  render() {
    const { size, color, style, ...rest } = this.props
    const circleStyle = {
      position: 'absolute',
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 2,
      opacity: 0.6,
    }
    return (
      <AnimationContainer animation={this.animation}>
        <View style={[{ width: size, height: size }, style]} {...rest}>
          {this.values.map((value, index) => (
            <Animated.View
              key={index}
              style={[
                circleStyle,
                {
                  transform: [
                    {
                      scale: value.interpolate({
                        inputRange: [0, 45, 55, 100],
                        outputRange: [0.01, 1, 1, 0.01],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>
      </AnimationContainer>
    )
  }
}
