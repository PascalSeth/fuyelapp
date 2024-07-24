import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from './Apps/components/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
      <NavigationContainer>
      <TabNavigator/>
      </NavigationContainer>
  );
}
