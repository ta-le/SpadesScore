import React from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import colors from '../constants/Colors';

//TODO: migrate to react-native-picker (dropdown uses deprecated methods)
export const CustomDropdown = (props) => {
  return (
    <Dropdown
      label={props.label}
      data={props.data}
      animationDuration={0}
      fontSize={19}
      baseColor={colors.dropdownBaseColor}
      textColor={colors.dropdownBaseColor}
      // inactive dropdown items
      itemColor={'#aaa'}
      // active dropdown item
      selectedItemColor={'#414141'}
      labelFontSize={15}
      //pickerStyle='dialog'
      dropdownOffset={{ top: 32, left: 0 }}
      //dropdownMargin={{ min: 50, max: 100 }}
      itemCount={5}
      itemTextStyle={{ fontSize: 20, color: 'red' }}
      containerStyle={[
        {
          flex: 1,
          //marginHorizontal: 8,
          marginTop: 10,
          //backgroundColor: 'yellow',
        },
        props.containerStyle,
      ]}
      pickerStyle={{ backgroundColor: 'white' }}
      shadeOpacity={0.0}
      value={props.value}
      onChangeText={(text) => props.onChangeText(text)}
    />
  );
};
