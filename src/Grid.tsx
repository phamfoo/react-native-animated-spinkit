import * as React from 'react'
import { Animated, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { stagger } from './utils'

export default class Grid extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps

  value = new Animated.Value(0)
  animation: Animated.CompositeAnimation
  values: Animated.AnimatedInterpolation[]

  constructor(props: SpinnerProps) {
    super(props)
    const { animation, values } = stagger(100, 5, {
      duration: 1300,
      value: this.value,
      keyframes: [0, 35, 70, 100],
    })

    this.animation = animation
    this.values = [
      values[2],
      values[3],
      values[4],
      values[1],
      values[2],
      values[3],
      values[0],
      values[1],
      values[2],
    ]
  }
  render() {
    const { size, color, style, ...rest } = this.props
    return (
      <AnimationContainer animation={this.animation}>
        <View
          style={[
            {
              width: size,
              height: size,
              flexWrap: 'wrap',
              flexDirection: 'row',
            },
            style,
          ]}
          {...rest}
        >
          {this.values.map((value, index) => (
            <Animated.View
              key={index}
              style={{
                width: size / 3,
                height: size / 3,
                backgroundColor: color,
                transform: [
                  {
                    scale: value.interpolate({
                      inputRange: [0, 35, 70, 100],
                      outputRange: [1, 0.01, 1, 1],
                    }),
                  },
                ],
              }}
            />
          ))}
        </View>
      </AnimationContainer>
    )
  }
}
