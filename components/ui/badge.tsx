import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-[#0C2338] text-white border-transparent font-semibold shadow-xs",
        gold: "bg-[#FEF7EC] text-[#9A6208] border-[#F0A126]/40 shadow-xs font-semibold",
        goldDark: "bg-[#F0A126]/15 text-[#F0A126] border-[#F0A126]/30 shadow-xs font-semibold",
        teal: "bg-[#ECF4F7] text-[#0B5D68] border-[#DCE6EB] shadow-xs font-semibold",
        tealDark: "bg-[#0B5D68]/20 text-[#2ECDC5] border-[#0B5D68]/40 shadow-xs font-semibold",
        green: "bg-[#F0FAF9] text-[#0B8F83] border-[#0B8F83]/30 shadow-xs font-semibold",
        tealSubtle: "bg-[#ECF4F7] text-[#0B5D68] border-[#DCE6EB] font-semibold",
        navy: "bg-[#0C2338]/10 text-[#0C2338] border-[#0C2338]/20 font-semibold",
        secondary: "bg-[#ECF4F7] text-[#0C2338] border-[#DCE6EB] font-semibold",
        destructive: "bg-destructive/10 text-destructive border-destructive/20 font-semibold",
        outline: "border-[#DCE6EB] text-[#0C2338] bg-white font-medium",
        glass: "bg-white/10 text-white border-white/20 backdrop-blur-md font-semibold",
        ghost: "hover:bg-[#ECF4F7] hover:text-[#0C2338] text-[#6B7C88]",
        link: "text-[#0B5D68] underline-offset-4 hover:underline",
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
