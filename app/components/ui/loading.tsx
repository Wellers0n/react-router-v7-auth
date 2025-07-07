import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

type Props = Readonly<{
  isLoading: boolean;
  children: ReactNode;
}>;

export function Loading({ isLoading, children }: Props) {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner className={cn(isLoading ? "opacity-100" : "opacity-0")} />
      </div>
      <div className={isLoading ? "opacity-0" : "opacity-100"}>{children}</div>
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return <LoaderCircle className={cn("animate-spin", className)} />;
}
