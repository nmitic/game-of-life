import React from "react";
import styled from "styled-components";
import { Cell } from "../game-of-life";

const GameGridStyled = styled.div<{ gridSize: number }>`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(
    ${({ gridSize }) => gridSize},
    ${({ gridSize }) => `${100 / gridSize}vw`}
  );
  grid-template-rows: repeat(
    ${({ gridSize }) => gridSize},
    ${({ gridSize }) => `${100 / gridSize}vh`}
  );
`;

const CellStyled = styled.div<{ alive: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${({ alive }) => (!alive ? "white" : "yellow")};
  border: 1px solid black;
  box-sizing: border-box;
`;

interface GameGrid {
  size: number;
  universe: Cell[][];
}

const GameGrid: React.FC<GameGrid> = ({ size, universe }) => {
  return (
    <>
      <GameGridStyled gridSize={size}>
        {universe.map((row) => {
          return row.map((col) => {
            return <CellStyled alive={Boolean(col)} />;
          });
        })}
      </GameGridStyled>
    </>
  );
};

export default GameGrid;
