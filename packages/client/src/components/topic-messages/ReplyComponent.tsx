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
  onSaveMessage: (content: string) => void
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
  onSaveMessage,
}: MessageProps) => {
  const [message, setMessage] = useState<Message | null>(initMessage || null)
  const [text, setText] = useState(initMessage?.content || '')
  const [isEditable, setIsEditable] = useState(false)
  useEffect(() => {
    //setMessage({ createdAt: '', updatedAt: '', id: 'new', idAuthor: '', content: text })
  }, [text])
  const onTextChange = (value: string) => {
    setText(value)
    //onSaveMessage({ createdAt: '', updatedAt: '', id: 'new', idAuthor: '', content: value })
  }
  const rteRef = useRef<RichTextEditorRef>(null)
  const user = useSelector((state: Store) => state.auth.user)
  const fullPermission = user?.id === message?.idAuthor

  return (
    <Paper sx={{ my: 2, minWidth: isEditable ? '100%' : '50%' }}>
      <Stack
        sx={{
          py: 1,
          px: 2,
          paddingBottom: 3,
        }}>
        <HeaderMessageComponent
          userName={message?.userName}
          fullPermission={fullPermission}
          editing={isEditable}
          setEditing={setIsEditable}
        />
        <MessageComponent
          initMessage={message}
          isEditable={isEditable}
          onSaveMessage={onSaveMessage}
        />
      </Stack>
    </Paper>
  )
}
