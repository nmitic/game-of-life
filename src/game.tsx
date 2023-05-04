import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  makeUniverse,
  advanceGeneration,
  destroyUniverse,
  noChangesInTheUniverse,
  UniverseType,
} from "./game-of-life";

import GameControls from "./components/game-controls";
import GameGrid from "./components/game-grid";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: gray;
  }
`;

const GameStyled = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const DeclaimerStyled = styled.p`
  color: white;
  font-family: monospace;
  text-align: center;
`;

interface UniverseProps {
  size: number;
  organismSize?: string;
}

const Game: React.FC<UniverseProps> = ({ size, organismSize = "20px" }) => {
  const [universe, setUniverse] = useState<UniverseType>(
    makeUniverse(size, false)
  );
  const [gameId, setGameId] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [history, setHistory] = useState<UniverseType[]>([]);

  const runGameBackward = (history: UniverseType[]): void => {
    setPlaying(true);
    const hasNoHistory = history.length === 0;

    if (hasNoHistory) {
      stopGame();
      return;
    }

    const pastHistory = runOneStepBackward(history);

    const gameId = window.setTimeout(() => runGameBackward(pastHistory), 1);
    setGameId(gameId);
  };

  const runGame = (
    currentUniverse: UniverseType,
    history: UniverseType[]
  ): void => {
    setPlaying(true);
    const [newUniverse, newHistory] = runOneStepForward(
      currentUniverse,
      history
    );

    if (noChangesInTheUniverse(currentUniverse, newUniverse)) {
      stopGame();
      return;
    }

    const gameId = window.setTimeout(() => runGame(newUniverse, newHistory), 1);
    setGameId(gameId);
  };

  const stopGame = (): void => {
    setPlaying(false);
    clearTimeout(gameId);
  };

  const clearGame = (): void => {
    setPlaying(false);
    stopGame();
    setUniverse(destroyUniverse(universe));
    setHistory([]);
  };

  const runChaosMode = (): void => {
    const chaosUniverse = makeUniverse(size, true);
    setUniverse(chaosUniverse);
    runGame(chaosUniverse, history);
  };

  const runOneStepForward = (
    currentUniverse: UniverseType,
    history: UniverseType[]
  ): [UniverseType, UniverseType[]] => {
    const newUniverse = advanceGeneration(currentUniverse);
    const newHistory = [...history, currentUniverse];
    setUniverse(newUniverse);
    setHistory(newHistory);

    return [newUniverse, newHistory];
  };

  const runOneStepBackward = (history: UniverseType[]): UniverseType[] => {
    const pastUniverse = history[history.length - 1];
    const pastHistory = [...history.slice(0, history.length - 1)];
    setUniverse(pastUniverse);
    setHistory(pastHistory);

    return pastHistory;
  };

  return (
    <GameStyled>
      <GameControls
        runChaosMode={runChaosMode}
        runGame={runGame}
        runGameBackward={runGameBackward}
        stopGame={stopGame}
        clearGame={clearGame}
        universe={universe}
        history={history}
        playing={playing}
        runOneStepForward={runOneStepForward}
        runOneStepBackward={runOneStepBackward}
      />
      <DeclaimerStyled>
        You can click on organism to make it alive or dead and set initial
        universe state.
      </DeclaimerStyled>
      <GameGrid
        universe={universe}
        setUniverse={setUniverse}
        size={size}
        organismSize={organismSize}
      />
      <GlobalStyle />
    </GameStyled>
  );
};

export default Game;
