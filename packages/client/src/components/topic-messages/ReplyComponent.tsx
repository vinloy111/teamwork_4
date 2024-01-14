import { Message } from 'types/Forum'
import { useState } from 'react'
import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import { HeaderMessageComponent } from 'components/topic-messages/HeaderMessageComponent'
import { MessageComponent } from 'components/topic-messages/MessageComponent'
import Paper from '@mui/material/Paper'

export declare type MessageProps = {
  reply?: Message | null
  topicId?: string
  onAddReply: (content: string) => void
  onDeleteReply: (idReply: string) => void
}

/**
 * Компонент Ответа на комментарий в топике
 * @param initMessage
 * @constructor
 */
export const ReplyComponent = ({
  reply,
  onAddReply,
  onDeleteReply,
}: MessageProps) => {
  const [isEditable, setIsEditable] = useState(false)
  const user = useSelector((state: Store) => state.auth.user)
  const fullPermission = user?.id === reply?.idAuthor

  if (!reply) return null
  return (
    <Paper sx={{ my: 2, minWidth: isEditable ? '100%' : '50%' }}>
      <Stack
        sx={{
          py: 1,
          px: 2,
          paddingBottom: 3,
        }}>
        <HeaderMessageComponent
          userName={reply?.userName}
          fullPermission={fullPermission}
          editing={isEditable}
          setEditing={setIsEditable}
          onDelete={() => onDeleteReply(reply.id)}
        />
        <MessageComponent
          initMessage={reply}
          isEditable={isEditable}
          onSaveMessage={onAddReply}
        />
      </Stack>
    </Paper>
  )
}
