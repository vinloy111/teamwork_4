import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type GameSettings = {
  backgroundMusicVolume: number
  soundVolume: number
}

const initialState: GameSettings = {
  backgroundMusicVolume: 0.2,
  soundVolume: 0.3,
}

const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    changeBackgroundMusicVolume: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        backgroundMusicVolume: action.payload
          ? initialState.backgroundMusicVolume
          : 0,
      }
    },
    changeSoundVolume: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        soundVolume: action.payload ? initialState.soundVolume : 0,
      }
    },
  },
})

export const { changeBackgroundMusicVolume, changeSoundVolume } =
  gameSettingsSlice.actions

export default gameSettingsSlice.reducer
