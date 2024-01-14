import { Message } from 'types/Forum'
import { MouseEvent, useRef, useState } from 'react'
import { Alert, ButtonGroup, Collapse, IconButton, Stack } from '@mui/material'
import {
  MenuButtonAddImage,
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from 'mui-tiptap'
import Button from '@mui/material/Button'
import { StarterKit } from '@tiptap/starter-kit'
import { TopicReactionsButtons } from 'components/topic-reactions-buttons'
import CloseIcon from '@mui/icons-material/Close'

export declare type MessageProps = {
  initMessage?: Message | null
  isEditable?: boolean
  onSaveMessage?: (content: string) => void
  onUpdateMessage?: (content: string) => void
  handleCancel?: () => void
}

/**
 * Компонент для отрисовки Текстового редактора сообщения
 * @param initMessage
 * @param isEditable
 * @param handleCancel
 * @param onSaveMessage
 * @param onUpdateMessage
 * @constructor
 */
export const MessageComponent = ({
  initMessage,
  isEditable,
  handleCancel,
  onSaveMessage,
  onUpdateMessage,
}: MessageProps) => {
  const [message, setMessage] = useState<Message | null>(initMessage || null)
  const [text, setText] = useState(initMessage?.content || '')

  const [error, setError] = useState<string | null>(null)

  const rteRef = useRef<RichTextEditorRef>(null)
  const editor = rteRef.current?.editor

  const onSendMessage = (value: string) => {
    if (onSaveMessage) onSaveMessage(value)
    if (onUpdateMessage) onUpdateMessage(value)

    editor?.chain().setContent('')
  }
  return (
    <Stack width={'100%'}>
      <Collapse in={error !== null}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(null)
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <RichTextEditor
        ref={rteRef}
        extensions={[StarterKit]}
        content={text}
        editable={isEditable}
        renderControls={() => (
          <MenuControlsContainer>
            <MenuButtonUndo />
            <MenuButtonRedo />
            <MenuDivider />
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonCode />
            <MenuButtonCodeBlock />
            <MenuButtonBlockquote />
            <MenuButtonOrderedList />
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
                    if (!rteRef.current?.editor?.getText())
                      setError('Введите сообщение')
                    else onSendMessage(rteRef.current?.editor?.getHTML() ?? '')
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
    </Stack>
  )
}
