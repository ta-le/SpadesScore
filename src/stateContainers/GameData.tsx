import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { SaveStateType } from '../constants/SaveStateType';
import { AsyncStorage } from 'react-native';

function useGameState(lastGameState: SaveStateType) {
  // ScoreBoard Data
  const [score, setScore] = useState<(number | string)[][]>(
    lastGameState.score ? lastGameState.score : []
  );

  // modify line with format bids[0], tricks[0], ..., bids[3], tricks[3], team1points, team2points
  const addScoreLine = (line: (number | string)[]) => {
    setScore((score) => score.concat([line]));
  };

  const editScoreLine = (lineNumber: number, line: (number | string)[]) =>
    setScore(score.splice(lineNumber, 1, line));

  const deleteScoreLine = (lineNumber: number) => {
    setScore(score.filter((item, idx) => idx !== lineNumber));
  };

  const deleteScoreLines = (lineNumbers: boolean[]) => {
    setScore(score.filter((item, idx) => lineNumbers[idx] === false));
  };

  // update points+bags and update AsyncStorage lastGameState everytime score changes
  useEffect(() => {
    async function updateLastGameState() {
      let currentData = getGameStateObject('last');

      await AsyncStorage.setItem(
        'lastGameState',
        JSON.stringify(currentData),
        () => console.log('lastGameState set')
      );
    }
    updatePointsBags();
    updateLastGameState();
  }, [score]);

  // Player names
  const [names, setNames] = useState<string[]>(lastGameState.players);

  const setName = (name: string, i: number) =>
    setNames(names.map((item, idx) => (idx === i - 1 ? name : item)));

  // Points and Bags
  const [points, setPoints] = useState<number[]>(lastGameState.points);
  const [bags, setBags] = useState<number[]>(lastGameState.bags);

  // resetting and loading game states
  const resetGame = () => {
    setScore([]);
    //setNames([])
    setPoints([0, 0]);
    setBags([0, 0]);
  };

  const loadSaveState = (saveState: SaveStateType) => {
    setScore(saveState.score);
    setNames(saveState.players);
    setPoints(saveState.points);
    setBags(saveState.bags);
  };

  // updates points and bags after adding, editing or deleting score rows
  const updatePointsBags: () => void = () => {
    if (score) {
      let points = [1, 2].map((teamNo) =>
        score.reduce((acc, curr) => {
          let res = acc;
          if ((acc % 10) + ((curr[8 + (teamNo - 1)] as number) % 10) >= 10)
            res -= 100;
          return res + (curr[8 + (teamNo - 1)] as number);
        }, 0)
      );
      let bags = points.map((x) => x % 10);
      setPoints(points);
      setBags(bags);
    }
  };

  // returns a game state object with all information (not of SaveStateType)
  const getGameStateObject: (name: string) => SaveStateType = (
    saveStateName
  ) => {
    return {
      name: saveStateName,
      score: score,
      players: names,
      points: points,
      bags: bags,
    } as SaveStateType;
  };

  return {
    score,
    addScoreLine,
    editScoreLine,
    deleteScoreLine,
    deleteScoreLines,
    names,
    setName,
    points,
    bags,
    getGameStateObject,
    resetGame,
    loadSaveState,
  };
}

let GameData = createContainer(useGameState);

export default GameData;
