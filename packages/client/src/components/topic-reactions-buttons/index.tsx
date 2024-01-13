import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton } from '@mui/material'
import { Emoji } from 'types/Forum'
import { Store } from '../../store'
import backendService from 'services/backend-service'
import { setReactions } from 'features/reactionsSlice'

type Props = {
  topicId?: string
}

export const TopicReactionsButtons = ({ topicId }: Props) => {
  const dispatch = useDispatch()
  const { emoji, list } = useSelector((state: Store) => state.reactions)
  const user = useSelector((state: Store) => state.auth.user)
  const userId = user?.id
  const activeReaction = list.find(i => i.userId === userId)

  const onSaveReaction = async (emojiId: string) => {
    if (topicId && userId) {
      try {
        if (!activeReaction) {
          const res = await backendService.addReaction({
            emojiId,
            topicId,
            userId,
          })
          dispatch(setReactions(res.data))
        } else if (activeReaction && activeReaction.emojiId !== emojiId) {
          const res = await backendService.updateReaction(activeReaction.id, {
            emojiId,
            topicId,
            userId,
          })
          dispatch(setReactions(res.data))
        } else if (activeReaction && activeReaction.emojiId === emojiId) {
          const res = await backendService.deleteReaction(
            activeReaction.id,
            topicId
          )
          dispatch(setReactions(res.data))
        }
      } catch (error) {
        console.error('Ошибка добавления/изменения реакции')
      }
    }
  }

  const renderEmojiBtn = (i: Emoji) => {
    const onClick = () => onSaveReaction(i.id)

    const activeStyle =
      activeReaction?.emojiId === i.id
        ? { lineHeight: '22px', outline: '1px solid #605c5c' }
        : { lineHeight: '22px' }

    return (
      <IconButton
        style={activeStyle}
        key={i.id}
        onClick={onClick}
        aria-label="delete"
        size="small">
        {i.img}
      </IconButton>
    )
  }

  return <Box padding={0}>{emoji.map(renderEmojiBtn)}</Box>
}
