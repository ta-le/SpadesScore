import React, { useState, useEffect } from 'react';
import { AsyncStorage, Text, View, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import colors from '../constants/Colors';
import { SaveStateType } from '../constants/SaveStateType';
import GameData from '../state/GameData';

const SaveStates: React.FC = () => {
  const [saveStates, setSaveStates] = useState([]);

  const gameData = GameData.useContainer();

  const fetch = async () => {
    try {
      const fetched = await AsyncStorage.getItem('saveStates');
      const parsed: [] = JSON.parse(fetched);

      //DEBUG
      console.log(
        `Fetched ${parsed.length} game states: ${parsed.reduce(
          (acc, curr: any) => {
            return acc + curr.name + ', ';
          },
          ''
        )}`
      );

      if (fetched) {
        setSaveStates(JSON.parse(fetched));
      }
    } catch (error) {
      console.log('Error fetching data');
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const loadSaveState = (idx: number) => {
    Alert.alert('Warning', 'Load this save state? Current game will be lost.', [
      {
        text: 'Cancel',
      },
      {
        text: 'Load',
        onPress: () => {
          gameData.loadSaveState(saveStates[idx]);
        },
      },
    ]);
  };

  const deleteSaveState = (idx: number) => {
    Alert.alert('Warning', 'Delete this save state?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          let copy = [...saveStates];
          copy.splice(idx, 1);
          console.log(copy);
          AsyncStorage.setItem('saveStates', JSON.stringify(copy), () =>
            fetch()
          );
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeaderText}> Saved Game States </Text>
      {saveStates.map((item: SaveStateType, idx) => (
        <CustomListItem
          key={`state${idx}`}
          title={item.name}
          subtitle={
            item.players.reduce(
              (acc, curr, idx) => acc + curr + (idx !== 3 ? ', ' : ''),
              'Players: '
            ) +
            '\n' +
            `Rounds played: ${item.roundData.length}`
          }
          leftPadding={false}
          rightIcon={
            <View style={{ flexDirection: 'row' }}>
              <Icon
                name='content-save-edit'
                type='material-community'
                color='white'
                size={25}
                containerStyle={{ marginRight: 16 }}
                onPress={() => loadSaveState(idx)}
              />
              <Icon
                name='delete'
                type='material-community'
                color='white'
                size={25}
                containerStyle={{ marginRight: 8 }}
                onPress={() => deleteSaveState(idx)}
              />
            </View>
          }
        />
      ))}
    </View>
  );
};

export default SaveStates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.backDropColor,
  },
  sectionHeaderText: {
    color: colors.sectionTextColor,
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 26,
  },
});
