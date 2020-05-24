import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { ScreenNameList } from '../constants/ParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomListItem from '../components/CustomListItem';
import InputModal from '../components/InputModal';

interface SettingsProps {}

// TODO: New Game, Rate App
const Settings: React.FC<SettingsProps> = () => {
  const navigation: StackNavigationProp<
    ScreenNameList,
    'Settings'
  > = useNavigation();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <InputModal
        visible={modalVisible}
        onCancelPress={() => setModalVisible(!modalVisible)}
        onOKPress={() => setModalVisible(!modalVisible)}
      />
      <CustomListItem
        title='New Game'
        subtitle='Create a new game'
        icon={{
          name: 'autorenew',
          type: 'material-community',
        }}
      />
      <CustomListItem
        title='Save Game'
        subtitle='Create a new save state'
        icon={{
          name: 'content-save',
          type: 'material-community',
        }}
        onPress={() => setModalVisible(true)}
      />
      <CustomListItem
        title='Save States'
        subtitle='Manage and load save states'
        icon={{
          name: 'storage',
          type: 'material',
        }}
        onPress={() => navigation.navigate('SaveStates')}
      />
      <CustomListItem
        title='Rate App'
        subtitle='Give or change rating'
        icon={{
          name: 'star',
          type: 'material-community',
        }}
      />
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
