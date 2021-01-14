import * as React from 'react'
import { Animated, Easing } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { loop } from './utils'

export default class Pulse extends React.Component<SpinnerProps> {
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

    return (
      <AnimationContainer
        initAnimation={() => ({
          pulse: (value) => ({
            values: [value],
            animation: loop({
              duration: 1200,
              value: value,
              easing: Easing.bezier(0.455, 0.03, 0.515, 0.955),
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
                backgroundColor: color,
                borderRadius: size / 2,
                opacity:
                  !animating && hidesWhenStopped
                    ? 0
                    : values.pulse[0].interpolate({
                        inputRange: [0, 100],
                        outputRange: [1, 0],
                      }),
                transform: [
                  {
                    scale: values.pulse[0].interpolate({
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
        )}
      </AnimationContainer>
    )
  }
}
