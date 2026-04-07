import type { RecordModel } from 'pocketbase'

import {
  DotsIcon,
  MessageIcon,
  QuoteIcon,
  TrashIcon,
  ViewIcon,
} from '@/assets/icons'
import { deletePost } from '@/hooks/post'
import type { User } from '@/types/user'

import { Avatar } from './avatar'
import { IconButton } from './icon-button'
import { Popover } from './popover'
import { useStore } from '@/hooks/store'

type FeedPostProps = {
  post: RecordModel
  user: User
}

export const FeedPost = ({ post, user }: FeedPostProps) => {
  const { toggleComment } = useStore()
  return (
    <article className='flex flex-col border-t border-gray-500/50 p-8 pb-2'>
      <section className='flex'>
        <Avatar avatar={user.avatar} name={user.name} />
        <span className='flex w-full flex-col pl-2.5'>
          <span className='flex'>
            <span className='flex items-center'>
              <p className='inline pr-2 font-semibold'>{user.name}</p>
              <span className='text-sm text-gray-400'>
                {new Date(post.created).toLocaleString('es-PE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </span>
            </span>
            <IconButton
              popoverTarget={`menu-${post.id}`}
              dense
              className='ml-auto'
              style={{
                anchorName: `--menu-button-${post.id}`,
                positionTryFallbacks: '--below-right',
              }}
            >
              <DotsIcon className='size-4 text-gray-300' />
            </IconButton>
            <Popover id={`menu-${post.id}`} className='space-y-0.5'>
              <button
                onClick={() => deletePost(post.id)}
                className='group flex w-full items-center gap-x-2 p-2 px-3 hover:bg-slate-100'
              >
                <TrashIcon className='size-5 text-gray-300 group-hover:text-taupe-900' />
                <p className='text-sm font-semibold text-white group-hover:text-taupe-900'>
                  Remove Post
                </p>
              </button>
            </Popover>
          </span>
          <p className='h-full text-wrap break-all'>{post.description}</p>
        </span>
      </section>
      <div className='flex gap-x-4 pt-4 pl-14.5'>
        <IconButton onClick={() => toggleComment(post.id)}>
          <MessageIcon className='text-gray-300' />
        </IconButton>
        <IconButton>
          <QuoteIcon className='text-gray-300' />
        </IconButton>
        <IconButton>
          <ViewIcon className='text-gray-300' />
        </IconButton>
      </div>
    </article>
  )
}
