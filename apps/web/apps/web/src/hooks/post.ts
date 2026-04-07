import { PB } from '.'

export const getAllPosts = () => {
  return PB.collection('post').getFullList({
    expand: 'user_post',
    sort: '-created',
  })
}

export const subscribeToPosts = (callback: () => void) => {
  return PB.collection('post').subscribe('*', callback)
}

export const createPost = (data: PostData) => {
  return PB.collection('post').create(data)
}

export const deletePost = (postId: string) => {
  return PB.collection('post').delete(postId)
}

type PostData = {
  description: string
  score?: number
  user_post: string
}
