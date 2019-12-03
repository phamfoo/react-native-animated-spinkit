import * as React from 'react'
import { Animated, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { anim, createAnimatedValues } from './utils'

export default class Wave extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps
  values = createAnimatedValues(5)

  render() {
    const { size, color, style, ...rest } = this.props

    return (
      <AnimationContainer
        animation={Animated.parallel(
          this.values.map((value, index) =>
            anim({
              duration: 1200,
              value: value,
              keyframes: [0, 20, 40, 100],
              delay: index * 100,
            })
          )
        )}
      >
        <View
          style={[
            {
              width: size,
              height: size,
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
                width: size * 0.15,
                backgroundColor: color,
                height: size,
                transform: [
                  {
                    scaleY: value.interpolate({
                      inputRange: [0, 20, 40, 100],
                      outputRange: [0.4, 1, 0.4, 0.4],
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
