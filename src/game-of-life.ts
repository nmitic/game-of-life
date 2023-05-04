export enum ORGANISM_STATUS {
  ALIVE = 1,
  DEAD = 0
}

export type OrganismStatusType = ORGANISM_STATUS.ALIVE | ORGANISM_STATUS.DEAD

export type UniverseType = {[k: string]: OrganismStatusType}
export type DestroyedUniverseType = {[k: string]: 0}

export const makeUniverse = (universeSize: number, chaosMode = false):UniverseType  => {
  let universe = {} as UniverseType
  const universeItems = universeSize * universeSize

  for (let index = 0; index < universeItems; index++) {
    // calculating organism coordinates based on the universe size
    const xCoordinate = (index - index % universeSize) / universeSize
    const yCoordinate = index % universeSize;
    const status = chaosMode ? Math.round(Math.random()) : ORGANISM_STATUS.DEAD
    // storing coordinates in a string so it can be accessed using object lookup
    universe[`${xCoordinate},${yCoordinate}`] = status as OrganismStatusType
  }

  return universe
}

export const getAliveNeighborsCount = (organismCoordinates: string, universe: UniverseType):number => {
  const [ xCoordinate, yCoordinate ] = organismCoordinates.split(',').map(Number)

  // calculate all 8 neighbors coordinates surrounding the organism
  return [
    [xCoordinate - 1, yCoordinate - 1],
    [xCoordinate, yCoordinate - 1],
    [xCoordinate + 1, yCoordinate - 1],
    [xCoordinate - 1, yCoordinate],
    [xCoordinate + 1, yCoordinate],
    [xCoordinate - 1, yCoordinate + 1],
    [xCoordinate, yCoordinate + 1],
    [xCoordinate + 1, yCoordinate + 1],
  ]
  .filter(organismCoordinates => {
    //filtering organism which are out of grid boundaries 
    return !organismCoordinates.some(coordinates => coordinates > Math.sqrt(Object.keys(universe).length) || coordinates < 0)
  })
  .filter(organismCoordinates => {
    //removing dead organisms
    return universe[organismCoordinates.toString()]
  })
  .length
}

export const advanceGeneration = (universe: UniverseType):UniverseType => {

  let nextGeneration = {...universe}

  for (const organismCoordinates in universe) {
    const aliveNeighborsCount = getAliveNeighborsCount(organismCoordinates , universe)

    if (universe[organismCoordinates] === ORGANISM_STATUS.ALIVE && aliveNeighborsCount === 2) {
      nextGeneration[organismCoordinates] = ORGANISM_STATUS.ALIVE
    } 

    if (aliveNeighborsCount === 3) {
      nextGeneration[organismCoordinates] = ORGANISM_STATUS.ALIVE
    }

    if (aliveNeighborsCount < 2 || aliveNeighborsCount > 3) {
      nextGeneration[organismCoordinates] = ORGANISM_STATUS.DEAD
    }
  }

  return nextGeneration
}

// set all organism to be dead
export const destroyUniverse = (universe: UniverseType):DestroyedUniverseType => Object.keys(universe).reduce((acc, key) => ({...acc, [key]: 0}), {})

// naive but useful way for checking shallow equality 
const shallowCompare = (obj1: {[k: string]: any}, obj2: {[k: string]: any}):boolean =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => obj1[key] === obj2[key]);

// checks if there are changes between generations
export const noChangesInTheUniverse = (oldUniverse: UniverseType, newUniverse: UniverseType):boolean => shallowCompare(oldUniverse, newUniverse)