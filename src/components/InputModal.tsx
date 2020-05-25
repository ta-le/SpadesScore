import React, { useState } from 'react';
import { View, Modal, TextInput, Text, StyleSheet } from 'react-native';
import colors from '../constants/Colors';
import { Button, Input } from 'react-native-elements';

interface InputModalProps {
  visible: boolean;
  onCancelPress: () => void;
  onOKPress: (input: string) => void;
  placeHolder: string;
}

//TODO: migrate to react-native-modal for animations etc.
const InputModal: React.FC<InputModalProps> = (props) => {
  const [input, setInput] = useState<string>(props.placeHolder);

  return (
    <Modal visible={props.visible} transparent>
      <View style={styles.container}>
        <View style={styles.window}>
          <Input
            label='Enter a name for the save state.'
            labelStyle={styles.headLine}
            selectTextOnFocus={true}
            maxLength={15}
            returnKeyType={'send'}
            value={input}
            onChangeText={(text) => setInput(text)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.textInput}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
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
              onPress={() => props.onOKPress(input)}
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
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 16,
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
    color: colors.textColor,
  },
  inputContainer: {
    //backgroundColor: 'red',
    paddingTop: 10,
  },
  textInput: {
    alignSelf: 'center',
    width: width * 0.8,
    fontSize: 16,
    color: colors.textColor,
    paddingLeft: 5,
  },
  button: {
    paddingLeft: 8,
  },
  buttonText: {
    color: '#ca3e47',
  },
});
