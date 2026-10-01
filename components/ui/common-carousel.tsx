import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface CommonCarouselProps {
  children: React.ReactNode[]
  itemClassName?: string
  className?: string
  opts?: React.ComponentProps<typeof Carousel>["opts"]
}

export function CommonCarousel({
  children,
  itemClassName,
  className,
  opts = { align: "start", loop: false },
}: CommonCarouselProps) {
  return (
    <Carousel opts={opts} className={cn("w-full relative", className)}>
      <CarouselContent>
        {children.map((child, index) => (
          <CarouselItem
            key={index}
            className={cn("md:basis-1/2 lg:basis-1/3 xl:basis-1/4", itemClassName)}
          >
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious className="absolute left-2 lg:-left-6 z-10 bg-white/80 hover:bg-white border-0 shadow-md" />
        <CarouselNext className="absolute right-2 lg:-right-6 z-10 bg-white/80 hover:bg-white border-0 shadow-md" />
      </div>
    </Carousel>
  )
}
