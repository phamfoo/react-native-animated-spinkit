import * as React from 'react'
import { Animated, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { stagger } from './utils'

export default class Circle extends React.Component<SpinnerProps> {
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
      width: size * 0.15,
      height: size * 0.15,
      backgroundColor: color,
      borderRadius: (size * 0.15) / 2,
    }

    return (
      <AnimationContainer
        initAnimation={() => ({
          circle: (value) =>
            stagger(100, 12, {
              duration: 1200,
              value: value,
              keyframes: [0, 40, 80, 100],
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
                alignItems: 'center',
                justifyContent: 'center',
                opacity: !animating && hidesWhenStopped ? 0 : 1,
              },
              style,
            ]}
            {...rest}
          >
            {values.circle.map((value, index) => (
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
        )}
      </AnimationContainer>
    )
  }
}
