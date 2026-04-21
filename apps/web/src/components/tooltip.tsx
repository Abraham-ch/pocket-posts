type TooltipProps = {
  children: React.ReactNode
}

export const Tooltip = ({ children }: TooltipProps) => {
  return (
    <div className='absolute rounded-lg px-3 py-1.5 text-sm'>{children}</div> //TODO: add anchor positioning
  )
}
