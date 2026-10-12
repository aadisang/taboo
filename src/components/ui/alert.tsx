import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

// Coss Alert composition, with a compact page-wide announcement variant.
const alertVariants = cva("relative grid w-full text-foreground", {
  variants: {
    variant: {
      default:
        "grid-cols-[1fr_auto] gap-x-2 gap-y-0.5 rounded-xl border border-border px-3.5 py-3 text-sm",
      banner: "grid-cols-[1fr_auto_1fr] items-center border-border border-b bg-muted text-xs",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Alert({
  className,
  variant,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("font-medium", className)} {...props} />;
}

export function AlertAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="alert-action" className={cn("flex items-center gap-1", className)} {...props} />
  );
}
