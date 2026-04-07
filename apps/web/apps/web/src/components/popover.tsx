import { cn } from '@/utils/cn'

type PopoverProps = {
  id: string
  children: React.ReactNode
  className?: string
}

export const Popover = ({ id, children, className }: PopoverProps) => {
  return (
    <div
      id={id}
      popover='auto'
      className={cn(
        'mt-1 w-40 rounded-md border border-gray-500/50 bg-taupe-950 shadow-xs shadow-gray-500/50',
        className,
      )}
      style={{
        positionAnchor: 'menu-button',
        positionArea: 'bottom right',
        inset: 'unset',
        top: 'anchor(bottom)',
        left: 'anchor(left)',
      }}
    >
      {children}
    </div>
  )
}
