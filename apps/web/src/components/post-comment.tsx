import type { User } from '@/types/user'
import { cn } from '@/utils/cn'

import { Avatar } from './avatar'
import { useStore } from '@/hooks/store'

type FeedPostProps = {
  postId: string
  user: User
}

export const PostComment = ({ postId, user }: FeedPostProps) => {
  const { openComments }= useStore()
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
      />
      <Avatar
        avatar={user.avatar}
        name={user.name}
        size={8}
        className='self-center'
      />
    </div>
  )
}
