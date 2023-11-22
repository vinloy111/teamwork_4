import { Message } from 'types/Forum'
import { useEffect, useRef, useState } from 'react'
import { Stack } from '@mui/material'
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

export declare type MessageProps = {
  initMessage?: Message | null
  isEditable?: boolean
  onSaveMessage: (message: Message) => void
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
 * @param onSaveMessage
 * @constructor
 */
export const MessageComponent = ({
  initMessage,
  isEditable,
  onSaveMessage,
}: MessageProps) => {
  const [message, setMessage] = useState<Message | null>(initMessage || null)
  const [text, setText] = useState(initMessage?.text || '')
  const [showMenuBar, setShowMenuBar] = useState(isEditable || false)
  useEffect(() => {
    setMessage({ date: '', id: 'new', idAuthor: '', text: text })
  }, [text])
  const onTextChange = (value: string) => {
    setText(value)
    onSaveMessage({ date: '', id: 'new', idAuthor: '', text: value })
  }
  const rteRef = useRef<RichTextEditorRef>(null)
  return (
    <>
      <Box
        width={'90%'}
        sx={{
          py: 1,
          px: 1.5,
        }}>
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
                  Save
                </Button>
              </Stack>
            ),
          }}
        />
      </Box>
    </>
  )
}
