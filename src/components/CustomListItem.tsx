import React from 'react';
import { ListItem, ListItemProps, IconProps } from 'react-native-elements';
import colors from '../constants/Colors';

interface CustomListItemProps extends ListItemProps {
  icon?: IconProps;
  leftPadding?: boolean;
}

const CustomListItem: React.FC<CustomListItemProps> = (props) => {
  return (
    <ListItem
      titleStyle={{
        color: colors.textColor,
        fontSize: 17,
        paddingLeft: props.leftPadding ? 15 : 0,
      }}
      subtitleStyle={{
        color: colors.subTextColor,
        fontSize: 14,
        paddingLeft: props.leftPadding ? 15 : 0,
      }}
      containerStyle={[
        {
          backgroundColor: colors.backDropColor,
        },
        props.containerStyle,
      ]}
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
