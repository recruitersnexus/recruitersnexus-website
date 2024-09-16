'use client'
import Link from "next/link";
import { cn } from "@/lib/utils";
import useUserData from "@/lib/db/userData";
import SkeletonLoader from "@/components/SkeletonLoader";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { userData } = useUserData();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {userData?.role === 'hr' ? (
        <>
          <Link
            href="/dashboards"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/subServices"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-white"
          >
            Submit Services
          </Link>
          <Link
            href="/shareProfile"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-white"
          >
            Share Profile
          </Link>
        </>
      ): userData?.role === 'user' || userData?.role === 'admin'? ( <>
      <Link
        href="/dashboards"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-white"
      >
        Dashboard
      </Link>
      <Link
        href="/explore"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-white"
      >
        Explore Experts
      </Link>
      </>) : (
        <SkeletonLoader className="flex gap-2 my-2 w-80">
        <div className="w-full flex flex-col gap-2">
          <div className="h-5 bg-gray-200"></div>
        </div>
        </SkeletonLoader>
      )
      }
    </nav>
  );
}
