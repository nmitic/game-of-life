import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  generateRandomArray,
  hashLife,
  Cell,
  generateEmptyArray,
} from "./game-of-life";

import GameControls from "./components/game-controls";
import GameGrid from "./components/game-grid";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: gray;
  }
`;

const GameStyled = styled.div`
  margin: -8px auto;
`;

const DeclaimerStyled = styled.p`
  color: white;
  font-family: monospace;
  text-align: center;
`;

interface UniverseProps {
  size: number;
  initialUniverse: Cell[][];
}

const Game: React.FC<UniverseProps> = ({ size, initialUniverse }) => {
  const [universe, setUniverse] = useState(initialUniverse);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running) {
      setTimeout(() => setUniverse(hashLife(universe)), 0);
    }
  }, [universe, running]);

  return (
    <GameStyled>
      <GameControls
        running={running}
        runGame={() => {
          setRunning(true);
          const newGenerationUniverse = hashLife(universe);
          setUniverse(newGenerationUniverse);
        }}
        setRandomUniverse={() => setUniverse(generateRandomArray(size, size))}
        stopGame={() => setRunning(false)}
        clear={() => {
          setUniverse(generateEmptyArray(size, size));
        }}
      />
      <GameGrid universe={universe} size={size} />
      <GlobalStyle />
    </GameStyled>
  );
};

export default Game;
