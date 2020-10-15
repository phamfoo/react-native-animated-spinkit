import * as React from 'react'
import { Animated, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { stagger } from './utils'

export default class Bounce extends React.Component<SpinnerProps> {
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
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 2,
      opacity: 0.6,
    }

    return (
      <AnimationContainer
        initAnimation={() => ({
          bounce: (value) =>
            stagger(1000, 2, {
              duration: 2000,
              value: value,
              keyframes: [0, 45, 55, 100],
            }),
        })}
        animating={animating}
      >
        {(values) => (
          <View
            style={[
              {
                width: size,
                height: size,
                opacity: !animating && hidesWhenStopped ? 0 : 1,
              },
              style,
            ]}
            {...rest}
          >
            {values.bounce.map((value, index) => (
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
        )}
      </AnimationContainer>
    )
  }
}
