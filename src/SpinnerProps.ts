import { ViewProps } from 'react-native'

export interface SpinnerProps extends ViewProps {
  size: number
  color: string
}

export const defaultProps = {
  size: 48,
  color: '#000',
}
