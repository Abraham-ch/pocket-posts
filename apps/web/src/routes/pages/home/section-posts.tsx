import { useState } from 'react'

import { Avatar } from '@/components/avatar'
import { createPost } from '@/hooks/post'
import type { User } from '@/types/user'

type SectionPostsProps = {
  user: User | undefined
}

export const SectionPosts = ({ user }: SectionPostsProps) => {
  const [postDescription, setPostDescription] = useState('')

  const sendPost = async () => {
    if (user) {
      try {
        await createPost({
          description: postDescription,
          user_post: user.id!,
        })
        setPostDescription('')
      } catch (e) {
        console.log('Error creating post:', e)
        alert('Error creating post. Please try again.')
      }
    }
  }

  return (
    <div className='m-0 flex h-full flex-col items-center gap-x-4 border-y border-gray-500/50 px-8 py-4'>
      <div className='flex w-full gap-x-4'>
        <Avatar avatar={user ? user.avatar : ''} name={user ? user.name : ''} />
        <textarea
          name='content'
          className='field-sizing-content w-full grow py-2 text-lg placeholder:text-lg focus:outline-none'
          placeholder="What's happening?"
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
        />
      </div>
      <button
        onClick={sendPost}
        className='mt-4 self-end rounded-full bg-blue-600 px-4 py-1.5'
        disabled={!user}
      >
        Post
      </button>
    </div>
  )
}
