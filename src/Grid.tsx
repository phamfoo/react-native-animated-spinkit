import * as React from 'react'
import { Animated, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { anim, createAnimatedValues } from './utils'

const delays = [200, 300, 400, 100, 200, 300, 0, 100, 200]
export default class Grid extends React.Component<SpinnerProps> {
  static defaultProps = defaultProps
  values = createAnimatedValues(9)

  render() {
    const { size, color, style, ...rest } = this.props
    return (
      <AnimationContainer
        animation={() =>
          Animated.parallel(
            this.values.map((value, index) =>
              anim({
                duration: 1300,
                value: value,
                keyframes: [0, 35, 70, 100],
                delay: delays[index],
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
              flexWrap: 'wrap',
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
                width: size / 3,
                height: size / 3,
                backgroundColor: color,
                transform: [
                  {
                    scale: value.interpolate({
                      inputRange: [0, 35, 70, 100],
                      outputRange: [1, 0.01, 1, 1],
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
