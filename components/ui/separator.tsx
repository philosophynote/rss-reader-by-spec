import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Separator = ({ className, ...props }: SeparatorProps) => (
  <div className={cn('shrink-0 bg-border h-px w-full', className)} {...props} />
)
