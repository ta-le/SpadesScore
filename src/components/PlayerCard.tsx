import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomDropdown } from './CustomDropdown';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const PlayerCard = props => {
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
        <Text style={styles.heading}>{props.name}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <CustomDropdown
          label='Bid'
          data={[{ value: '00' }].concat(
            Array.from(Array(14).keys()).map(function(val) {
              return { value: val.toString() };
            })
          )}
          value={props.bidValue}
          onChangeText={text => props.onChangeBid(text)}
          containerStyle={{ marginRight: 5 }}
        />
        <CustomDropdown
          label='Tricks'
          data={Array.from(Array(14).keys()).map(function(val) {
            return { value: val.toString() };
          })}
          value={props.tricksValue}
          onChangeText={text => props.onChangeTricks(text)}
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
  heading: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
    color: '#ddd',
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
