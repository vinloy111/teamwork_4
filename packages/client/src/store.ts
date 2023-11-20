import { configureStore } from '@reduxjs/toolkit'
import homePageReducer from './features/homePageSlice'
import authSlice from './features/authSlice'

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    auth: authSlice,
  },
})

export type Store = ReturnType<typeof store.getState>
