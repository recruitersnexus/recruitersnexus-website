import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNavUser({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboards"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        dashboard
      </Link>
      <Link
        href="/explore"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        explore experts
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}
