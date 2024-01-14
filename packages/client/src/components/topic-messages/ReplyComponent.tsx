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

export declare type MessageProps = {
  initMessage?: Message | null
  isEditable?: boolean
  topicId?: string
  onSaveMessage: (message: Message) => void
}

function Item(props: { children: ReactNode }) {
  return null
}

/**
 * Компонент для сообщения в теме форума.
 * Предполагается, что потом каждое сообщение можно будет изменить,
 * если у авторизованного юзера будет на это право (он автор или админ).
 * В header добавятся кнопки 'Изменить', 'Удалить', 'Цитировать'
 * Дальше еще работа с эмоджи.
 * Плюс доработка дизайна
 * есть смысл выделить RichTextEditor в отдельный компонент
 * @param initMessage
 * @param isEditable
 * @param topicId
 * @param onSaveMessage
 * @constructor
 */
export const MessageComponent = ({
  initMessage,
  isEditable,
  topicId,
  onSaveMessage,
}: MessageProps) => {
  const [message, setMessage] = useState<Message | null>(initMessage || null)
  const [text, setText] = useState(initMessage?.content || '')
  const [showMenuBar, setShowMenuBar] = useState(isEditable || false)
  const [replies, setReplies] = useState<Message[]>([])
  const [expandedReplies, setExpandedReplies] = useState(false)
  useEffect(() => {
    //setMessage({ createdAt: '', updatedAt: '', id: 'new', idAuthor: '', content: text })
  }, [text])
  const onTextChange = (value: string) => {
    setText(value)
    //onSaveMessage({ createdAt: '', updatedAt: '', id: 'new', idAuthor: '', content: value })
  }
  const getReplies = () => {
    if (!message) return
    backendService.getReplies(message.id).then(res => setReplies(res.data))
  }
  useEffect(() => {
    getReplies()
  }, [])

  const rteRef = useRef<RichTextEditorRef>(null)
  const user = useSelector((state: Store) => state.auth.user)
  const fullPermission = user?.id === message?.idAuthor
  const renderHeader = () => (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" justifyContent="space-start" alignItems="center">
        <Typography>{message?.userName || 'Anonimus'}</Typography>
      </Stack>
      <Box>
        {fullPermission ? (
          <>
            <IconButton aria-label="delete" color="secondary" size={'small'}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="delete" color="secondary" size={'small'}>
              <EditIcon />
            </IconButton>
          </>
        ) : null}
        <IconButton aria-label="delete" color="secondary">
          <ReplyIcon />
        </IconButton>
        {replies && replies.length > 0 && (
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            size={'medium'}
            onClick={() => setExpandedReplies(!expandedReplies)}>
            <ExpandMoreIcon />
          </IconButton>
        )}
      </Box>
    </Stack>
  )
  const renderContent = () => (
    <RichTextEditor
      ref={rteRef}
      extensions={[StarterKit]}
      content={text}
      editable={isEditable}
      renderControls={() => (
        <MenuControlsContainer>
          <MenuSelectHeading />
          <MenuDivider />
          <MenuButtonBold />
          <MenuButtonItalic />
        </MenuControlsContainer>
      )}
      RichTextFieldProps={{
        variant: 'outlined',
        MenuBarProps: {
          hide: !showMenuBar,
        },
        footer: isEditable && (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            sx={{
              borderTopStyle: 'solid',
              borderTopWidth: 1,
              borderTopColor: theme => theme.palette.divider,
              py: 1,
              px: 1.5,
            }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                onTextChange(rteRef.current?.editor?.getHTML() ?? '')
              }}>
              Отправить
            </Button>
            <TopicReactionsButtons topicId={topicId} />
          </Stack>
        ),
      }}
    />
  )
  const renderReplies = () => (
    <Stack>
      {replies.length > 0 &&
        replies.map(reply => (
          <MessageComponent
            key={reply.id}
            initMessage={reply}
            isEditable={false}
            onSaveMessage={onSaveMessage}
          />
        ))}
    </Stack>
  )
  return (
    <Stack
      width={'90%'}
      sx={{
        py: 1,
        px: 1.5,
      }}>
      {renderHeader()}
      {renderContent()}
      {expandedReplies && renderReplies()}
    </Stack>
  )
}
