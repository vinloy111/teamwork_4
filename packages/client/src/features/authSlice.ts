import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'types/User'

interface AuthState {
  user: User | null
}

const initialState: AuthState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    clearUser: state => {
      state.user = null
    },
  },
})

export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer
