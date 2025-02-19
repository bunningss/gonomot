import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PollCardSkeleton() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>

          <div className="md:flex justify-center">
            <Skeleton className="h-8 w-24" />
          </div>

          <div className="flex md:justify-end col-span-2 md:col-span-1">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
