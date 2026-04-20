import type { User } from './user'

export type Comment = {
  id?: string
  like?: number
  dislike?: number
  description: string
  post_comment: string
  user_comment: string
  expand?: {
    user_comment: User
  }
}
