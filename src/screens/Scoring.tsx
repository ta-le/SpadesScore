import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ScreenNameList } from '../constants/ParamList';
import { PlayerCard } from '../components/PlayerCard';
import colors from '../constants/Colors';
import Score from '../state/Score';

const window = Dimensions.get('window');

const Scoring: React.FC = (props) => {
  const [dimensions, setDimensions] = useState({
    height: window.height,
    width: window.width,
  });

  const [bids, setBids] = useState<string[]>(['-', '-', '-', '-']);
  const [tricks, setTricks] = useState<string[]>(['-', '-', '-', '-']);
  const [points, setPoints] = useState([0, 0]);
  const [bags, setBags] = useState([0, 0]);

  const score = Score.useContainer();

  const navigation: StackNavigationProp<
    ScreenNameList,
    'Scoring'
  > = useNavigation();

  navigation.setOptions({
    headerRight: () => (
      <View style={{ flexDirection: 'row' }}>
        <Icon
          name='chart-bar'
          type='material-community'
          size={30}
          color='white'
          onPress={() => navigation.navigate('ScoreBoard')}
          containerStyle={{ marginRight: 15 }}
        />
        <Icon
          name='settings'
          type='material-community'
          size={30}
          color='white'
          onPress={() => navigation.navigate('Settings')}
          containerStyle={{ marginRight: 10 }}
        />
      </View>
    ),
  });

  // adjust Dimensions on change (e.g. rotate)
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
    //console.log(bids, tricks);
  }, [bids, tricks]);

  // check if bags exceed 10
  useEffect(() => {
    if (bags[0] >= 10) {
      setPoints([points[0] - 100, points[1]]);
      setBags([bags[0] - 10, bags[1]]);
    }
    if (bags[1] >= 10) {
      setPoints([points[0], points[1] - 100]);
      setBags([bags[0], bags[1] - 10]);
    }
  }, [bags]);

  // get team from index
  const team = (i) => {
    if (i === 0 || i === 3) return 0;
    else if (i === 1 || i === 2) return 1;
    else return -1;
  };

  // is called when hitting the finish round button. Calculates new points
  const finishRound = () => {
    if (bids.includes('-') || tricks.includes('-')) {
      alert('Fill in all Bids and Tricks before finishing the round.');
      return;
    }

    let newPoints = [0, 0];
    let newBags = [0, 0];

    let iBids = bids.map((x) => parseInt(x));
    let iTricks = tricks.map((x) => parseInt(x));

    // double zero and zero games

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

    // non-zero games

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

    let nextPoints: number[] = [
      points[0] + newPoints[0] + newBags[0],
      points[1] + newPoints[1] + newBags[1],
    ];

    let line: (string | number)[] = [];
    for (let i = 0; i < 4; i++) {
      line.push(bids[i]);
      line.push(tricks[i]);
    }
    line.push(newPoints[0] + newBags[0]);
    line.push(newPoints[1] + newBags[1]);
    score.addScoreLine(line);

    setPoints(nextPoints);

    setBags([bags[0] + newBags[0], bags[1] + newBags[1]]);

    setBids(['-', '-', '-', '-']);
    setTricks(['-', '-', '-', '-']);
  };

  // handle changes to big and tricks dropdowns
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

  // calculate dimensions of PlayerCard
  const tileDimensions = calcTileDimensions(
    dimensions.height,
    dimensions.width,
    2
  );

  return (
    <View style={styles.backDrop}>
      <View style={styles.container}>
        {[1, 2, 3, 4].map((i, idx) => (
          <PlayerCard
            key={i.toString()}
            playerNumber={i}
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

// calculate dimensions helper
const calcTileDimensions = (windowHeight, windowWidth, tpr) => {
  const margin: number = (windowHeight / tpr) * 0.015;
  const height: number =
    windowHeight / 2 - styles.sbButton.height - getStatusBarHeight() - 3;
  const width: number = (windowWidth - margin * (tpr * 2)) / tpr;
  return { height, width, margin };
};

export default Scoring;

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    backgroundColor: colors.backDropColor,
  },
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sbButton: {
    height: 45,
    backgroundColor: colors.finishButtonColor,
  },
});
