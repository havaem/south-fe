import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    loading?: boolean;
    asChild?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            loading = false,
            children,
            disabled,
            leftIcon,
            rightIcon,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : "button";
        const Children = asChild ? "div" : React.Fragment;
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                disabled={loading || disabled}
                ref={ref}
                {...props}
            >
                {loading ? (
                    <Children>
                        <span>
                            <LoaderCircle className="animate-spin" size={16} />
                        </span>
                        {children}
                    </Children>
                ) : (
                    <Children>
                        {leftIcon && <span>{leftIcon}</span>}
                        {children}
                        {rightIcon && <span>{rightIcon}</span>}
                    </Children>
                )}
            </Comp>
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
