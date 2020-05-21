import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ScreenNameList } from '../constants/ParamList';
import { PlayerCard } from '../components/PlayerCard';
import Colors from '../constants/Colors';

const window = Dimensions.get('window');

const Main: React.FC = (props) => {
  const [dimensions, setDimensions] = useState({
    height: window.height,
    width: window.width,
  });

  const [bids, setBids] = useState<string[]>(['-', '-', '-', '-']);
  const [tricks, setTricks] = useState<string[]>(['-', '-', '-', '-']);
  const [points, setPoints] = useState([0, 0]);
  const [bags, setBags] = useState([0, 0]);

  const navigation: StackNavigationProp<
    ScreenNameList,
    'Main'
  > = useNavigation();

  navigation.setOptions({
    headerRight: () => (
      <Icon
        name='chart-bar'
        type='material-community'
        size={35}
        color='white'
        onPress={() => navigation.navigate('ScoreBoard')}
        containerStyle={{ marginRight: 10 }}
      />
    ),
  });

  const onChange = ({ window, screen }) => {
    setDimensions({ height: window.height, width: window.width });
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  useEffect(() => {
    console.log(bids, tricks);
  }, [bids, tricks]);

  // get team from index
  const team = (i) => {
    if (i === 0 || i === 3) return 0;
    else if (i === 1 || i === 2) return 1;
    else return -1;
  };

  const finishRound = () => {
    if (bids.includes('-') || tricks.includes('-')) {
      alert('Fill in all Bids and Tricks before finishing the round.');
      console.log(parseInt('00'));
      return;
    }

    let newPoints = [0, 0];
    let newBags = [0, 0];

    let iBids = bids.map((x) => parseInt(x));
    let iTricks = tricks.map((x) => parseInt(x));

    // double zero games

    for (let i = 0; i < 4; i++) {
      if (bids[i] === '00' && iTricks[i] === 0) {
        newPoints[team(i)] += 200;
      }
      if (bids[i] === '00' && iTricks[i] !== 0) {
        newPoints[team(i)] -= 200;
      }
      if (bids[i] === '0' && iTricks[i] === 0) {
        newPoints[team(i)] += 100;
      }
      if (bids[i] === '0' && iTricks[i] !== 0) {
        newPoints[team(i)] -= 100;
      }
    }

    if (iBids[0] + iBids[3] <= iTricks[0] + iTricks[3]) {
      newPoints[0] += (iBids[0] + iBids[3]) * 10;
      newBags[0] += iTricks[0] + iTricks[3] - (iBids[0] + iBids[3]);
    }

    if (iBids[0] + iBids[3] > iTricks[0] + iTricks[3]) {
      newPoints[0] -= (iBids[0] + iBids[3]) * 10;
    }

    if (iBids[1] + iBids[2] <= iTricks[1] + iTricks[2]) {
      newPoints[1] += (iBids[1] + iBids[2]) * 10;
      newBags[1] += iTricks[1] + iTricks[2] - (iBids[1] + iBids[2]);
    }

    if (iBids[1] + iBids[2] > iTricks[1] + iTricks[2]) {
      newPoints[1] -= (iBids[1] + iBids[2]) * 10;
    }

    setPoints([
      points[0] + newPoints[0] + newBags[0],
      points[1] + newPoints[1] + newBags[1],
    ]);

    setBags([bags[0] + newBags[0], bags[1] + newBags[1]]);

    setBids(['-', '-', '-', '-']);
    setTricks(['-', '-', '-', '-']);
  };

  const handleBidChange = (text, idx) => {
    setBids(
      bids.map((x, index) => {
        return idx === index ? text : x;
      })
    );
  };

  const handleTricksChange = (text, idx) => {
    setTricks(
      tricks.map((x, index) => {
        return idx === index ? text : x;
      })
    );
  };

  const tileDimensions = calcTileDimensions(
    dimensions.height,
    dimensions.width,
    2
  );

  const players = [1, 2, 3, 4].map((i) => `Player ${i}`);

  return (
    <View style={styles.backDrop}>
      <View style={styles.container}>
        {players.map((i, idx) => (
          <PlayerCard
            key={i}
            name={`Player ${i}`}
            bidValue={bids[idx]}
            tricksValue={tricks[idx]}
            onChangeBid={(text) => handleBidChange(text, idx)}
            onChangeTricks={(text) => handleTricksChange(text, idx)}
            points={points[team(idx)]}
            bags={bags[team(idx)]}
            height={tileDimensions.height}
            width={tileDimensions.width}
            margin={tileDimensions.margin}
          />
        ))}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          //backgroundColor: 'yellow',
        }}
      >
        <Button
          title='Finish Round'
          onPress={() => finishRound()}
          buttonStyle={styles.sbButton}
        />
      </View>
    </View>
  );
};

const calcTileDimensions = (windowHeight, windowWidth, tpr) => {
  const margin: number = (windowHeight / tpr) * 0.015;
  const height: number =
    windowHeight / 2 - styles.sbButton.height - getStatusBarHeight() - 3;
  const width: number = (windowWidth - margin * (tpr * 2)) / tpr;
  return { height, width, margin };
};

export default Main;

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    backgroundColor: Colors.backDropColor,
  },
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sbButton: {
    height: 45,
    backgroundColor: Colors.finishButtonColor,
  },
});
