import type { ReactNode } from "react"

interface PageHeaderProps {
  heading: string
  text?: string
  children?: ReactNode
}

export function PageHeader({ heading, text, children }: PageHeaderProps) {
  return (
    <div className="border-b bg-background">
      <div className="px-4 py-4 md:px-6 md:py-6">
        <h1 className="text-xl font-semibold md:text-2xl">{heading}</h1>
        {text && <p className="mt-1 text-sm text-muted-foreground md:text-base">{text}</p>}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  )
}
