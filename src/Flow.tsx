import * as React from 'react'
import { Animated, Easing, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { anim, createAnimatedValues } from './utils'

export default class Flow extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps
  values = createAnimatedValues(3)

  render() {
    const { size, color, style, ...rest } = this.props

    return (
      <AnimationContainer
        animation={Animated.parallel(
          this.values.map((value, index) =>
            anim({
              duration: 1400,
              value: value,
              easing: Easing.bezier(0.455, 0.03, 0.515, 0.955),
              keyframes: [0, 40, 80, 100],
              delay: index * 150,
            })
          )
        )}
      >
        <View
          style={[
            {
              width: size,
              height: size * 0.25,
              justifyContent: 'space-between',
              flexDirection: 'row',
            },
            style,
          ]}
          {...rest}
        >
          {this.values.map((value, index) => (
            <Animated.View
              key={index}
              style={{
                width: size * 0.25,
                height: size * 0.25,
                borderRadius: (size * 0.25) / 2,
                backgroundColor: color,
                transform: [
                  {
                    scale: value.interpolate({
                      inputRange: [0, 40, 80, 100],
                      outputRange: [0.3, 1, 0.3, 0.3],
                    }),
                  },
                ],
              }}
            />
          ))}
        </View>
      </AnimationContainer>
    )
  }
}
