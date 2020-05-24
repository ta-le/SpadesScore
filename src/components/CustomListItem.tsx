import React from 'react';
import { ListItem } from 'react-native-elements';
import colors from '../constants/Colors';

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

export default CustomListItem;
