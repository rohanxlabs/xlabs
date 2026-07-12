import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs } from "@/lib/motion-presets"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-600/25 hover:shadow-green-500/40 hover:shadow-xl border border-green-500/20",
        destructive: "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/25 hover:shadow-red-500/40 hover:shadow-xl border border-red-500/20",
        outline: "border border-green-500/30 bg-transparent text-green-400 hover:bg-green-500/10 hover:text-green-300 hover:border-green-400/50 shadow-sm hover:shadow-md",
        secondary: "bg-gray-800 text-gray-100 hover:bg-gray-700 shadow-lg shadow-black/20 hover:shadow-xl border border-gray-700/50",
        ghost: "hover:bg-green-500/10 hover:text-green-300 text-gray-300",
        link: "text-green-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5 text-sm rounded-xl",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-13 rounded-2xl px-10 py-4 text-base",
        icon: "h-11 w-11 rounded-xl",
      },
      loading: {
        true: "cursor-wait",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={springs.button}
        className="inline-block"
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className, loading }))}
          ref={ref}
          disabled={loading || props.disabled}
          {...props}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {children}
        </Comp>
      </motion.div>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }