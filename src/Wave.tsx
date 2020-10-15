import * as React from 'react'
import { Animated, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { stagger } from './utils'

export default class Wave extends React.Component<SpinnerProps> {
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
          wave: (value) =>
            stagger(100, 5, {
              duration: 1200,
              value: value,
              keyframes: [0, 20, 40, 100],
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
                justifyContent: 'space-between',
                flexDirection: 'row',
                opacity: !animating && hidesWhenStopped ? 0 : 1,
              },
              style,
            ]}
            {...rest}
          >
            {values.wave.map((value, index) => (
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
        )}
      </AnimationContainer>
    )
  }
}
