import * as React from 'react'
import { Animated, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { anim, createAnimatedValues } from './utils'

export default class CircleFade extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps
  values = createAnimatedValues(12)

  render() {
    const { size, color, style, ...rest } = this.props
    const circleStyle = {
      position: 'absolute',
      width: size * 0.15,
      height: size * 0.15,
      backgroundColor: color,
      borderRadius: (size * 0.15) / 2,
    }
    return (
      <AnimationContainer
        animation={() =>
          Animated.stagger(
            100,
            this.values.map(value =>
              anim({
                duration: 1200,
                value: value,
                keyframes: [0, 39, 40, 100],
              })
            )
          )
        }
      >
        <View
          style={[
            {
              width: size,
              height: size,
              alignItems: 'center',
              justifyContent: 'center',
            },
            style,
          ]}
          {...rest}
        >
          {this.values.map((value, index) => (
            <Animated.View
              key={index}
              style={[
                circleStyle,
                {
                  opacity: value.interpolate({
                    inputRange: [0, 39, 40, 100],
                    outputRange: [0, 0, 1, 0],
                  }),
                  transform: [
                    {
                      rotate: `${index * 30}deg`,
                    },
                    { translateY: -size / 2 + (size * 0.15) / 2 },
                    {
                      scale: value.interpolate({
                        inputRange: [0, 39, 40, 100],
                        outputRange: [0.6, 0.6, 1, 0.6],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>
      </AnimationContainer>
    )
  }
}
