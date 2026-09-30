import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 sm:h-11 w-full min-w-0 rounded-xl border border-input bg-white/90 px-3.5 py-2 text-sm text-foreground shadow-xs transition-all outline-none placeholder:text-muted-foreground/70 focus-visible:border-vedara-cyan focus-visible:ring-3 focus-visible:ring-vedara-cyan/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-dark-3/60 dark:border-white/10 dark:focus-visible:border-vedara-cyan",
        className
      )}
      {...props}
    />
  )
}

export { Input }
