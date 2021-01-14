import * as React from 'react'
import { Animated, Easing } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { loop, stagger } from './utils'

export default class Chase extends React.Component<SpinnerProps> {
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
      position: 'absolute',
      width: size / 4,
      height: size / 4,
      backgroundColor: color,
      borderRadius: size / 8,
    }

    return (
      <AnimationContainer
        initAnimation={() => ({
          chase: (value) => ({
            values: [value],
            animation: loop({
              duration: 2500,
              easing: Easing.linear,
              value: value,
            }),
          }),
          chaseDot: (value) =>
            stagger(100, 6, {
              duration: 2000,
              value: value,
              keyframes: [0, 80, 100],
            }),
          chaseDotBefore: (value) =>
            stagger(100, 6, {
              duration: 2000,
              value: value,
              keyframes: [0, 50, 100],
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
                justifyContent: 'center',
                opacity: !animating && hidesWhenStopped ? 0 : 1,
                transform: [
                  {
                    rotate: values.chase[0].interpolate({
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
            {values.chaseDot.map((value, index) => (
              <Animated.View
                key={index}
                style={[
                  circleStyle,
                  {
                    transform: [
                      {
                        rotate: value.interpolate({
                          inputRange: [0, 80, 100],
                          outputRange: ['0deg', '360deg', '360deg'],
                        }),
                      },
                      { translateY: -size / 2 + size / 8 },
                      {
                        scale: values.chaseDotBefore[index].interpolate({
                          inputRange: [0, 50, 100],
                          outputRange: [1, 0.4, 1],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </Animated.View>
        )}
      </AnimationContainer>
    )
  }
}
