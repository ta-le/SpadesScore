import React from 'react';
import { AsyncStorage, ToastAndroid } from 'react-native';
import GameData from '../stateContainers/GameData';
import { SaveStateType } from '../constants/SaveStateType';

interface AddSaveStateContainerProps {
  render: (addSaveState) => JSX.Element;
}

const AddSaveStateContainer: React.FC<AddSaveStateContainerProps> = (props) => {
  const gameData = GameData.useContainer();

  const addSaveState = async (name: string) => {
    let currentData = gameData.getGameStateObject(name);
    try {
      AsyncStorage.getItem('saveStates', (error, result) => {
        let toBeSaved: [SaveStateType];
        if (result) {
          let existingData = JSON.parse(result);
          toBeSaved = existingData.concat([currentData]);
        } else {
          toBeSaved = [currentData];
        }
        AsyncStorage.setItem(
          'saveStates',
          JSON.stringify(toBeSaved),
          (error) => {
            ToastAndroid.show(
              'Game was successfully saved.',
              ToastAndroid.SHORT
            );
            error
              ? console.log(error)
              : console.log(
                  'AsyncStorage: successfully merged saveState entry'
                );
          }
        );
      });
    } catch (error) {
      console.log('Error while setting item in AsyncStorage.');
    }
  };

  // Debug method to remove all save states
  const removeAll = () => {
    AsyncStorage.removeItem('saveStates', () => console.log('removed'));
  };

  return props.render(addSaveState);
};

export default AddSaveStateContainer;
