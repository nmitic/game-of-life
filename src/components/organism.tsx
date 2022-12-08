import React, { memo } from 'react'
import styled from 'styled-components'
import { ORGANISM_STATUS, UniverseType, OrganismStatusType } from '../game-of-life'

const OrganismStyled = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  perspective: 1000px;
`


const FaceStyled = styled.div<{ isAlive: OrganismStatusType }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.isAlive ? "yellow" : "white"};
  box-shadow:inset 0 0 0 1px #333; 
`

const FrontStyled = styled(FaceStyled)`
  transform: rotateX(0deg) translateZ(10px);
`
const BackStyled = styled(FaceStyled)`
  transform: rotateX(-180deg) translateZ(10px);
`
const RightStyled = styled(FaceStyled)`
  transform: rotateY(90deg) translateZ(10px);
`
const LeftStyled = styled(FaceStyled)`
  transform: rotateY(-90deg) translateZ(10px);
`
const TopStyled = styled(FaceStyled)`
  transform: rotateX(90deg) translateZ(10px);
`
const BottomStyled = styled(FaceStyled)`
  transform: rotateX(-90deg) translateZ(10px);
`

const CubeStyled = styled.div`
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
  position: relative;
  transform: rotate3d(42,26,-19,48deg);
`

interface OrganismProps {
  setUniverse: (universe: UniverseType) => void,
  coordinates: string,
  universe: UniverseType
}

const Organism: React.FC<OrganismProps> = ({ setUniverse, universe, coordinates }) => {
  const isAlive = universe[coordinates]
  return (
    <OrganismStyled onClick={() => {
      setUniverse({
        ...universe,
        [coordinates]: isAlive ? ORGANISM_STATUS.DEAD : ORGANISM_STATUS.ALIVE
      })
    }}
    >
      <CubeStyled>
        <FrontStyled isAlive={isAlive} />
        <BackStyled isAlive={isAlive} />
        <RightStyled isAlive={isAlive} />
        <LeftStyled isAlive={isAlive} />
        <TopStyled isAlive={isAlive} />
        <BottomStyled isAlive={isAlive} />
      </CubeStyled>
    </OrganismStyled>
  )
}

export default memo(Organism)