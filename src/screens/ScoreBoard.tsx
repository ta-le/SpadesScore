import React, { ReactText } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import colors from '../constants/Colors';
import GameData from '../stateContainers/GameData';

const ScoreBoard: React.FC = (props) => {
  let gameData = GameData.useContainer();

  // configure order of Player collumns here, (0,3) and (1,2) are team
  const order: number[] = [0, 3, 1, 2];

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

  const Row: React.FC<{
    row: ReactText[]; //string | number[];
    idx: number;
  }> = (props) => {
    return (
      <View key={`${props.idx}`} style={styles.rowContainer}>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', width: 28 }}
        >
          <Text style={styles.cellText}>{props.idx + 1}</Text>
        </View>

        {order.map((y) => (
          <Cell
            key={`cell${props.idx}${y}`}
            content={props.row[2 * y] + '/' + props.row[2 * y + 1]}
            teamNo={team(y)}
          />
        ))}
        <Cell content={props.row[8]} teamNo={1} separator={true} />
        <Cell content={props.row[9]} teamNo={2} />
      </View>
    );
  };

  const Header = () => {
    return (
      <View style={[styles.rowContainer, styles.headerRowContainer]}>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', width: 28 }}
        >
          <Text style={styles.cellText}>#</Text>
        </View>
        {order.map((y) => (
          <Cell
            key={`headerCell${y}`}
            content={gameData.names[y].substr(0, 8)}
            teamNo={team(y)}
          />
        ))}
        {[1, 2].map((n) => (
          <Cell
            key={`hedaerCell$${3 + n}`}
            content={`T${n} Points`}
            teamNo={n}
            separator={n === 1}
          />
        ))}
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
      <Header />
      <FlatList
        data={gameData.score}
        keyExtractor={(item, idx) => `r${idx}`}
        renderItem={({ item, index }) => <Row row={item} idx={index} />}
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
      <View style={styles.totalContainer}>
        <Cell content={'Total'} teamNo={-1} />
        {[1, 2].map((n) => (
          <Cell
            key={`totalCell${n}`}
            content={getTotalScore(n)}
            teamNo={n}
            separator={false}
          />
        ))}
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
  headerRowContainer: {
    borderBottomWidth: 3,
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
  totalContainer: {
    alignSelf: 'center',
    width: '60%',
    flexDirection: 'row',
    marginTop: 3,
  },
});

export default ScoreBoard;
