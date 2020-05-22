import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Scoring from './Scoring';
import ScoreBoard from './ScoreBoard';
import Settings from './Settings';
import { ScreenNameList } from '../constants/ParamList';
import colors from '../constants/Colors';
import Score from '../state/Score';
import PlayerNames from '../state/PlayerNames';

interface RoutesProps {}

const Stack = createStackNavigator<ScreenNameList>();

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <Score.Provider>
      <PlayerNames.Provider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Scoring'
            screenOptions={{
              headerStyle: { backgroundColor: colors.headerColor },
              headerTintColor: colors.headerTintColor,
            }}
          >
            <Stack.Screen name='Scoring' component={Scoring} options={{}} />
            <Stack.Screen name='ScoreBoard' component={ScoreBoard} />
            <Stack.Screen name='Settings' component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </PlayerNames.Provider>
    </Score.Provider>
  );
};
