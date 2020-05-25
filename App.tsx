import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Routes } from './src/screens/Routes';
import { YellowBox, AsyncStorage } from 'react-native';
import GameData from './src/state/GameData';
import { SaveStateType } from './src/constants/SaveStateType';

YellowBox.ignoreWarnings(['componentWillReceiveProps', 'componentWillUpdate']);
console.ignoredYellowBox = ['Warning:'];

const App: React.FC = () => {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
    }

    loadFonts();
    setReady(true);
  }, []);

  if (!isReady) return <AppLoading />;
  else
    return (
      <GameData.Provider>
        <Routes />
      </GameData.Provider>
    );
};

export default App;
