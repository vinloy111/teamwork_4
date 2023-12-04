import { configureStore } from '@reduxjs/toolkit'
import homePageReducer from './features/homePageSlice'
import authReducer from './features/authSlice'
import gameSettingsReducer from './features/gameSettingsSlice'
import userReducer from './features/userSlice'

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    auth: authReducer,
    gameSettings: gameSettingsReducer,
    user: userReducer,
  },
})

export type Store = ReturnType<typeof store.getState>
