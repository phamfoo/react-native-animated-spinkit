import * as React from 'react'
import { Animated, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { stagger } from './utils'

export default class Circle extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps

  value = new Animated.Value(0)
  animation: Animated.CompositeAnimation
  values: Animated.AnimatedInterpolation[]

  constructor(props: SpinnerProps) {
    super(props)
    const { animation, values } = stagger(100, 12, {
      duration: 1200,
      value: this.value,
      keyframes: [0, 40, 80, 100],
    })

    this.animation = animation
    this.values = values
  }

  render() {
    const { size, color, style, ...rest } = this.props
    const circleStyle = {
      position: 'absolute',
      width: size * 0.15,
      height: size * 0.15,
      backgroundColor: color,
      borderRadius: (size * 0.15) / 2,
    }

    return (
      <AnimationContainer animation={this.animation}>
        <View
          style={[
            {
              width: size,
              height: size,
              alignItems: 'center',
              justifyContent: 'center',
            },
            style,
          ]}
          {...rest}
        >
          {this.values.map((value, index) => (
            <Animated.View
              key={index}
              style={[
                circleStyle,
                {
                  transform: [
                    {
                      rotate: `${index * 30}deg`,
                    },
                    { translateY: -size / 2 + (size * 0.15) / 2 },
                    {
                      scale: value.interpolate({
                        inputRange: [0, 40, 80, 100],
                        outputRange: [0.01, 1, 0.01, 0.01],
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
