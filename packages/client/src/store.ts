import { configureStore } from '@reduxjs/toolkit'
import gameResourcesSlice from 'features/gameResourcesSlice'
import gameSettingsReducer from 'features/gameSettingsSlice'
import authReducer from 'features/authSlice'
import userReducer from 'features/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gameSettings: gameSettingsReducer,
    gameResources: gameResourcesSlice,
    user: userReducer,
  },
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

export type Store = ReturnType<typeof store.getState>
