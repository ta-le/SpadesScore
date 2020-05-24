import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

function useGameState() {
  // ScoreBoard Data
  //TODO: refractor score to roundData
  let [score, setScore] = useState<(number | string)[][]>([]);

  // add line with format bids[0], tricks[0], ..., bids[3], tricks[3], team1points, team2points
  let addScoreLine = (line: (number | string)[]) => {
    setScore((score) => score.concat([line]));
  };

  let editScore = (lineNumber: number, line: (number | string)[]) =>
    setScore(score.splice(lineNumber, 1, line));

  useEffect(() => {
    console.log('score change: ', score);
  }, [score]);

  // Player names
  const [names, setNames] = useState<string[]>(
    [1, 2, 3, 4].map((x) => `Player ${x}`)
  );

  let setName = (name: string, i: number) =>
    setNames(names.map((item, idx) => (idx === i - 1 ? name : item)));

  // Points and Bags
  const [points, setPoints] = useState<number[]>([0, 0]);
  const [bags, setBags] = useState<number[]>([0, 0]);

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
  };
}

let GameData = createContainer(useGameState);

export default GameData;
