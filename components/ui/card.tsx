import * as React from 'react'
import { cn } from '@/lib/utils'

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  )
)
Card.displayName = 'Card'

export const CardHeader = (
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>
) => <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />

export const CardTitle = (
  { className, ...props }: React.HTMLAttributes<HTMLHeadingElement>
) => <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />

export const CardContent = (
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>
) => <div className={cn('p-6 pt-0', className)} {...props} />
