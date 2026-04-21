export type PostData = {
  description: string
  score?: number
  user_post: string
  field?: string[]
  File?: string[]
}

export type PostCreateData = {
  description: string
  score?: number
  user_post: string
  File?: File[]
}

export type PostCreateInput = PostCreateData | FormData

export type PostUpdateData = Partial<PostData> & Record<string, unknown>
