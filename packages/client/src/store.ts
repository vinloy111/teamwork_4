import { configureStore } from '@reduxjs/toolkit'
import homePageReducer from './features/homePageSlice'
import authReducer from './features/authSlice'

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    auth: authReducer,
  },
})

export type Store = ReturnType<typeof store.getState>
