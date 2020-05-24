import React, { useState } from 'react';
import {
  View,
  Modal,
  TextInput,
  Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import colors from '../constants/Colors';
import { Button } from 'react-native-elements';
import GameData from '../state/GameData';

interface InputModalProps {
  visible: boolean;
  onCancelPress: () => void;
  onOKPress: () => void;
}

const InputModal: React.FC<InputModalProps> = (props) => {
  const [input, setInput] = useState(getDate());
  const gameData = GameData.useContainer();

  const addSaveState = async (name: string) => {
    let currentData = gameData.getGameStateObject(name);
    console.log('gameData:' + JSON.stringify(currentData));
    try {
      AsyncStorage.getItem('saveStates', (error, result) => {
        console.log('getItem result: ' + result);
        if (result) {
          let existingData = JSON.parse(result);
          let newData = existingData.concat([currentData]);

          AsyncStorage.setItem('saveStates', JSON.stringify(newData), () => {
            console.log('AsyncStorage: successfully merged saveState entry');
          });
        } else {
          AsyncStorage.setItem(
            'saveStates',
            JSON.stringify([currentData]),
            () => {
              console.log('AsyncStorage: successfully set new saveState entry');
            }
          );
        }
      });
    } catch (error) {
      console.log('Error while setting item in AsyncStorage.');
    }
    props.onOKPress();
  };

  const removeAll = () => {
    AsyncStorage.removeItem('saveStates', () => console.log('removed'));
  };

  return (
    <Modal visible={props.visible} transparent>
      <View style={styles.container}>
        <View style={styles.window}>
          <Text style={styles.headLine}>Enter a name for the save state.</Text>
          <TextInput
            selectTextOnFocus={true}
            underlineColorAndroid={'white'}
            maxLength={15}
            returnKeyType={'send'}
            value={input}
            onChangeText={(text) => setInput(text)}
            style={styles.textInput}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
              title='Clear all'
              type='clear'
              onPress={() => removeAll()}
              titleStyle={styles.buttonText}
              containerStyle={styles.button}
            />
            <Button
              title='Cancel'
              type='clear'
              onPress={() => props.onCancelPress()}
              titleStyle={styles.buttonText}
              containerStyle={styles.button}
            />
            <Button
              title='OK'
              type='clear'
              onPress={() => addSaveState(input)}
              titleStyle={styles.buttonText}
              containerStyle={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;

const getDate = () => {
  let date = new Date();
  return `${date.getFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
};

const width = 290;
const height = 160;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20,20,20,0.4)',
  },
  window: {
    justifyContent: 'space-between',
    height: height,
    width: width,
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 19,
    backgroundColor: colors.backDropColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  headLine: {
    fontSize: 15,
    color: 'white',
  },
  textInput: {
    alignSelf: 'center',
    width: width * 0.8,
    flex: 0.6,
    //backgroundColor: 'yellow',
    fontSize: 15,
    color: 'white',
    paddingLeft: 5,
    paddingBottom: 7,
  },
  button: {
    paddingLeft: 8,
  },
  buttonText: {
    color: '#ca3e47',
  },
});
