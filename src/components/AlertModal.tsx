import React from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../constants/Colors';
import { Button } from 'react-native-elements';

interface AlertModalProps {
  visible: boolean;
  text: string;
  buttons: { title: string; onPress: () => void }[];
}

const AlertModal: React.FC<AlertModalProps> = (props) => {
  return (
    <Modal
      isVisible={props.visible}
      useNativeDriver
      animationIn='slideInUp'
      animationOut='slideOutDown'
    >
      <StatusBar animated translucent backgroundColor={'rgba(0,0,0, 0.7)'} />
      <View style={styles.container}>
        <View style={styles.window}>
          <Text style={styles.text}>{props.text}</Text>
          <View style={styles.buttonContainer}>
            {props.buttons.map((b, idx) => (
              <Button
                key={`modalButton${idx}`}
                title={b.title}
                onPress={b.onPress}
                type='clear'
                titleStyle={styles.buttonText}
                containerStyle={styles.button}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(20,20,20,0.4)',
  },
  window: {
    justifyContent: 'space-between',
    width: '90%',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 22,
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
  text: {
    fontSize: 16,
    color: colors.textColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 9,
  },
  button: {
    paddingLeft: 8,
  },
  buttonText: {
    color: '#ca3e47',
  },
});
