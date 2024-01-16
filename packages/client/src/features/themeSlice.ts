import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import backendService from '../services/backend-service'
import { UserTheme } from 'types/UserTheme'
import { Theme } from 'types/Theme'

interface ThemeState {
  userTheme: UserTheme | null
  allThemes: Theme[]
  loading: boolean
}

const initialState: ThemeState = {
  userTheme: null,
  allThemes: [],
  loading: false,
}

export const fetchUserTheme = createAsyncThunk(
  'theme/fetchUserTheme',
  async (userId: string, thunkAPI) => {
    const response = await backendService.getUserTheme(userId)
    return response.data
  }
)

export const fetchAllThemes = createAsyncThunk(
  'theme/fetchAllThemes',
  async (_, thunkAPI) => {
    const response = await backendService.getAllThemes()
    return response.data
  }
)

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setUserTheme: (state, action) => {
      state.userTheme = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserTheme.fulfilled, (state, action) => {
        state.userTheme = action.payload
      })
      .addCase(fetchAllThemes.fulfilled, (state, action) => {
        state.allThemes = action.payload
      })
  },
})

export const { setUserTheme } = themeSlice.actions
export default themeSlice.reducer
