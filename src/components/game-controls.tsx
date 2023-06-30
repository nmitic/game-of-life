import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  text-transform: uppercase;
  cursor: pointer;
  background-color: white;
  color: black;
  border-radius: 5px;
  border: 2px solid black;
  padding: 6px 12px;
  margin-right: 6px;
  transition: all 0.1s ease-in-out;

  &:disabled {
    opacity: 0.6;
    transform: scale(0.8);
  }
`;

const GameControlsStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
  text-align: center;
  margin: 0 auto;
  padding: 12px 6px;
`;

interface GameControlsProps {
  runGame: () => void;
  stopGame: () => void;
  setRandomUniverse: () => void;
  clear: () => void;
  running: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  runGame,
  stopGame,
  setRandomUniverse,
  clear,
  running,
}) => {
  return (
    <GameControlsStyled>
      <StyledButton disabled={running} onClick={() => runGame()}>
        Run
      </StyledButton>
      <StyledButton disabled={running} onClick={() => setRandomUniverse()}>
        Set random
      </StyledButton>
      <StyledButton disabled={!running} onClick={() => stopGame()}>
        Stop
      </StyledButton>
      <StyledButton disabled={running} onClick={() => clear()}>
        clear
      </StyledButton>
    </GameControlsStyled>
  );
};

export default GameControls;
