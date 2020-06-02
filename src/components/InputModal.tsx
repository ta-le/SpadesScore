import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../constants/Colors';
import { Button, Input } from 'react-native-elements';

interface InputModalProps {
  label: string;
  visible: boolean;
  onCancelPress: () => void;
  onOKPress: (input: string) => void;
  placeHolder?: string;
}

//TODO: Refractor to use renderProps to combine InputModal and AlertModal
const InputModal: React.FC<InputModalProps> = (props) => {
  const [input, setInput] = useState<string>(props.placeHolder);

  return (
    <Modal
      isVisible={props.visible}
      hideModalContentWhileAnimating
      useNativeDriver
    >
      <View style={styles.container}>
        <View style={styles.window}>
          <Input
            label={props.label}
            labelStyle={styles.headLine}
            selectTextOnFocus
            maxLength={15}
            returnKeyType={'send'}
            value={input}
            onChangeText={(text) => setInput(text)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.textInput}
          />
          <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  window: {
    justifyContent: 'space-between',
    width: '83%',
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
    fontSize: 16,
    color: colors.textColor,
    paddingLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  button: {
    paddingLeft: 8,
  },
  buttonText: {
    color: '#ca3e47',
  },
});
