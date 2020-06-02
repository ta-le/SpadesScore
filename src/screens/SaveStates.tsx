import React, { useState, useEffect } from 'react';
import {
  AsyncStorage,
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import colors from '../constants/Colors';
import { SaveStateType } from '../constants/SaveStateType';
import GameData from '../stateContainers/GameData';
import AlertModal from '../components/AlertModal';

const SaveStates: React.FC = () => {
  const [saveStates, setSaveStates] = useState<SaveStateType[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [loadModalVisible, setLoadModalVisible] = useState<boolean>(false);
  const [indexPressed, setIndexPressed] = useState<number>(0);

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
    gameData.loadSaveState(saveStates[idx]);
    setLoadModalVisible(false);
    ToastAndroid.show('Game was successfully loaded.', ToastAndroid.SHORT);
  };

  const deleteSaveState = (idx: number) => {
    setDeleteModalVisible(false);
    let copy = [...saveStates];
    copy.splice(idx, 1);
    AsyncStorage.setItem('saveStates', JSON.stringify(copy), () => {
      fetch();
    });
  };

  const loadModalButtons: { title: string; onPress: () => void }[] = [
    {
      title: 'Cancel',
      onPress: () => {
        setLoadModalVisible(false);
      },
    },
    {
      title: 'Load',
      onPress: () => {
        loadSaveState(indexPressed);
      },
    },
  ];

  const deleteModalButtons: { title: string; onPress: () => void }[] = [
    {
      title: 'Cancel',
      onPress: () => {
        setDeleteModalVisible(false);
      },
    },
    {
      title: 'Delete',
      onPress: () => {
        deleteSaveState(indexPressed);
      },
    },
  ];
  return (
    <View style={styles.container}>
      <AlertModal
        visible={loadModalVisible}
        text='Load this save state? Current game will be lost.'
        buttons={loadModalButtons}
      />
      <AlertModal
        visible={deleteModalVisible}
        text='Delete this save state?'
        buttons={deleteModalButtons}
      />

      <Text style={styles.sectionHeaderText}> Saved Game States </Text>
      <FlatList
        data={saveStates}
        keyExtractor={(item, index) => `saveState${index}`}
        renderItem={({ item, index }) => (
          <CustomListItem
            key={`state${index}`}
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
                  underlayColor={'rgba(255, 255, 255, 0.2)'}
                  onPress={() => {
                    setIndexPressed(index);
                    setLoadModalVisible(true);
                  }}
                />
                <Icon
                  name='delete'
                  type='material-community'
                  color='white'
                  size={25}
                  containerStyle={{ marginRight: 8 }}
                  underlayColor={'rgba(255, 255, 255, 0.2)'}
                  onPress={() => {
                    setIndexPressed(index);
                    setDeleteModalVisible(true);
                  }}
                />
              </View>
            }
          />
        )}
      />
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
