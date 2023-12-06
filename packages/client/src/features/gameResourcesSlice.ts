import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameResources } from 'types/GameData'

const initialState: GameResources = {
  areas: {},
  armies: {
    red: undefined,
    blue: undefined,
    green: undefined,
    orange: undefined,
    gray: undefined,
  },
  audio: {
    backgroundMusic: undefined,
    start: undefined,
    win: undefined,
    lose: undefined,
  },
}

const gameResourcesSlice = createSlice({
  name: 'gameResources',
  initialState,
  reducers: {
    updateGameResources: (_, action: PayloadAction<GameResources>) => {
      return {
        ...action.payload,
      }
    },
  },
})

export const { updateGameResources } = gameResourcesSlice.actions

export default gameResourcesSlice.reducer
