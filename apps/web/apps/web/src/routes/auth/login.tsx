import { type SyntheticEvent, useState } from 'react'

import { useNavigate } from 'react-router'

import { loginWithPassword } from '@/hooks/auth'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      setError('')
      await loginWithPassword(email, password)
      navigate('/')
    } catch {
      setError('Credenciales invalidas. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <h1 className='text-lg font-bold pb-4'>Login</h1>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border py-1 px-2 rounded-sm'
          required
        />

        <label htmlFor='password' className='pt-1'>
          Password
        </label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border py-1 px-2 rounded-sm'
          required
        />

        {error && <p className='text-red-600 text-sm pt-1'>{error}</p>}

        <button
          type='submit'
          className='border py-1 px-2 rounded-sm bg-blue-500 text-white mt-4 disabled:opacity-50'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Ingresando...' : 'Login'}
        </button>
      </form>
    </>
  )
}
