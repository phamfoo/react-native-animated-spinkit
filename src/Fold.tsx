import * as React from 'react'
import { Animated, Easing, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { stagger } from './utils'

export default class Fold extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps

  value = new Animated.Value(0)
  animation: Animated.CompositeAnimation
  values: Animated.AnimatedInterpolation[]

  constructor(props: SpinnerProps) {
    super(props)
    const { animation, values } = stagger(300, 4, {
      duration: 2400,
      value: this.value,
      keyframes: [0, 10, 25, 75, 90, 100],
      easing: Easing.linear,
    })

    this.animation = animation
    this.values = values
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
              alignItems: 'center',
              justifyContent: 'center',
              transform: [
                {
                  rotate: '45deg',
                },
              ],
            },
            style,
          ]}
          {...rest}
        >
          {this.values.map((value, index) => (
            <Animated.View
              renderToHardwareTextureAndroid
              key={index}
              style={{
                width: size / 2,
                height: size / 2,
                backgroundColor: color,
                position: 'absolute',
                opacity: value.interpolate({
                  inputRange: [0, 10, 25, 75, 90, 100],
                  outputRange: [0, 0, 1, 1, 0, 0],
                }),
                transform: [
                  {
                    rotate: `${index * 90}deg`,
                  },
                  {
                    perspective: size * 3.6,
                  },
                  {
                    rotateX: value.interpolate({
                      inputRange: [0, 10, 25, 75, 90, 100],
                      outputRange: [
                        '-180deg',
                        '-180deg',
                        '0deg',
                        '0deg',
                        '0deg',
                        '0deg',
                      ],
                    }),
                  },
                  {
                    rotateY: value.interpolate({
                      inputRange: [0, 10, 25, 75, 90, 100],
                      outputRange: [
                        '0deg',
                        '0deg',
                        '0deg',
                        '0deg',
                        '180deg',
                        '180deg',
                      ],
                    }),
                  },
                  {
                    translateX: -size / 4,
                  },
                  {
                    translateY: -size / 4,
                  },
                ],
              }}
            ></Animated.View>
          ))}
        </View>
      </AnimationContainer>
    )
  }
}
