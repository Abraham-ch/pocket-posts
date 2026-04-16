import type { User } from '@/types/user'
import { cn } from '@/utils/cn'

import { Avatar } from './avatar'
import { useStore } from '@/hooks/store'
import { useState } from 'react'
import { createComment } from '@/hooks/comment'

type FeedPostProps = {
  postId: string
  user: User | undefined
}

export const PostComment = ({ postId, user }: FeedPostProps) => {
  const [ comment, setComment ] = useState('')
  const { openComments }= useStore()

  const sendComment = async () => {
    if (user) {
      try {
        await createComment({
          description: comment,
          post_comment: postId,
          user_comment: user.id!,
        })
      } catch (e) {
        console.log('Error creating comment:', e)
      }
    }
  }
  return (
    <div
      className={cn(
        'flex gap-x-2 border-b border-gray-500/50 px-8 pb-8',
        !openComments.has(postId) && 'hidden',
      )}
    >
      <textarea
        className='wrap ml-36 field-sizing-content w-full grow resize-none border-b border-gray-500/50 p-2 px-4 text-end outline-none'
        placeholder='Place a comment.'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendComment()
            setComment('')
          }
        }}
      />
      <Avatar
        avatar={user ? user.avatar : ''}
        name={user ? user.name : ''}
        size={8}
        className='self-center'
      />
    </div>
  )
}
