import { AreaByOwner, ElementBase } from 'types/GameData'

export const GAME_CONSTS = {
  PLAYERS_DEFAULT_ARMY_COUNT: 15,
  PLAYERS_COUNT_LIMIT: 50,
  FREE_LAND_DEFAULT_ARMY_COUNT: 10,
  FREE_LAND_COUNT_LIMIT: 10,
  BLUE_COLOR: '#4459ff',
  GRAY_COLOR: '#cbcbcb',
  RED_COLOR: '#f95757',
  ARMY_STEP_LENGTH: 5,
}

export const areasExtendedMap: {
  user: AreaByOwner
  computer: AreaByOwner
  freeLands: AreaByOwner
} = {
  user: {
    color: GAME_CONSTS.BLUE_COLOR,
    count: GAME_CONSTS.PLAYERS_DEFAULT_ARMY_COUNT,
    limit: GAME_CONSTS.PLAYERS_COUNT_LIMIT,
    imgLink: 'blue',
  },
  computer: {
    color: GAME_CONSTS.RED_COLOR,
    count: GAME_CONSTS.PLAYERS_DEFAULT_ARMY_COUNT,
    limit: GAME_CONSTS.PLAYERS_COUNT_LIMIT,
    imgLink: 'red',
  },
  freeLands: {
    color: GAME_CONSTS.GRAY_COLOR,
    count: GAME_CONSTS.FREE_LAND_DEFAULT_ARMY_COUNT,
    limit: GAME_CONSTS.FREE_LAND_COUNT_LIMIT,
    imgLink: 'gray',
  },
}

// TODO: Доработать чтобы координаты динамически вычислялись исходя из размера экрана
export const areasBase: ElementBase[] = [
  {
    id: '1',
    position: {
      x: 336,
      y: 362,
    },
    owner: 'user',
  },
  {
    id: '2',
    position: {
      x: 481,
      y: 630,
    },
    owner: 'freeLands',
  },
  {
    id: '3',
    position: {
      x: 620,
      y: 403,
    },
    owner: 'freeLands',
  },
  {
    id: '4',
    position: {
      x: 856,
      y: 476,
    },
    owner: 'freeLands',
  },
  {
    id: '5',
    position: {
      x: 939,
      y: 700,
    },
    owner: 'freeLands',
  },
  {
    id: '6',
    position: {
      x: 1181,
      y: 409,
    },
    owner: 'freeLands',
  },
  {
    id: '7',
    position: {
      x: 1393,
      y: 642,
    },
    owner: 'freeLands',
  },
  {
    id: '8',
    position: {
      x: 1403,
      y: 348,
    },
    owner: 'freeLands',
  },
  {
    id: '9',
    position: {
      x: 1582,
      y: 663,
    },
    owner: 'freeLands',
  },
  {
    id: '10',
    position: {
      x: 892,
      y: 256,
    },
    owner: 'freeLands',
  },
  {
    id: '11',
    position: {
      x: 1552,
      y: 399,
    },
    owner: 'computer',
  },
]
