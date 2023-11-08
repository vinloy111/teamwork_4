import { configureStore } from '@reduxjs/toolkit'
import homePageReducer from './features/homePageSlice'

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
