import { icons } from "@/lib/static";
import { cn } from "@/lib/utils";

interface IconProps {
  size?: number;
  name: keyof typeof icons;
  className?: string;
}

export function Icon({ size = 16, name, className }: IconProps) {
  const CurrentIcon = icons[name];

  if (!CurrentIcon) return null;

  return <CurrentIcon className={cn(className)} size={size} />;
}
