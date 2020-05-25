import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Routes } from './src/screens/Routes';
import { YellowBox, AsyncStorage } from 'react-native';
import GameData from './src/stateContainers/GameData';
import { SaveStateType } from './src/constants/SaveStateType';

YellowBox.ignoreWarnings(['componentWillReceiveProps', 'componentWillUpdate']);
console.ignoredYellowBox = ['Warning:'];

const App: React.FC = () => {
  const [isReady, setReady] = useState(false);
  const [gameState, setGameState] = useState<SaveStateType>({
    roundData: [],
    players: [1, 2, 3, 4].map((x) => `Player ${x}`),
    points: [0, 0],
    bags: [0, 0],
  });

  const loadResources = async () => {
    async function loadFonts() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
    }
    async function loadGameState() {
      await AsyncStorage.getItem('lastGameState', (error, result) => {
        console.log('first fetch: ' + result);

        if (result !== null) {
          setGameState(JSON.parse(result));
        }
      });
    }

    await loadFonts();
    await loadGameState();
    //return Promise.all([loadFonts(), loadGameState()]);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={() => loadResources()}
        onFinish={() => setReady(true)}
      />
    );
  else
    return (
      <GameData.Provider initialState={gameState}>
        <Routes />
      </GameData.Provider>
    );
};

export default App;
