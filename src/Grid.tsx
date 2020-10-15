import * as React from 'react'
import { Animated, View } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { stagger } from './utils'

const values = [2, 3, 4, 1, 2, 3, 0, 1, 2]
export default class Grid extends React.Component<SpinnerProps> {
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
          grid: (value) =>
            stagger(100, 5, {
              duration: 1300,
              value: value,
              keyframes: [0, 35, 70, 100],
            }),
        })}
        animating={animating}
      >
        {(interpolations) => (
          <View
            style={[
              {
                width: size,
                height: size,
                flexWrap: 'wrap',
                flexDirection: 'row',
                opacity: !animating && hidesWhenStopped ? 0 : 1,
              },
              style,
            ]}
            {...rest}
          >
            {values
              .map((value) => interpolations.grid[value])
              .map((value, index) => (
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
        )}
      </AnimationContainer>
    )
  }
}
