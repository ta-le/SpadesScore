import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { CustomDropdown } from './CustomDropdown';
import PlayerNames from '../state/PlayerNames';

interface PlayerCardProps {
  playerNumber: number;
  bidValue: string;
  tricksValue: string;
  onChangeBid: (arg0: string) => void;
  onChangeTricks: (arg0: string) => void;
  points: number;
  bags: number;
  height: number;
  width: number;
  margin: number;
}

export const PlayerCard: React.FC<PlayerCardProps> = (props) => {
  let playerNamesC = PlayerNames.useContainer();

  return (
    <View
      style={[
        styles.container,
        {
          height: props.height,
          width: props.width,
          margin: props.margin,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <TextInput
          autoCompleteType={'off'}
          autoCorrect={false}
          allowFontScaling={false}
          maxLength={20}
          onChangeText={(text) =>
            playerNamesC.setName(text, props.playerNumber)
          }
          selectTextOnFocus
          value={playerNamesC.names[props.playerNumber - 1]}
          style={styles.headingInput}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <CustomDropdown
          label='Bid'
          data={[{ value: '00' }].concat(
            Array.from(Array(14).keys()).map(function (val) {
              return { value: val.toString() };
            })
          )}
          value={props.bidValue}
          onChangeText={(text) => props.onChangeBid(text)}
          containerStyle={{ marginRight: 5 }}
        />
        <CustomDropdown
          label='Tricks'
          data={Array.from(Array(14).keys()).map(function (val) {
            return { value: val.toString() };
          })}
          value={props.tricksValue}
          onChangeText={(text) => props.onChangeTricks(text)}
          containerStyle={{ marginLeft: 5 }}
        />
      </View>

      <View style={styles.rowsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.pointsTextStyle}>Points:</Text>
          <Text style={styles.pointsTextStyle}>{props.points}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.pointsTextStyle}>{'  Bags:'}</Text>
          <Text style={styles.pointsTextStyle}>{props.bags}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#525252',
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 20,
    paddingTop: 12,
    justifyContent: 'center',
    //backgroundColor: 'yellow',
  },
  headingInput: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
    color: '#ddd',
    width: 100,
    marginTop: 5,
  },
  rowsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 7,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#777',
    alignItems: 'center',
    marginBottom: 15,
    width: 130,
  },
  pointsTextStyle: {
    color: '#ddd',
    fontSize: 20,
  },
});
