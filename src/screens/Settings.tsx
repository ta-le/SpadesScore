import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../constants/Colors';
import { ListItem } from 'react-native-elements';

interface SettingsProps {}

const CustomListItem = (props) => {
  return (
    <ListItem
      titleStyle={{ color: colors.textColor, fontSize: 17, paddingLeft: 15 }}
      subtitleStyle={{
        color: colors.subTextColor,
        fontSize: 14,
        paddingLeft: 15,
      }}
      containerStyle={{ backgroundColor: colors.backDropColor }}
      leftIcon={{
        color: '#ddd',
        size: 27,
        ...props.icon,
      }}
      {...props}
    />
  );
};

const Settings: React.FC<SettingsProps> = () => {
  return (
    <View style={styles.container}>
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
      />
      <CustomListItem
        title='Save States'
        subtitle='Manage and load save states'
        icon={{
          name: 'storage',
          type: 'material',
        }}
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
