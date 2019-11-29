import * as React from 'react'
import { Animated } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { anim } from './utils'

export default class Plane extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps
  value = new Animated.Value(0)

  render() {
    const { size, color, style, ...rest } = this.props
    return (
      <AnimationContainer
        animation={anim({
          duration: 1200,
          value: this.value,
          keyframes: [0, 50, 100],
        })}
      >
        <Animated.View
          style={[
            {
              width: size,
              height: size,
              backgroundColor: color,
              transform: [
                {
                  perspective: size * 3,
                },
                {
                  rotateX: this.value.interpolate({
                    inputRange: [0, 50, 100],
                    outputRange: ['0.1deg', '-179.9deg', '-179.9deg'],
                  }),
                },
                {
                  rotateY: this.value.interpolate({
                    inputRange: [0, 50, 100],
                    outputRange: ['0.1deg', '0.1deg', '-179.9deg'],
                  }),
                },
              ],
            },
            style,
          ]}
          {...rest}
        />
      </AnimationContainer>
    )
  }
}
