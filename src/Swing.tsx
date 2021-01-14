import * as React from 'react'
import { Animated, Easing } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { loop } from './utils'

export default class Swing extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps

  render() {
    const {
      size,
      color,
      style,
      animating,
      hidesWhenStopped,
      ...rest
    } = this.props
    const circleStyle = {
      width: size * 0.45,
      height: size * 0.45,
      backgroundColor: color,
      borderRadius: (size * 0.45) / 2,
    }

    return (
      <AnimationContainer
        initAnimation={() => ({
          swing: (value) => ({
            values: [value],
            animation: loop({
              duration: 1800,
              value: value,
              easing: Easing.linear,
              keyframes: [0, 100],
            }),
          }),
          swingDot: (value) => ({
            values: [value],
            animation: loop({
              duration: 2000,
              value: value,
              keyframes: [0, 50, 100],
            }),
          }),
        })}
        animating={animating}
      >
        {(values) => (
          <Animated.View
            style={[
              {
                width: size,
                height: size,
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: !animating && hidesWhenStopped ? 0 : 1,
                transform: [
                  {
                    rotate: values.swing[0].interpolate({
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
                      scale: values.swingDot[0].interpolate({
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
                      scale: values.swingDot[0].interpolate({
                        inputRange: [0, 50, 100],
                        outputRange: [1, 0.2, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
          </Animated.View>
        )}
      </AnimationContainer>
    )
  }
}
