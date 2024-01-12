import { useSelector } from 'react-redux'
import { Reaction } from 'types/Forum'
import { Box } from '@mui/material'
import { Store } from '../../store'

export const TopicReactionsShow = () => {
  const { emoji, list } = useSelector((state: Store) => state.reactions)

  const renderReactions = (i: Reaction) => {
    const img = emoji.find(em => em.id === i.emojiId)?.img
    return <span>{img}</span>
  }

  const content = list?.length ? (
    <>{list.map(renderReactions)}</>
  ) : (
    <>Еще нет реакций, вы можете стать первым отреагировавшим на эту тему</>
  )

  return (
    <Box textAlign="left">
      <span style={{ marginRight: 10 }}>Реакции:</span>
      {content}
    </Box>
  )
}
