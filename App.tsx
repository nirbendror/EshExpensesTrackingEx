import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import MainTabNavigator from './ui/navigation/AppNavigator'
import { SafeAreaView, StyleSheet } from 'react-native'
import { UserProvider } from './providers/UserProvider'
import {Appearance} from 'react-native'

export const colorScheme = Appearance.getColorScheme()

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <UserProvider>
           <MainTabNavigator />
        </UserProvider>
      </SafeAreaView>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})


export default App
