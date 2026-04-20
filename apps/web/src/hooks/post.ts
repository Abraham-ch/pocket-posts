import type { PostData, PostUpdateData } from '@/types/post'

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

export const updatePost = (postId: string, data: PostUpdateData) => {
  return PB.collection('post').update(postId, data)
}
