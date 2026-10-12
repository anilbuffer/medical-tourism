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
          "bg-[#F0A126] text-[#0C2338] hover:bg-[#db8e18] shadow-md shadow-[#F0A126]/20 font-heading font-bold active:scale-[0.98]",
        primary:
          "bg-[#F0A126] text-[#0C2338] hover:bg-[#db8e18] shadow-md shadow-[#F0A126]/20 font-heading font-bold active:scale-[0.98]",
        teal:
          "bg-[#0B5D68] text-white hover:bg-[#094b54] shadow-sm font-heading font-bold active:scale-[0.98]",
        navy:
          "bg-[#0C2338] text-white hover:bg-[#163654] shadow-sm font-heading font-bold active:scale-[0.98]",
        gold:
          "bg-[#F0A126] text-[#0C2338] hover:bg-[#db8e18] shadow-md shadow-[#F0A126]/20 font-heading font-bold active:scale-[0.98]",
        cyan:
          "bg-[#0B5D68] text-white hover:bg-[#094b54] shadow-sm font-heading font-bold active:scale-[0.98]",
        outline:
          "border border-[#DCE6EB] bg-white hover:bg-[#ECF4F7] hover:text-[#0C2338] text-[#0C2338] font-heading font-bold",
        outlineNavy:
          "border border-[#0C2338] text-[#0C2338] hover:bg-[#0C2338] hover:text-white transition-colors font-heading font-bold",
        outlineTeal:
          "border border-[#0B5D68] text-[#0B5D68] hover:bg-[#0B5D68] hover:text-white transition-colors font-heading font-bold",
        secondary:
          "bg-[#ECF4F7] text-[#0C2338] hover:bg-[#dbebf2] border border-[#DCE6EB] font-heading font-bold",
        ghost:
          "hover:bg-[#ECF4F7] hover:text-[#0C2338] text-[#6B7C88] font-medium",
        glass:
          "bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all font-heading font-bold",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 font-heading font-semibold",
        link:
          "text-[#0B5D68] underline-offset-4 hover:underline font-semibold p-0 h-auto",
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
