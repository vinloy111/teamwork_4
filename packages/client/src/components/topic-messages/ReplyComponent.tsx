import { Message } from 'types/Forum'
import { ReactNode, useEffect, useRef, useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  Avatar,
  IconButton,
  MenuItem,
  Stack,
} from '@mui/material'
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from 'mui-tiptap'
import Button from '@mui/material/Button'
import { StarterKit } from '@tiptap/starter-kit'
import Box from '@mui/material/Box'
import { TopicReactionsButtons } from 'components/topic-reactions-buttons'
import DeleteIcon from '@mui/icons-material/Delete'
import ReplyIcon from '@mui/icons-material/Reply'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import { NavLink } from 'react-router-dom'
import { theme } from 'theme/index'
import Typography from '@mui/material/Typography'
import { getUserName } from 'utils/adaptUserData'
import backendService from 'services/backend-service'
import { HeaderMessageComponent } from 'components/topic-messages/HeaderMessageComponent'
import { MessageComponent } from 'components/topic-messages/MessageComponent'
import Paper from '@mui/material/Paper'

export declare type MessageProps = {
  initMessage?: Message | null
  topicId?: string
  onAddReply: (content: string) => void
  onDeleteReply: (idReply: string) => void
}

/**
 * Компонент Ответа на комментарий в топике
 * @param initMessage
 * @param isEditable
 * @param onSaveMessage
 * @constructor
 */
export const ReplyComponent = ({
  initMessage,
  onAddReply,
  onDeleteReply,
}: MessageProps) => {
  const [reply, setReply] = useState<Message | null>(initMessage || null)
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
