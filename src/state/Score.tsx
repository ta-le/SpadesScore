import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

function useScore(initialState: (number | string)[][] = []) {
  let [score, setScore] = useState<(number | string)[][]>(initialState);

  // add line with format bids[0], tricks[0], ..., bids[3], tricks[3], team1points, team2points
  let addScoreLine = (line: (number | string)[]) => {
    setScore((score) => score.concat([line]));
  };

  let editScore = (lineNumber: number, line: (number | string)[]) =>
    setScore(score.splice(lineNumber, 1, line));

  useEffect(() => {
    console.log('score change: ', score);
  }, [score]);
  return { score, addScoreLine, editScore };
}

let Score = createContainer(useScore);

export default Score;
