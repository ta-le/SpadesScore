import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Scoring from './Scoring';
import ScoreBoard from './ScoreBoard';
import Settings from './Settings';
import SaveStates from './SaveStates';
import { ScreenNameList } from '../constants/ParamList';
import colors from '../constants/Colors';

interface RoutesProps {}

const Stack = createStackNavigator<ScreenNameList>();

export const Routes: React.FC<RoutesProps> = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Scoring'
        screenOptions={{
          headerStyle: { backgroundColor: colors.headerColor },
          headerTintColor: colors.headerContentColor,
        }}
      >
        <Stack.Screen
          name='Scoring'
          component={Scoring}
          options={{ title: 'Scoring' }}
        />
        <Stack.Screen
          name='ScoreBoard'
          component={ScoreBoard}
          options={{ title: 'Score Board' }}
        />
        <Stack.Screen
          name='Settings'
          component={Settings}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name='SaveStates'
          component={SaveStates}
          options={{ title: 'Save States' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
