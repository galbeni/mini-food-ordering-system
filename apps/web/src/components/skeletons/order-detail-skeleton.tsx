import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const OrderDetailSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-44" />
        </section>
        <section className="space-y-3">
          <Skeleton className="h-5 w-20" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-between gap-4 rounded-xl border p-3"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </section>
        <section className="flex justify-between border-t pt-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </section>
      </CardContent>
    </Card>
  );
};
