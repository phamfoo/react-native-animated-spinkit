import * as React from 'react'
import { Animated, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { anim, createAnimatedValues } from './utils'

export default class Bounce extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps
  values = createAnimatedValues(2)

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
      <AnimationContainer
        animation={Animated.stagger(
          1000,
          this.values.map(value =>
            anim({
              duration: 2000,
              value: value,
              keyframes: [0, 45, 55, 100],
            })
          )
        )}
      >
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
