import { PB } from '.'

export const getAllPosts = () => {
  return PB.collection('post').getFullList({
    expand: 'user_post',
  })
}

export const createPost = (data: PostData) => {
  return PB.collection('post').create(data)
}

type PostData = {
  description: string
  score?: number
  user_post: string
}
