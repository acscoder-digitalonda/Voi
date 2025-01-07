import { cn } from "@/lib/utils"

interface SheepCardProps {
  variant: 'blue' | 'green' | 'red'
  className?: string
}

export function SheepCard({ variant, className }: SheepCardProps) {
  return (
    <div className={cn(
      'sheep-card',
      {
        'sheep-card-blue': variant === 'blue',
        'sheep-card-green': variant === 'green',
        'sheep-card-red': variant === 'red',
      },
      className
    )}>
      {/* Placeholder for sheep character - in production this would be an SVG or image */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-24 bg-white/90 rounded-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#8B8BAE] rounded-full">
          {/* Simple face */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
