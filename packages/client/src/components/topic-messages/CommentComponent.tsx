import { Message } from 'types/Forum'
import { useEffect, useRef, useState } from 'react'
import { Stack } from '@mui/material'
import { type RichTextEditorRef } from 'mui-tiptap'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import backendService from 'services/backend-service'
import { ReplyComponent } from 'components/topic-messages/ReplyComponent'
import { HeaderMessageComponent } from 'components/topic-messages/HeaderMessageComponent'
import { MessageComponent } from 'components/topic-messages/MessageComponent'

export declare type CommentComponent = {
  initMessage?: Message | null
  isEditable?: boolean
  topicId?: string
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
 * @param topicId
 * @param onSaveMessage
 * @constructor
 */
export const CommentComponent = ({
  initMessage,
  topicId,
  onSaveMessage,
}: CommentComponent) => {
  const [message, setMessage] = useState<Message | null>(initMessage || null)
  const [text, setText] = useState(initMessage?.content || '')
  const [replies, setReplies] = useState<Message[]>([])
  const [expandedReplies, setExpandedReplies] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
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
  const renderReplies = () => (
    <Stack alignItems={'end'}>
      {replies.length > 0 &&
        replies.map(reply => (
          <ReplyComponent
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
      <HeaderMessageComponent
        userName={message?.userName}
        setExpandedReplies={setExpandedReplies}
        expandedReplies={expandedReplies}
        fullPermission={fullPermission}
        showExpanded={replies && replies.length > 0}
        editing={isEditable}
        setEditing={setIsEditable}
        showReply
      />
      <MessageComponent
        initMessage={message}
        isEditable={isEditable}
        onSaveMessage={onSaveMessage}
      />
      {expandedReplies && renderReplies()}
    </Stack>
  )
}
