import React from "react";
import styled from "styled-components";
import { UniverseType } from "../game-of-life";
import Organism from "./organism";

const GameGridStyled = styled.div<{ size: number; organismSize: string }>`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(
    ${({ size }) => size},
    ${({ organismSize }) => organismSize}
  );
  grid-template-rows: repeat(
    ${({ size }) => size},
    ${({ organismSize }) => organismSize}
  );
`;

interface GameGrid {
  size: number;
  organismSize: string;
  universe: UniverseType;
  setUniverse: (universe: UniverseType) => void;
}

const GameGrid: React.FC<GameGrid> = ({
  setUniverse,
  size,
  organismSize,
  universe,
}) => {
  return (
    <GameGridStyled size={size} organismSize={organismSize}>
      {Object.keys(universe).map((coordinates) => {
        return (
          <Organism
            key={coordinates}
            universe={universe}
            setUniverse={setUniverse}
            coordinates={coordinates}
          />
        );
      })}
    </GameGridStyled>
  );
};

export default GameGrid;
