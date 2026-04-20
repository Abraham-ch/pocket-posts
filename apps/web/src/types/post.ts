export type PostUpdateData = Partial<PostData> & Record<string, unknown>

export type PostData = {
  description: string
  score?: number
  user_post: string
  field?: string[]
}
