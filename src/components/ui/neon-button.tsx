import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground text-center rounded-full inline-flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-amber-500/5 hover:bg-amber-500/0 border-amber-500/20",
                solid: "bg-amber-500 hover:bg-amber-600 text-[#0d0d0c] border-transparent hover:border-foreground/50 transition-all duration-200",
                ghost: "border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10",
            },
            size: {
                default: "px-8 py-4 text-base",
                sm: "px-4 py-2 text-sm",
                lg: "px-10 py-4 text-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { 
      neon?: boolean;
      as?: "button" | "a";
      href?: string;
    }

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, as = "button", href, ...props }, ref) => {
        const Comp = as as any;
        return (
            <Comp
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                href={href}
                {...props}
            >
                <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-amber-400 via-amber-500 to-transparent hidden", neon && "block")} />
                {children}
                <span className={cn("absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-amber-400 via-amber-500 to-transparent hidden", neon && "block")} />
            </Comp>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };
