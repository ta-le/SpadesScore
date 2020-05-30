import React, { useState } from 'react';
import { View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Linking } from 'expo';
import colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { ScreenNameList } from '../constants/ParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomListItem from '../components/CustomListItem';
import AddSaveStateContainer from '../components/AddSaveStateContainer';
import GameData from '../stateContainers/GameData';

let pkg = require('../../app.json');

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const navigation: StackNavigationProp<
    ScreenNameList,
    'Settings'
  > = useNavigation();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const gameData = GameData.useContainer();

  const onPressNewGame = () => {
    Alert.alert('Warning', 'Unsaved game will be lost.', [
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          gameData.resetGame();
          AsyncStorage.removeItem('lastGameState');
        },
      },
    ]);
  };

  const settingsList = [
    {
      title: 'New Game',
      subtitle: 'Create a new game',
      icon: {
        name: 'autorenew',
        type: 'material-community',
      },
      onPress: () => onPressNewGame(),
    },
    {
      title: 'Save Game',
      subtitle: 'Create a new save state',
      icon: {
        name: 'content-save',
        type: 'material-community',
      },
      onPress: () => setModalVisible(true),
    },
    {
      title: 'Save States',
      subtitle: 'Manage and load save states',
      icon: {
        name: 'storage',
        type: 'material',
      },
      onPress: () => navigation.navigate('SaveStates'),
    },
    {
      title: 'Rate App',
      subtitle: 'If you like the app, plese consider leaving a review.',
      icon: {
        name: 'star',
        type: 'material-community',
      },
      onPress: () => Linking.openURL('market://details?id=com.leku.spades'),
    },
    {
      title: 'Version',
      icon: {
        name: 'versions',
        type: 'octicon',
        containerStyle: { paddingLeft: 5 },
      },
      rightTitle: pkg.expo.version,
    },
  ];

  return (
    <View style={styles.container}>
      <AddSaveStateContainer
        visible={modalVisible}
        onCancelPress={() => setModalVisible(!modalVisible)}
        onOKPress={() => setModalVisible(!modalVisible)}
      />
      {settingsList.map((item) => (
        <CustomListItem
          key={item.title}
          title={item.title}
          subtitle={item.subtitle}
          icon={item.icon}
          onPress={item.onPress}
          leftPadding
          rightTitle={item.rightTitle}
          rightTitleStyle={{ color: '#ddd' }}
        />
      ))}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backDropColor,
  },
});
