import * as React from 'react'
import { Animated, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { anim } from './utils'

export default class Wander extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps
  value = new Animated.Value(0)

  render() {
    const { size, color, style, ...rest } = this.props
    const wanderDistance = size * 0.75

    return (
      <AnimationContainer
        animation={anim({
          duration: 2000,
          value: this.value,
          keyframes: [0, 25, 50, 75, 100],
        })}
      >
        <View
          style={[
            {
              width: size,
              height: size,
            },
            style,
          ]}
          {...rest}
        >
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <View
                key={index}
                style={{
                  width: size,
                  height: size,
                  position: 'absolute',
                  transform: [
                    {
                      rotate: `${index * 90}deg`,
                    },
                  ],
                }}
              >
                <Animated.View
                  style={{
                    width: size / 5,
                    height: size / 5,
                    backgroundColor: color,
                    position: 'absolute',
                    transform: [
                      {
                        translateX: this.value.interpolate({
                          inputRange: [0, 25, 50, 75, 100],
                          outputRange: [
                            0,
                            wanderDistance,
                            wanderDistance,
                            0,
                            0,
                          ],
                        }),
                      },
                      {
                        translateY: this.value.interpolate({
                          inputRange: [0, 25, 50, 75, 100],
                          outputRange: [
                            0,
                            0,
                            wanderDistance,
                            wanderDistance,
                            0,
                          ],
                        }),
                      },
                      {
                        scale: this.value.interpolate({
                          inputRange: [0, 25, 50, 75, 100],
                          outputRange:
                            index % 2 === 0
                              ? [1, 0.6, 1, 0.6, 1]
                              : [0.6, 1, 0.6, 1, 0.6],
                        }),
                      },
                      {
                        rotate: this.value.interpolate({
                          inputRange: [0, 25, 50, 75, 100],
                          outputRange: [
                            '0deg',
                            '-90deg',
                            '-180deg',
                            '-270deg',
                            '-360deg',
                          ],
                        }),
                      },
                    ],
                  }}
                />
              </View>
            ))}
        </View>
      </AnimationContainer>
    )
  }
}
