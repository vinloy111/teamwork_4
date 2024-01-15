import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backendService from 'services/backend-service'
import { ChangeTopicComponent } from 'components/change-topic/ChangeTopicComponent'
import { useParams } from 'react-router'
import { Topic } from 'types/Forum'
import { LoaderComponent } from 'components/loader/LoaderComponent'

export const ForumChangeTopicPage = () => {
  const navigate = useNavigate()
  const [topic, setTopic] = useState<Topic | null>(null)
  const { idTopic } = useParams()
  useEffect(() => {
    if (idTopic) {
      backendService.getTopic(idTopic).then(res => {
        setTopic(res.data)
      })
    }
  }, [])
  const handleSubmit = async (caption: string) => {
    if (!topic) return
    try {
      backendService
        .updateTopic(caption, topic?.id)
        .then(() => navigate(`/forum/`))
    } catch (error) {
      console.log('addTopicPageError: ', error)
    }
  }
  if (!topic) return <LoaderComponent />
  return (
    <ChangeTopicComponent
      topicInit={topic}
      type={'save'}
      handleSubmit={handleSubmit}
    />
  )
}
