import React, { useReducer } from 'react'
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import {
  Plane,
  Chase,
  Bounce,
  Wave,
  Wander,
  Pulse,
  Flow,
  Circle,
  Grid,
  CircleFade,
  Fold,
  Swing,
} from 'react-native-animated-spinkit'

const spinners = [
  { component: Plane, backgroundColor: '#d35400' },
  { component: Chase, backgroundColor: '#2c3e50' },
  { component: Bounce, backgroundColor: '#1abc9c' },
  { component: Wave, backgroundColor: '#2980b9' },
  { component: Wander, backgroundColor: '#7f8c8d' },
  { component: Pulse, backgroundColor: '#ffcb65' },
  { component: Swing, backgroundColor: '#d35400' },
  { component: Flow, backgroundColor: '#27ae60' },
  { component: Circle, backgroundColor: '#d35400' },
  { component: Grid, backgroundColor: '#2c3e50' },
  { component: CircleFade, backgroundColor: '#1abc9c' },
  { component: Fold, backgroundColor: '#2980b9' },
]

function reducer(state, action) {
  switch (action.type) {
    case 'toggle_loading':
      return { ...state, [action.spinnerIndex]: !state[action.spinnerIndex] }
    default:
      return state
  }
}

const initialState = spinners.reduce(
  (acc, _, index) => ({ ...acc, [index]: true }),
  {}
)

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {Array(Math.ceil(spinners.length / 3))
        .fill(null)
        .map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {spinners
              .slice(rowIndex * 3, rowIndex * 3 + 3)
              .map((spinner, index) => {
                const Spinner = spinner.component
                const spinnerIndex = rowIndex * 3 + index
                return (
                  <TouchableOpacity
                    style={[
                      styles.cell,
                      {
                        backgroundColor: spinner.backgroundColor,
                      },
                    ]}
                    key={index}
                    onPress={() => {
                      dispatch({
                        type: 'toggle_loading',
                        spinnerIndex: spinnerIndex,
                      })
                    }}
                  >
                    <Spinner color="#FFF" animating={state[spinnerIndex]} />
                    <Text style={styles.componentLabel}>
                      {`<${spinner.component.name} />`}
                    </Text>
                  </TouchableOpacity>
                )
              })}
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  componentLabel: {
    position: 'absolute',
    bottom: 14,
    color: '#FFF',
    fontWeight: 'bold',
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
