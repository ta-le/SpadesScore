import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import colors from '../constants/Colors';
import GameData from '../stateContainers/GameData';

const ScoreBoard: React.FC = (props) => {
  let gameData = GameData.useContainer();

  // configure order of Player collumns here, (0,3) and (1,2) are team
  const order: number[] = [0, 3, 1, 2];

  const renderCell: (
    content: string | number,
    teamNo: number,
    separator?: boolean
  ) => JSX.Element = (content, teamNo, separator) => {
    return (
      <View
        key={Math.random().toString()}
        style={[
          styles.cell,
          {
            backgroundColor:
              teamNo === 1
                ? colors.t1CardColor
                : teamNo === 2
                ? colors.t2CardColor
                : colors.backDropColor,
            borderLeftWidth: separator ? 3 : styles.cell.borderLeftWidth,
          },
        ]}
      >
        <Text
          style={[
            styles.cellText,
            {
              color:
                teamNo === 1
                  ? colors.t1CardTextColor
                  : teamNo === 2
                  ? colors.t2CardTextColor
                  : '#ddd',
            },
          ]}
        >
          {content}
        </Text>
      </View>
    );
  };

  const renderRow: (row: (string | number)[], idx: number) => JSX.Element = (
    row,
    idx
  ) => {
    return (
      <View key={`${idx}`} style={styles.rowContainer}>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', width: 25 }}
        >
          <Text style={styles.cellText}>{idx + 1}</Text>
        </View>

        {order.map((y) =>
          renderCell(row[2 * y] + '/' + row[2 * y + 1], team(y))
        )}
        {renderCell(row[8], 1, true)}
        {renderCell(row[9], 2)}
      </View>
    );
  };

  const renderHeader: () => JSX.Element = () => {
    return (
      <View style={styles.rowContainer}>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', width: 25 }}
        >
          <Text style={styles.cellText}>#</Text>
        </View>
        {order.map((y) => renderCell(gameData.names[y].substr(0, 8), team(y)))}
        {[1, 2].map((n) => renderCell(`T${n} Points`, n, n === 1))}
      </View>
    );
  };

  const getTotalScore: (teamNo: number) => number = (teamNo) => {
    let result = gameData.score.reduce((acc, curr) => {
      let res = acc;
      if ((acc % 10) + ((curr[8 + (teamNo - 1)] as number) % 10) >= 10)
        res -= 100;
      return res + (curr[8 + (teamNo - 1)] as number);
    }, 0);
    return result;
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={gameData.score}
        keyExtractor={(item, idx) => `r${idx}`}
        renderItem={({ item, index }) => renderRow(item, index)}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 30,
            }}
          >
            <Text style={{ color: '#b5b5b5' }}>
              Finish a round to see results here.
            </Text>
          </View>
        }
      />
      <View
        style={{
          alignSelf: 'center',
          width: '60%',
          flexDirection: 'row',
          marginTop: 1,
        }}
      >
        {renderCell('total', -1)}
        {[1, 2].map((n) => renderCell(getTotalScore(n), n, false))}
      </View>
    </View>
  );
};

const team: (i: number) => number = (i) => {
  if (i === 0 || i === 3) return 1;
  else if (i === 1 || i === 2) return 2;
  else return -1;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.backDropColor,
    paddingTop: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.backDropColor,
  },
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

export default ScoreBoard;
