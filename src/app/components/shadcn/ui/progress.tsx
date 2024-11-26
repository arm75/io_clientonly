import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import cn from "../utils/cn"

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn("relative h-2 w-full overflow-hidden border-2 border-white rounded-full bg-emerald-300 dark:bg-slate-800", className)}
		{...props}
	>
		<ProgressPrimitive.Indicator
			className="h-full w-full flex-1 bg-emerald-600 transition-all dark:bg-slate-50"
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		>
			TEST
		</ProgressPrimitive.Indicator>
	</ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
