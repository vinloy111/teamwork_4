import axios from 'axios'
import { ReactionSave, Reaction, Forum, Topic, Message } from 'types/Forum'

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
  getReplies(commentId: string) {
    return axios.get<Message[]>(
      `${SERVER_BASE_URL}/api/forum/comment/${commentId}/replies`
    )
  },
}

export default backendService
