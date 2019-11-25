import * as React from 'react'
import { Animated, Easing } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { anim, createAnimatedValues } from './utils'

export default class Chase extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps
  chaseDotValues = createAnimatedValues(6)
  chaseDotBeforeValues = createAnimatedValues(6)
  chase = new Animated.Value(0)

  render() {
    const { size, color, style, ...rest } = this.props
    const circleStyle = {
      position: 'absolute',
      width: size / 4,
      height: size / 4,
      backgroundColor: color,
      borderRadius: size / 8,
    }
    return (
      <AnimationContainer
        animation={() =>
          Animated.parallel([
            Animated.stagger(
              100,
              this.chaseDotValues.map(value =>
                anim({
                  duration: 2000,
                  value: value,
                  keyframes: [0, 80, 100],
                })
              )
            ),
            Animated.stagger(
              100,
              this.chaseDotBeforeValues.map(value =>
                anim({
                  duration: 2000,
                  value: value,
                  keyframes: [0, 50, 100],
                })
              )
            ),
            anim({
              duration: 2500,
              easing: Easing.linear,
              value: this.chase,
            }),
          ])
        }
      >
        <Animated.View
          style={[
            {
              width: size,
              height: size,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [
                {
                  rotate: this.chase.interpolate({
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
          {this.chaseDotValues.map((value, index) => (
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
                      scale: this.chaseDotBeforeValues[index].interpolate({
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
      </AnimationContainer>
    )
  }
}
