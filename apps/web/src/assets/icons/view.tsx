import type { IconProps } from '@/types/icon'

export const ViewIcon = ({ className }: IconProps) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
      <path d='M8 12a4 9 0 1 0 8 0a4 9 0 1 0 -8 0' />
      <path d='M3 12c0 2.21 4.03 4 9 4s9 -1.79 9 -4s-4.03 -4 -9 -4s-9 1.79 -9 4' />
    </svg>
  )
}
