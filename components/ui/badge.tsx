import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        gold: "bg-amber-950/70 text-vedara-gold-light border-vedara-gold/40 shadow-xs font-semibold",
        teal: "bg-teal-950/80 text-vedara-cyan border-vedara-cyan/30 shadow-xs font-semibold",
        tealSubtle: "bg-teal-50 text-teal-800 border-teal-200/80 font-semibold",
        navy: "bg-vedara-blue/10 text-vedara-slate border-vedara-blue/20 font-semibold",
        secondary: "bg-secondary text-secondary-foreground border-border/50",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/20",
        outline: "border-border text-foreground",
        glass: "bg-white/10 text-white border-white/20 backdrop-blur-md",
        ghost: "hover:bg-muted hover:text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-5.5 px-2.5 py-0.5 text-xs",
        sm: "h-4.5 px-2 text-[10px]",
        lg: "h-7 px-3.5 py-1 text-xs sm:text-sm font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  })
}

export { Badge, badgeVariants }
