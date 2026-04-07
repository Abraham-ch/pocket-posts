import { useState } from 'react'

import { Link } from 'react-router'

import { Avatar } from '@/components/avatar'

import { PB } from '../hooks'
import { Feed } from './pages/home/feed'
import { SectionPosts } from './pages/home/section-posts'

export const Home = () => {
  const user = PB.authStore.record
  console.log('🚀 ~ Home ~ user:', user)
  const avatarUrl = user?.avatar && PB.files.getURL(user, user.avatar)

  const userInfo = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    avatar: avatarUrl,
  }
  console.log('userInfo:', userInfo)

  const [showUserInfo, setShowUserInfo] = useState(false)

  return (
    <main className='flex h-full min-h-screen'>
      <section className='ml-auto h-full w-full max-w-4xl border-x border-gray-500/50'>
        <div className='flex flex-col py-6'>
          <h1 className='p-6 text-3xl font-bold'>Para ti</h1>
          <SectionPosts user={user ? userInfo : undefined} />
          <Feed />
        </div>
      </section>
      <aside className='flex max-h-16 w-full max-w-[calc(50%-28rem)] flex-col gap-4 p-4 pr-6'>
        {user ? (
          <Avatar
            avatar={avatarUrl}
            name={user.name}
            onClick={() => setShowUserInfo(!showUserInfo)}
            showName
            className='self-end'
          />
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}

        {showUserInfo && user && (
          <div className='flex flex-col rounded-md p-4 pt-4'>
            <img
              src={avatarUrl}
              alt={user.name}
              className='mx-auto aspect-square w-46 rounded-full object-cover'
            />
            <span className='mx-auto mt-2 text-lg leading-6 font-bold'>
              {user.name}
            </span>
            <span className='text-muted-foreground mx-auto text-sm'>
              {user.email}
            </span>
            <span className='mx-auto mt-2 w-fit rounded-full bg-gray-300/50 p-1 px-2 text-xs'>
              ID: {user.id}
            </span>
          </div>
        )}
      </aside>
    </main>
  )
}
