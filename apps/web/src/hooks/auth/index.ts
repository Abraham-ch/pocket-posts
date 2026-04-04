import { PB } from '..'

export const listAuthMethods = () => {
  return PB.collection('users').listAuthMethods()
}

export const loginWithPassword = (email: string, password: string) => {
  return PB.collection('users').authWithPassword(email, password)
}
