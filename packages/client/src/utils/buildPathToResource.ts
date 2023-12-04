import { Y_API_BASE_URL } from 'services/y-api-service'

export function buildPathToResource(resource: string | null) {
  if (!resource) {
    return null
  }

  return `${Y_API_BASE_URL}/resources/${resource}`
}
