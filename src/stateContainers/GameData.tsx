import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { SaveStateType } from '../constants/SaveStateType';

function useGameState(lastGameState: SaveStateType) {
  // ScoreBoard Data
  //TODO: refractor score to roundData
  let [score, setScore] = useState<(number | string)[][]>(
    lastGameState.roundData
  );

  // add line with format bids[0], tricks[0], ..., bids[3], tricks[3], team1points, team2points
  let addScoreLine = (line: (number | string)[]) => {
    setScore((score) => score.concat([line]));
  };

  let editScore = (lineNumber: number, line: (number | string)[]) =>
    setScore(score.splice(lineNumber, 1, line));

  // Player names
  const [names, setNames] = useState<string[]>(lastGameState.players);

  let setName = (name: string, i: number) =>
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
    setScore(saveState.roundData);
    setNames(saveState.players);
    setPoints(saveState.points);
    setBags(saveState.bags);
  };

  let getGameStateObject = (saveStateName: string) => {
    return {
      name: saveStateName,
      roundData: score,
      players: names,
      points: points,
      bags: bags,
    };
  };

  return {
    score,
    setScore,
    addScoreLine,
    editScore,
    names,
    setName,
    points,
    setPoints,
    bags,
    setBags,
    getGameStateObject,
    resetGame,
    loadSaveState,
  };
}

let GameData = createContainer(useGameState);

export default GameData;
