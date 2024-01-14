import { Message } from 'types/Forum'
import { useEffect, useState } from 'react'
import { Divider, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import backendService from 'services/backend-service'
import { ReplyComponent } from 'components/topic-messages/ReplyComponent'
import { HeaderMessageComponent } from 'components/topic-messages/HeaderMessageComponent'
import { MessageComponent } from 'components/topic-messages/MessageComponent'
import Box from '@mui/system/Box'
import Paper from '@mui/material/Paper'

export declare type CommentComponent = {
  initMessage?: Message | null
  isEditable?: boolean
  topicId: string
  onSaveMessage: (res: string) => void
  onDeleteComment: (idComment: string) => void
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
 * @constructor
 */
export const CommentComponent = ({
  initMessage,
  onDeleteComment,
}: CommentComponent) => {
  const [message, setMessage] = useState<Message | null>(initMessage || null)
  const [replies, setReplies] = useState<Message[]>([])
  const [expandedReplies, setExpandedReplies] = useState(false)
  const user = useSelector((state: Store) => state.auth.user)
  const [isEditable, setIsEditable] = useState(false)
  const getReplies = () => {
    if (!message) return
    backendService.getReplies(message.id).then(res => setReplies(res.data))
  }
  useEffect(() => {
    getReplies()
  }, [])

  const handleReply = () => {
    setExpandedReplies(true)
  }
  const onUpdateMessage = (content: string) => {
    if (!message) return
    backendService.updateMessage(content, message.idMessage).then(res => {
      setMessage({ ...message, content })
      setIsEditable(false)
    })
  }
  const onDeleteReply = (id: string) => {
    backendService
      .deleteReply(id)
      .then(res =>
        setReplies(prevState => [
          ...prevState.filter(comment => comment.id != res.data.deletedId),
        ])
      )
  }

  const onAddReply = (content: string) => {
    if (!user || !message) return
    backendService
      .sendReply(content, message.id, user)
      .then(reply => setReplies(prevState => [...prevState, reply.data]))
  }

  const fullPermission = user?.id === message?.idAuthor
  const renderReplies = () => (
    <Stack alignItems={'end'} my={2}>
      {replies.length > 0 &&
        replies.map(reply => (
          <ReplyComponent
            key={reply.id}
            initMessage={reply}
            onAddReply={onAddReply}
            onDeleteReply={onDeleteReply}
          />
        ))}
      <Box width={'100%'}>
        <MessageComponent
          initMessage={null}
          isEditable={true}
          onSaveMessage={onAddReply}
          handleCancel={() => setExpandedReplies(false)}
        />
        <Divider sx={{ my: 3 }} />
      </Box>
    </Stack>
  )
  if (!message) return null
  return (
    <Stack width={'90%'} m={1}>
      <Paper sx={{ padding: 2 }} elevation={10}>
        <HeaderMessageComponent
          userName={message?.userName}
          setExpandedReplies={setExpandedReplies}
          expandedReplies={expandedReplies}
          fullPermission={fullPermission}
          showExpanded={replies && replies.length > 0}
          editing={isEditable}
          setEditing={setIsEditable}
          showReply
          clickOnReply={handleReply}
          onDelete={() => onDeleteComment(message.id)}
        />
        <MessageComponent
          initMessage={message}
          isEditable={isEditable}
          onUpdateMessage={onUpdateMessage}
        />
        {expandedReplies && renderReplies()}
      </Paper>
    </Stack>
  )
}
