import { createSlice } from '@reduxjs/toolkit'

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
  },
})

export const { increment, decrement } = homePageSlice.actions

export default homePageSlice.reducer
