import React, { useState, useEffect } from 'react';
import { AsyncStorage, Text, View, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import colors from '../constants/Colors';

const SaveStates: React.FC = () => {
  const [saveStates, setSaveStates] = useState([]);

  const fetch = async () => {
    try {
      const fetched = await AsyncStorage.getItem('saveStates');
      console.log('fetched game states: ' + fetched);
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

  //TODO: Loading a save state
  const loadSaveState = (key: string) => {
    Alert.alert('Warning', 'Load this save state? Current game will be lost.', [
      {
        text: 'Cancel',
      },
      {
        text: 'Load',
        onPress: () => {},
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
      {saveStates.map((item, idx) => (
        <CustomListItem
          key={`state${idx}`}
          title={item.name}
          rightIcon={() => (
            <View style={{ flexDirection: 'row' }}>
              <Icon
                name='content-save-edit'
                type='material-community'
                color='white'
                size={25}
                containerStyle={{ marginRight: 16 }}
                onPress={() => loadSaveState('')}
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
          )}
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
    paddingLeft: 26,
    backgroundColor: colors.backDropColor,
  },
  sectionHeaderText: {
    color: colors.sectionTextColor,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
