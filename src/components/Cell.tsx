import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/Colors';

const Cell: React.FC<{
  content: string | number;
  teamNo: number;
  separator?: boolean;
}> = (props) => {
  return (
    <View
      style={[
        styles.cell,
        {
          backgroundColor:
            props.teamNo === 1
              ? colors.t1CardColor
              : props.teamNo === 2
              ? colors.t2CardColor
              : colors.backDropColor,
          borderLeftWidth: props.separator ? 3 : styles.cell.borderLeftWidth,
        },
      ]}
    >
      <Text
        style={[
          styles.cellText,
          {
            color:
              props.teamNo === 1
                ? colors.t1CardTextColor
                : props.teamNo === 2
                ? colors.t2CardTextColor
                : '#ddd',
          },
        ]}
      >
        {props.content}
      </Text>
    </View>
  );
};

export default Cell;

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderLeftWidth: 1,
    borderColor: colors.backDropColor,
  },
  cellText: {
    color: '#ddd',
  },
});
