import { Message } from 'types/Forum'
import { ReactNode, useEffect, useRef, useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  Avatar,
  ButtonGroup,
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
  onSaveMessage: (message: Message) => void
  handleCancel?: () => void
}

/**
 * Компонент для отрисовки Текстового редактора сообщения
 * @param initMessage
 * @param isEditable
 * @param handleCancel
 * @constructor
 */
export const MessageComponent = ({
  initMessage,
  isEditable,
  handleCancel,
}: MessageProps) => {
  const [message, setMessage] = useState<Message | null>(initMessage || null)
  const [text, setText] = useState(initMessage?.content || '')
  useEffect(() => {
    //setMessage({ createdAt: '', updatedAt: '', id: 'new', idAuthor: '', content: text })
  }, [text])
  const onTextChange = (value: string) => {
    setText(value)
    //onSaveMessage({ createdAt: '', updatedAt: '', id: 'new', idAuthor: '', content: value })
  }

  const rteRef = useRef<RichTextEditorRef>(null)

  return (
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
          hide: !isEditable,
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
            <ButtonGroup>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  onTextChange(rteRef.current?.editor?.getHTML() ?? '')
                }}>
                Отправить
              </Button>
              {handleCancel && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleCancel()}>
                  Отмена
                </Button>
              )}
            </ButtonGroup>
            <TopicReactionsButtons topicId={message?.idTopic} />
          </Stack>
        ),
      }}
    />
  )
}
