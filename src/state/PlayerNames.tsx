import React, { useState } from 'react';
import { createContainer } from 'unstated-next';

let initial = [1, 2, 3, 4].map((x) => `Player ${x}`);

function usePlayerNames(initialState = initial) {
  const [names, setNames] = useState<string[]>(initialState);
  let setName = (name: string, i: number) =>
    setNames(names.map((item, idx) => (idx === i - 1 ? name : item)));

  return { names, setName };
}

let PlayerNames = createContainer(usePlayerNames);

export default PlayerNames;
