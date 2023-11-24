import { configureStore } from '@reduxjs/toolkit'
import homePageReducer from './features/homePageSlice'
import authReducer from './features/authSlice'
import gameSettingsReducer from './features/gameSettingsSlice'

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    auth: authReducer,
    gameSettings: gameSettingsReducer,
  },
})

export type Store = ReturnType<typeof store.getState>
