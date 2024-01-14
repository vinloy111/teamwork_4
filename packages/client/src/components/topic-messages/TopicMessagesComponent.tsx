import { Stack } from '@mui/material'
import { Message, Topic } from 'types/Forum'
import { useEffect, useState } from 'react'
import { MessageComponent } from './MessageComponent'
import { TopicReactionsShow } from 'components/topic-reactions-show'
import backendService from 'services/backend-service'
import { useDispatch, useSelector } from 'react-redux'
import { setReactions } from 'features/reactionsSlice'
import { CommentComponent } from 'components/topic-messages/CommentComponent'
import { getUserName } from 'utils/adaptUserData'
import { Store } from '../../store'

declare type TopicMessagesProps = {
  topic: Topic
}
export const TopicMessagesComponent = ({ topic }: TopicMessagesProps) => {
  const dispatch = useDispatch()
  const [messages, setMessages] = useState(topic.listOfMessages || [])
  const user = useSelector((state: Store) => state.auth.user)

  useEffect(() => {
    const getReactions = async () => {
      try {
        const res = await backendService.getReactions(topic.id)
        dispatch(setReactions(res.data))
      } catch (error) {
        console.error('Ошибка загрузки реакций')
      }
    }
    getReactions()
  }, [])

  const onSaveMessage = (content: string) => {
    if (!user) return
    backendService
      .sendComment(content, topic.id, user)
      .then(comment => setMessages(prevState => [...prevState, comment.data]))
  }
  const onDeleteComment = (id: string) => {
    backendService
      .deleteComment(id)
      .then(res =>
        setMessages(prevState => [
          ...prevState.filter(comment => comment.id != res.data.deletedId),
        ])
      )
  }
  return (
    <Stack
      display="flex"
      width="auto"
      minWidth={1000} // TODO: В перспективе задать фиксированную относительную ширину для всех экранов, хак для показа
      height="auto"
      alignItems="center"
      justifyContent="center">
      {messages.length > 0 &&
        messages.map(message => (
          <CommentComponent
            key={message.id}
            initMessage={message}
            isEditable={false}
            topicId={topic.id}
            onSaveMessage={onSaveMessage}
            onDeleteComment={onDeleteComment}
          />
        ))}
      <TopicReactionsShow />
      <MessageComponent
        initMessage={null}
        isEditable
        onSaveMessage={onSaveMessage}
      />
    </Stack>
  )
}
