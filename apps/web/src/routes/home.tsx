import { useEffect, useState } from 'react'

import { Link } from 'react-router'

import type { RecordModel } from 'pocketbase'

import { createPost, getAllPosts } from '@/hooks/post'
import { cn } from '@/utils/cn'

import { PB } from '../hooks'

export const Home = () => {
  const user = PB.authStore.record
  const avatarUrl = user?.avatar && PB.files.getURL(user, user.avatar)

  const userInfo = {
    name: user?.name,
    email: user?.email,
    avatar: avatarUrl,
    id: user!.id,
  }

  const [showUserInfo, setShowUserInfo] = useState(false)

  console.log(user)
  return (
    <main className='flex min-h-screen h-full'>
      <section className='max-w-4xl border-x border-gray-500/50 w-full ml-auto h-full '>
        <MainHero user={userInfo} />
      </section>
      <aside className='w-full max-w-[calc(50%-28rem)] flex flex-col gap-4 p-4 max-h-16 pr-6'>
        {user ? (
          <button
            onClick={() => setShowUserInfo(!showUserInfo)}
            className='flex items-center gap-2 self-end'
          >
            <p className='text-sm'>{user.name}</p>
            <img
              src={avatarUrl}
              alt={user.name}
              className='size-8 rounded-full object-cover'
            />
          </button>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}

        {showUserInfo && (
          <div className='p-4 flex flex-col rounded-md pt-4'>
            <img
              src={avatarUrl}
              alt={user!.name}
              className='rounded-full aspect-square
            object-cover w-46 mx-auto'
            />
            <span className='mx-auto mt-2 text-lg leading-6 font-bold'>
              {user?.name}
            </span>
            <span className='text-sm text-muted-foreground mx-auto'>
              {user?.email}
            </span>
            <span className='rounded-full w-fit mx-auto mt-2 text-xs p-1 px-2 bg-gray-300/50'>
              ID: {user?.id}
            </span>
          </div>
        )}
      </aside>
    </main>
  )
}

export const MainHero = ({ user }: SectionPostsProps) => {
  return (
    <div className='flex flex-col py-6'>
      <h1 className='text-3xl font-bold p-6'>Para ti</h1>
      <SectionPosts name={user.name} avatar={user.avatar} id={user.id} />
      <Feed />
    </div>
  )
}

type SectionPostsProps = {
  user: User
}

export const SectionPosts = ({ name, avatar, id }: User) => {
  const [postDescription, setPostDescription] = useState('')
  const sendPost = async () => {
    await createPost({
      description: postDescription,
      user_post: id,
    })
  }

  return (
    <div className='flex flex-col m-0 h-full border-y border-gray-500/50 px-8 py-4 items-center gap-x-4'>
      <div className='flex w-full gap-x-4'>
        <Avatar src={avatar} name={name} />
        <textarea
          name='content'
          className='focus:outline-none placeholder:text-lg w-full py-2 text-lg grow field-sizing-content'
          placeholder="What's happening?"
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
        />
      </div>
      <button
        onClick={sendPost}
        className='px-4 py-1.5 mt-4 rounded-full bg-blue-600 self-end'
      >
        Post
      </button>
    </div>
  )
}

type User = {
  name: string
  email?: string
  avatar: string
  id: string
}

type AvatarProps = {
  src: string
  name: string
  showName?: boolean
}

export const Avatar = ({ src, name, showName }: AvatarProps) => {
  return (
    <figure className='flex min-w-12 items-center'>
      <img
        src={src}
        alt={name}
        className={cn(
          'size-12 rounded-full object-cover self-start',
          showName && 'size-10',
        )}
      />
      {showName && (
        <figcaption className='font-semibold pl-2.5'>{name}</figcaption>
      )}
    </figure>
  )
}

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
  }, [])

  return (
    <div className=''>
      {posts.map((post) => {
        const user = post.expand?.user_post
        const avatarUrl = PB.files.getURL(user, user.avatar)
        return (
          <div key={post.id}>
            <article className='flex border-b border-gray-500/50 p-8'>
              <Avatar src={avatarUrl} name={user.name} />
              <span className='flex flex-col pl-2.5'>
                <span>
                  <p className='font-semibold inline pr-2'>{user.name}</p>
                  <span className='text-sm text-gray-400'>
                    {new Date(post.created).toLocaleString('es-PE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </span>
                </span>
                <p className='h-full text-wrap break-all'>{post.description}</p>
              </span>
            </article>
          </div>
        )
      })}
    </div>
  )
}
