import { PB } from '.'

export const getUserById = (userId: string) => {
  return PB.collection('users').getOne(userId)
}
