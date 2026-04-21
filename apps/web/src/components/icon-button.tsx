import { useState } from 'react'

import { cn } from '@/utils/cn'

import { Tooltip } from './tooltip'

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  dense?: boolean
  tooltip?: boolean
  tooltipContent?: React.ReactNode
}

export const IconButton = ({
  children,
  className,
  dense,
  tooltip = false,
  tooltipContent,
  ...props
}: IconButtonProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  return (
    <>
      <button
        className={cn(
          'rounded-full p-2 hover:bg-taupe-800',
          className,
          dense && 'py-0',
        )}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        {...props}
      >
        {children}
      </button>
      {tooltip && isTooltipVisible && <Tooltip>{tooltipContent}</Tooltip>}
    </>
  )
}
