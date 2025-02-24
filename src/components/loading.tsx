import { cn } from "@/lib/utils";
import { Icon } from "./icon";

export function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-full w-full bg-background flex items-center justify-center rounded-md",
        className
      )}
    >
      <Icon name="loading" className="animate-spin" size={50} />
    </div>
  );
}
