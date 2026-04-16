import type { Comment } from "@/types/comment"
import { PB } from "."

export const createComment = (data: Comment) => {
  return PB.collection('comment').create(data)
}

export const getCommentsByPostId = (postId: string) => {
  return PB.collection('comment').getFullList({
    filter: `post_comment = "${postId}"`,
    expand: 'user_comment',
    sort: '-created',
  })
}
