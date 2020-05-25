import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import colors from '../constants/Colors';
import GameData from '../state/GameData';

const ScoreBoard: React.FC = (props) => {
  let gameData = GameData.useContainer();

  const bg: string[] = [
    colors.t1Color,
    colors.t2Color,
    colors.t2Color,
    colors.t1Color,
    colors.t1Color,
    colors.t2Color,
  ];

  const renderRow = (row, idx) => {
    return (
      <View key={`${idx}`} style={styles.rowContainer}>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', width: 25 }}
        >
          <Text style={styles.cellText}>{idx + 1}</Text>
        </View>
        {[0, 1, 2, 3].map((y) => (
          <View
            key={`score${y}`}
            style={[styles.cell, { backgroundColor: bg[y] }]}
          >
            <Text style={styles.cellText}>
              {row[2 * y] + '/' + row[2 * y + 1]}
            </Text>
          </View>
        ))}

        <View
          style={[styles.cell, { backgroundColor: bg[4], borderLeftWidth: 3 }]}
        >
          <Text style={styles.cellText}>{row[8]}</Text>
        </View>

        <View style={[styles.cell, { backgroundColor: bg[5] }]}>
          <Text style={styles.cellText}>{row[9]}</Text>
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.rowContainer}>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', width: 25 }}
        >
          <Text style={styles.cellText}>#</Text>
        </View>
        {[0, 1, 2, 3].map((y) => (
          <View
            key={`score${y}`}
            style={[styles.cell, { backgroundColor: bg[y] }]}
          >
            <Text style={styles.cellText}>
              {gameData.names[y].substr(0, 8)}
            </Text>
          </View>
        ))}

        <View
          style={[styles.cell, { backgroundColor: bg[4], borderLeftWidth: 3 }]}
        >
          <Text style={styles.cellText}>T1 points</Text>
        </View>

        <View style={[styles.cell, { backgroundColor: bg[5] }]}>
          <Text style={styles.cellText}>T2 points</Text>
        </View>
      </View>
    );
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
      {/*gameData.score.map((row, x) => renderRow(row, x))*/}
    </View>
  );
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
    borderTopWidth: 1,
    borderColor: '#000',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderLeftWidth: 1,
  },
  cellText: {
    color: '#ddd',
  },
});

export default ScoreBoard;
