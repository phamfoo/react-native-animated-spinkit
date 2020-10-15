import * as React from 'react'
import { Animated, Easing, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { stagger } from './utils'

export default class Flow extends React.Component<SpinnerProps> {
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
          flow: (value) =>
            stagger(150, 3, {
              duration: 1400,
              value: value,
              easing: Easing.bezier(0.455, 0.03, 0.515, 0.955),
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
                height: size * 0.25,
                justifyContent: 'space-between',
                flexDirection: 'row',
                opacity: !animating && hidesWhenStopped ? 0 : 1,
              },
              style,
            ]}
            {...rest}
          >
            {values.flow.map((value, index) => (
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
        )}
      </AnimationContainer>
    )
  }
}
