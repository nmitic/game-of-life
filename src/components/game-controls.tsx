import React from 'react'
import styled from 'styled-components'
import { UniverseType } from '../game-of-life'

const StyledButton = styled.button`
  text-transform: uppercase;
  //width: 10%;
  cursor: pointer;
`

const GameControlsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  position: sticky;
  top: 0;
  margin-bottom: 1rem;
  justify-content: center;
`

interface GameControlsProps {
  runGame: (universe: UniverseType, history: UniverseType[]) => void,
  stopGame: () => void,
  clearGame: () => void,
  runChaosMode: () => void,
  runGameBackward: (history: UniverseType[]) => void,
  runOneStepForward: (universe: UniverseType,  history: UniverseType[]) => void,
  runOneStepBackward: (history: UniverseType[]) => void,
  playing: boolean,
  universe: UniverseType,
  history: UniverseType[]
}

const GameControls: React.FC<GameControlsProps> = ({
  runGame,
  stopGame,
  clearGame,
  runChaosMode,
  universe,
  playing,
  runOneStepForward,
  runOneStepBackward,
  history,
  runGameBackward,
}) => {
  const hasNoHistory = history.length === 0
  return (
    <GameControlsStyled>
      <StyledButton onClick={() => {
          runGame(universe, history)
        }}
        disabled={playing}
      >
          run
      </StyledButton>
      <StyledButton onClick={() => {
        runGameBackward(history)
      }}
        disabled={playing || hasNoHistory}
      >
        run backward
      </StyledButton>
      <StyledButton onClick={() => stopGame()}
        disabled={!playing}
      >
          stop
      </StyledButton>
      <StyledButton onClick={() => runChaosMode()}
        disabled={playing}
      >
          run chaos mode
      </StyledButton>
      <StyledButton onClick={() => clearGame()}
        disabled={playing}
      >
          clear
      </StyledButton>
        <StyledButton onClick={() => runOneStepForward(universe, history)}
          disabled={playing}
        >
            one forward
        </StyledButton>
      <StyledButton onClick={() => runOneStepBackward(history)}
          disabled={hasNoHistory || playing}
      >
        one backward
      </StyledButton>
    </GameControlsStyled>
  )
}

export default GameControls