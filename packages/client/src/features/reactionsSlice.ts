import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Emoji, Reaction } from 'types/Forum'

type ReactionsStore = {
  emoji: Emoji[]
  list: Reaction[]
}

const initialState: ReactionsStore = {
  emoji: [
    {
      id: '1',
      img: '\uD83D\uDC4D',
      description: 'Одобрение',
    },
    {
      id: '2',
      img: '\uD83D\uDE00',
      description: 'Улыбка',
    },
    {
      id: '3',
      img: '\uD83E\uDD14',
      description: 'Задумчивость',
    },
    {
      id: '4',
      img: '\uD83D\uDE21',
      description: 'Злость',
    },
  ],
  list: [],
}

const reactionSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers: {
    setReactions: (state, action: PayloadAction<Reaction[]>) => {
      return {
        ...state,
        list: action.payload,
      }
    },
  },
})

export const { setReactions } = reactionSlice.actions

export default reactionSlice.reducer
