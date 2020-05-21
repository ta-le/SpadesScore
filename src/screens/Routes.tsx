import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import ScoreBoard from './ScoreBoard';
import { ScreenNameList } from '../constants/ParamList';
import Colors from '../constants/Colors';

interface RoutesProps {}

const Stack = createStackNavigator<ScreenNameList>();

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Main'
        screenOptions={{
          headerStyle: { backgroundColor: Colors.headerColor },
          headerTintColor: Colors.headerTintColor,
        }}
      >
        <Stack.Screen name='Main' component={Main} options={{}} />
        <Stack.Screen name='ScoreBoard' component={ScoreBoard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
