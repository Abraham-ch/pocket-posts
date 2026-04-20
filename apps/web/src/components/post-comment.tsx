import { useEffect, useState } from 'react'

import type { RecordModel } from 'pocketbase'

import { PB } from '@/hooks'
import { createComment, getCommentsByPostId } from '@/hooks/comment'
import { updatePost } from '@/hooks/post'
import { useStore } from '@/hooks/store'
import type { User } from '@/types/user'
import { cn } from '@/utils/cn'

import { Avatar } from './avatar'

type FeedPostProps = {
  postId: string
  user: User | undefined
}

export const PostComment = ({ postId, user }: FeedPostProps) => {
  const [comment, setComment] = useState('')
  const [commentData, setCommentData] = useState<RecordModel[]>([])
  const { openComments } = useStore()
  const isOpen = openComments.has(postId)

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await getCommentsByPostId(postId)
        setCommentData(data)
      } catch (e) {
        console.log('Error fetching comments:', e)
      }
    }

    if (isOpen) {
      loadComments()
    }
  }, [isOpen, postId])

  const sendComment = async () => {
    if (user) {
      try {
        const newComment = await createComment({
          description: comment,
          post_comment: postId,
          user_comment: user.id!,
        })
        await updatePost(postId, {
          'field+': newComment.id,
        })
      } catch (e) {
        console.log('Error creating comment:', e)
      }
    }
  }
  return (
    <div
      className={cn(
        'border-b border-gray-500/50 px-8 pb-8',
        !isOpen && 'hidden',
      )}
    >
      <div className='flex justify-end gap-x-2'>
        <textarea
          className='wrap field-sizing-content max-w-2xl grow resize-none border-b border-gray-500/50 p-2 px-4 text-end outline-none'
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
          size={40}
          className='self-center'
        />
      </div>
      <section className='flex flex-col items-end pt-4'>
        {commentData.map((comment) => {
          const commentUser = comment.expand?.user_comment
          const userAvatar =
            commentUser && PB.files.getURL(commentUser, commentUser?.avatar)
          return (
            <>
              <div className='h-4 w-5 border-l-2 border-gray-500/50' />
              <div key={comment.id} className='flex gap-x-4'>
                <span className='rounded-lg border border-gray-500/50 px-4 py-2'>
                  {comment.description}
                </span>
                <Avatar
                  avatar={userAvatar}
                  name={comment.expand?.user_comment?.name}
                  size={40}
                />
              </div>
            </>
          )
        })}
      </section>
    </div>
  )
}
