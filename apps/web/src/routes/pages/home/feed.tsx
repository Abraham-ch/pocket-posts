import { useEffect, useState } from 'react'

import type { RecordModel } from 'pocketbase'

import { FeedPost } from '@/components/feed-post'
import { PostComment } from '@/components/post-comment'
import { PB } from '@/hooks'
import { getAllPosts, subscribeToPosts } from '@/hooks/post'
import type { User } from '@/types/user'

export const Feed = () => {
  const [posts, setPosts] = useState<RecordModel[]>([])
  const [showComment, setShowComment] = useState('')

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
        const user: User = post.expand?.user_post
        const avatarUrl = user?.avatar && PB.files.getURL(user, user.avatar)

        return (
          <div key={post.id}>
            <FeedPost
              setShowComment={setShowComment}
              post={post}
              user={{ ...user, avatar: avatarUrl }}
            />
            <PostComment
              postId={post.id}
              showComment={showComment}
              user={{ ...user, avatar: avatarUrl }}
            />
          </div>
        )
      })}
    </div>
  )
}
