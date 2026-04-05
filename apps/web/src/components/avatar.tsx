import { UserCircleIcon } from '@/assets/icons'
import type { User } from '@/types/user'
import { cn } from '@/utils/cn'

type AvatarProps = Pick<User, 'name' | 'avatar'> & {
  showName?: boolean
  onClick?: () => void
  className?: string
}

export const Avatar = ({
  name,
  avatar,
  showName,
  onClick,
  className,
}: AvatarProps) => {
  return (
    <button
      className={cn('flex min-w-12 items-center', className)}
      onClick={onClick}
    >
      {name && avatar ? (
        <img
          src={avatar}
          alt={name}
          className={cn(
            'size-12 self-start rounded-full object-cover',
            showName && 'size-10',
          )}
        />
      ) : (
        <UserCircleIcon className='size-12' />
      )}
      {showName && <span className='pl-2.5 font-semibold'>{name}</span>}
    </button>
  )
}
