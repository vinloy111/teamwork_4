import axios from 'axios'
import { ReactionSave, Reaction } from 'types/Forum'

export const SERVER_BASE_URL = 'http://localhost:3001'

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
}

export default backendService
