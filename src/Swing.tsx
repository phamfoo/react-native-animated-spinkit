import * as React from 'react'
import { Animated, Easing } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { anim } from './utils'

export default class Swing extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps
  swing = new Animated.Value(0)
  swingDot = new Animated.Value(0)

  render() {
    const { size, color, style, ...rest } = this.props
    const circleStyle = {
      width: size * 0.45,
      height: size * 0.45,
      backgroundColor: color,
      borderRadius: (size * 0.45) / 2,
    }
    return (
      <AnimationContainer
        animation={Animated.parallel([
          anim({
            duration: 1800,
            value: this.swing,
            easing: Easing.linear,
            keyframes: [0, 100],
          }),
          anim({
            duration: 2000,
            value: this.swingDot,
            keyframes: [0, 50, 100],
          }),
        ])}
      >
        <Animated.View
          style={[
            {
              width: size,
              height: size,
              alignItems: 'center',
              justifyContent: 'space-between',
              transform: [
                {
                  rotate: this.swing.interpolate({
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
          <Animated.View
            style={[
              circleStyle,
              {
                transform: [
                  {
                    scale: this.swingDot.interpolate({
                      inputRange: [0, 50, 100],
                      outputRange: [0.2, 1, 0.2],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              circleStyle,
              {
                transform: [
                  {
                    scale: this.swingDot.interpolate({
                      inputRange: [0, 50, 100],
                      outputRange: [1, 0.2, 1],
                    }),
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </AnimationContainer>
    )
  }
}
