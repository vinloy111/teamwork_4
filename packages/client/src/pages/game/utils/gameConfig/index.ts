import { AreaByOwner } from 'types/GameData'

export const GAME_CONSTS = {
  PLAYERS_DEFAULT_ARMY_COUNT: 15,
  PLAYERS_COUNT_LIMIT: 50,
  FREE_LAND_DEFAULT_ARMY_COUNT: 10,
  FREE_LAND_COUNT_LIMIT: 10,
  BLUE_COLOR: '#4459ff',
  GRAY_COLOR: '#cbcbcb',
  RED_COLOR: '#f95757',
  ARMY_STEP_LENGTH_BY_SECOND: 150,
  MAX_FRAME_INTERVAL: 40,
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
