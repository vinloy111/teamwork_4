import axios from 'axios'
import { ReactionSave, Reaction, Forum, Topic, Message } from 'types/Forum'
import { User } from 'types/User'
import { getUserName } from 'utils/adaptUserData'
import { Theme } from 'types/Theme'
import { UserTheme } from 'types/UserTheme'

export const SERVER_BASE_URL = 'http://localhost:3000'

const backendService = {
  getReactions(id: string) {
    return axios.get<Reaction[]>(`${SERVER_BASE_URL}/api/reaction/topic/${id}`)
  },
  addReaction(data: ReactionSave) {
    return axios.post<Reaction[]>(`${SERVER_BASE_URL}/api/reaction/add`, data)
  },
  updateReaction(id: string, data: ReactionSave) {
    return axios.put<Reaction[]>(
      `${SERVER_BASE_URL}/api/reaction/${id}/update`,
      data
    )
  },
  deleteReaction(id: string, topicId: string) {
    return axios.delete<Reaction[]>(
      `${SERVER_BASE_URL}/api/reaction/${id}/delete/topic/${topicId}`
    )
  },
  getForum() {
    return axios.get<Forum>(`${SERVER_BASE_URL}/api/forum`)
  },
  getTopic(id: string) {
    return axios.get<Topic>(`${SERVER_BASE_URL}/api/forum/topic/${id}`)
  },
  deleteTopic(id: string) {
    return axios.delete<{ deleted: true }>(
      `${SERVER_BASE_URL}/api/forum/topic/${id}`
    )
  },
  createTopic(caption: string, user: User) {
    const newTopic = {
      userName: getUserName(user),
      idAuthor: user.id,
      caption,
    }
    return axios.post<Topic>(`${SERVER_BASE_URL}/api/forum/topic/`, newTopic)
  },
  updateTopic(caption: string, id: string) {
    const newTopic = {
      caption,
    }
    return axios.put<Topic>(
      `${SERVER_BASE_URL}/api/forum/topic/${id}`,
      newTopic
    )
  },
  getReplies(commentId: string) {
    return axios.get<Message[]>(
      `${SERVER_BASE_URL}/api/forum/comment/${commentId}/replies`
    )
  },
  sendComment(content: string, topicId: string, user: User) {
    const newComment = {
      idTopic: topicId,
      userName: getUserName(user),
      idAuthor: user.id,
      content,
    }
    return axios.post<Message>(
      `${SERVER_BASE_URL}/api/forum/comment/`,
      newComment
    )
  },
  deleteComment(commentId: string) {
    return axios.delete<{ deletedId: string }>(
      `${SERVER_BASE_URL}/api/forum/comment/${commentId}`
    )
  },
  updateMessage(content: string, idMessage: string) {
    return axios.put<Message>(
      `${SERVER_BASE_URL}/api/forum/message/${idMessage}`,
      { content }
    )
  },
  sendReply(content: string, idComment: string, user: User) {
    const newComment = {
      idComment,
      userName: getUserName(user),
      idAuthor: user.id,
      content,
    }
    return axios.post<Message>(
      `${SERVER_BASE_URL}/api/forum/reply/`,
      newComment
    )
  },
  deleteReply(idReply: string) {
    return axios.delete<{ deletedId: string }>(
      `${SERVER_BASE_URL}/api/forum/reply/${idReply}`
    )
  },

  /**
   * Получение темы юзера
   */
  getUserTheme(userId: string) {
    return axios.get<UserTheme>(`${SERVER_BASE_URL}/api/theme/user/${userId}`)
  },

  /**
   * Обновление или задание темы юзеру
   */
  updateUserTheme(userId: string, themeId: number) {
    return axios.put<UserTheme>(`${SERVER_BASE_URL}/api/theme/user`, {
      userId,
      themeId,
    })
  },

  /**
   * Получение всех возможных тем
   */
  getAllThemes() {
    return axios.get<Theme[]>(`${SERVER_BASE_URL}/api/theme`)
  },
}

export default backendService
