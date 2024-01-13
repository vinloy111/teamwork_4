/* eslint-disable @typescript-eslint/ban-types */
import { configureStore } from '@reduxjs/toolkit'
import gameResourcesSlice from 'features/gameResourcesSlice'
import gameSettingsReducer from 'features/gameSettingsSlice'
import authReducer from 'features/authSlice'
import userReducer from 'features/userSlice'
import reactionsReducer from 'features/reactionsSlice'

export const createStore = (initialState?: {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
      gameSettings: gameSettingsReducer,
      gameResources: gameResourcesSlice,
      user: userReducer,
      reactions: reactionsReducer,
    },
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: [
            'payload.armies',
            'payload.areas',
            'payload.audio',
          ],
          ignoredPaths: ['gameResources'],
        },
      }),
  })

const store = createStore()
export type Store = ReturnType<typeof store.getState>
