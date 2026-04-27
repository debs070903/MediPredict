import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors [&:has(button)]:pr-1 [&:has(button)]:pe-1 [&_button:hover]:bg-black/10 [&_button]:rounded-sm [&_button]:transition-colors [&_button]:size-3.5 [&_button]:grid [&_button]:place-items-center [&_button:focus-visible]:outline-none [&_button:focus-visible]:ring-1 [&_button:focus-visible]:ring-ring [&_button:focus-visible]:ring-offset-1 [&_button:focus-visible]:ring-offset-[inherit] [&_button:focus-visible]:[box-shadow:inherit] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };