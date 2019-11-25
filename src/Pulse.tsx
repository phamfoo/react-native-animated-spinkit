import * as React from 'react'
import { Animated, Easing } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { anim } from './utils'

export default class Pulse extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps
  value = new Animated.Value(0)

  render() {
    const { size, color, style, ...rest } = this.props
    return (
      <AnimationContainer
        animation={() =>
          anim({
            duration: 1200,
            value: this.value,
            easing: Easing.bezier(0.455, 0.03, 0.515, 0.955),
          })
        }
      >
        <Animated.View
          style={[
            {
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: size / 2,
              opacity: this.value.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
              }),
              transform: [
                {
                  scale: this.value.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0.01, 1],
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
