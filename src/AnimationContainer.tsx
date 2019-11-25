import * as React from 'react'
import { Animated } from 'react-native'

export interface Props {
  animation: () => Animated.CompositeAnimation
}
export default class AnimationContainer extends React.Component<Props> {
  animation: Animated.CompositeAnimation

  constructor(props: Props) {
    super(props)

    const { animation } = this.props
    this.animation = animation()
  }

  componentDidMount() {
    this.animation.start()
  }

  componentWillUnmount() {
    this.animation.stop()
  }

  render() {
    return this.props.children
  }
}
