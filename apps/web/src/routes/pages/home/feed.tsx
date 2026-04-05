import { useEffect, useState } from 'react'

import type { RecordModel } from 'pocketbase'

import {
  DotsIcon,
  MessageIcon,
  QuoteIcon,
  TrashIcon,
  ViewIcon,
} from '@/assets/icons'
import { Avatar } from '@/components/avatar'
import { IconButton } from '@/components/icon-button'
import { Popover } from '@/components/popover'
import { PB } from '@/hooks'
import { deletePost, getAllPosts, subscribeToPosts } from '@/hooks/post'

export const Feed = () => {
  const [posts, setPosts] = useState<RecordModel[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts()
        setPosts(posts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
    const unsubscribe = subscribeToPosts(fetchPosts)

    return () => {
      unsubscribe.then((unsub) => unsub())
    }
  }, [])

  return (
    <div>
      {posts.map((post) => {
        const user = post.expand?.user_post
        const avatarUrl = user?.avatar && PB.files.getURL(user, user.avatar)
        return (
          <div key={post.id}>
            <article className='flex flex-col border-b border-gray-500/50 p-8'>
              <section className='flex'>
                <Avatar avatar={avatarUrl} name={user.name} />
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
                  <p className='h-full text-wrap break-all'>
                    {post.description}
                  </p>
                </span>
              </section>
              <div className='flex gap-x-4 pt-4 pl-14.5'>
                <IconButton>
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
          </div>
        )
      })}
    </div>
  )
}
