import { AreaByOwner } from 'types/GameData'

export const GAME_CONSTS = {
  PLAYERS_DEFAULT_ARMY_COUNT: 15,
  PLAYERS_COUNT_LIMIT: 50,
  FREE_LAND_DEFAULT_ARMY_COUNT: 10,
  FREE_LAND_COUNT_LIMIT: 10,
  BLUE_COLOR: '#4459ff',
  GRAY_COLOR: '#cbcbcb',
  RED_COLOR: '#f95757',
  GREEN_COLOR: '#00a203',
  ORANGE_COLOR: '#ff8f01',
  ARMY_STEP_LENGTH_BY_SECOND: 150,
  MAX_FRAME_INTERVAL: 40,
}

export const areasExtendedMap: {
  blue: AreaByOwner
  red: AreaByOwner
  green: AreaByOwner
  orange: AreaByOwner
  gray: AreaByOwner
} = {
  blue: {
    color: GAME_CONSTS.BLUE_COLOR,
    count: GAME_CONSTS.PLAYERS_DEFAULT_ARMY_COUNT,
    limit: GAME_CONSTS.PLAYERS_COUNT_LIMIT,
  },
  red: {
    color: GAME_CONSTS.RED_COLOR,
    count: GAME_CONSTS.PLAYERS_DEFAULT_ARMY_COUNT,
    limit: GAME_CONSTS.PLAYERS_COUNT_LIMIT,
  },
  green: {
    color: GAME_CONSTS.GREEN_COLOR,
    count: GAME_CONSTS.PLAYERS_DEFAULT_ARMY_COUNT,
    limit: GAME_CONSTS.PLAYERS_COUNT_LIMIT,
  },
  orange: {
    color: GAME_CONSTS.ORANGE_COLOR,
    count: GAME_CONSTS.PLAYERS_DEFAULT_ARMY_COUNT,
    limit: GAME_CONSTS.PLAYERS_COUNT_LIMIT,
  },
  gray: {
    color: GAME_CONSTS.GRAY_COLOR,
    count: GAME_CONSTS.FREE_LAND_DEFAULT_ARMY_COUNT,
    limit: GAME_CONSTS.FREE_LAND_COUNT_LIMIT,
  },
}
