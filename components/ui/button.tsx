import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none cursor-pointer focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        gold:
          "bg-vedara-gold text-vedara-deep hover:bg-vedara-gold-hover shadow-md font-bold active:scale-[0.98]",
        cyan:
          "bg-vedara-cyan text-slate-950 hover:bg-vedara-cyan-light shadow-md shadow-teal-500/20 font-bold active:scale-[0.98]",
        outline:
          "border border-border bg-background hover:bg-muted hover:text-foreground text-foreground",
        outlineNavy:
          "border border-vedara-deep text-vedara-deep hover:bg-vedara-deep hover:text-white transition-colors font-bold",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium",
        ghost:
          "hover:bg-muted hover:text-foreground text-foreground/80",
        glass:
          "bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link:
          "text-primary underline-offset-4 hover:underline font-semibold p-0 h-auto",
      },
      size: {
        default: "h-10 gap-2 px-4 py-2 rounded-xl text-sm",
        xs: "h-6 gap-1 rounded-lg px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-lg px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2.5 px-6 rounded-xl text-sm sm:text-base font-bold",
        xl: "h-12 sm:h-14 gap-3 px-8 rounded-xl text-base font-bold shadow-lg",
        icon: "size-10 rounded-xl",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  nativeButton,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      nativeButton={nativeButton ?? (props.render ? false : undefined)}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
