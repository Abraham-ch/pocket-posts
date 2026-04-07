import { cn } from '@/utils/cn'

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  dense?: boolean
}

export const IconButton = ({
  children,
  className,
  dense,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-full p-2 hover:bg-taupe-800',
        className,
        dense && 'py-0',
      )}
      {...props}
    >
      {children}
    </button>
  )
}
