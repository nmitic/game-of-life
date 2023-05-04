import React, { memo } from "react";
import styled from "styled-components";
import {
  ORGANISM_STATUS,
  UniverseType,
  OrganismStatusType,
} from "../game-of-life";

const OrganismStyled = styled.div<{ isAlive: OrganismStatusType }>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  perspective: 1000px;
  background-color: ${(props) => (props.isAlive ? "yellow" : "white")};
`;

interface OrganismProps {
  setUniverse: (universe: UniverseType) => void;
  coordinates: string;
  universe: UniverseType;
}

const Organism: React.FC<OrganismProps> = ({
  setUniverse,
  universe,
  coordinates,
}) => {
  const isAlive = universe[coordinates];
  return (
    <OrganismStyled
      isAlive={isAlive}
      onClick={() => {
        setUniverse({
          ...universe,
          [coordinates]: isAlive ? ORGANISM_STATUS.DEAD : ORGANISM_STATUS.ALIVE,
        });
      }}
    />
  );
};

export default memo(Organism);
