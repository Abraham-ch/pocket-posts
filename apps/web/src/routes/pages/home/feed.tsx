import { useEffect, useState } from 'react'

import type { RecordModel } from 'pocketbase'

import { FeedPost } from '@/components/feed-post'
import { PostComment } from '@/components/post-comment'
import { PB } from '@/hooks'
import { getAllPosts, subscribeToPosts } from '@/hooks/post'
import type { User } from '@/types/user'

type FeedProps = {
  user?: User
}

export const Feed = ({ user }: FeedProps) => {
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
        const postUser: User = post.expand?.user_post
        const avatarUrl = postUser?.avatar && PB.files.getURL(postUser, postUser.avatar)

        return (
          <div key={post.id}>
            <FeedPost
              post={post}
              user={{ ...postUser, avatar: avatarUrl }}
            />
            <PostComment
              postId={post.id}
              user={{ ...user, avatar: user? user.avatar : '' }}
            />
          </div>
        )
      })}
    </div>
  )
}