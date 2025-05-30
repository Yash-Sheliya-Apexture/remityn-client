import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-background/50 rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
