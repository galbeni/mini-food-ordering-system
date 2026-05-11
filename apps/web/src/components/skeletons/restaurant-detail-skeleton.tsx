import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const RestaurantDetailSkeleton = () => {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border bg-white">
        <Skeleton className="h-56 w-full" />
        <div className="space-y-3 p-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section>
          <Skeleton className="mb-4 h-7 w-24" />
          <div className="grid gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="flex gap-4 p-4">
                  <Skeleton className="h-24 w-24 shrink-0 rounded-xl" />
                  <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row">
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-full max-w-md" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <Skeleton className="h-5 w-6" />
                      <Skeleton className="h-10 w-10 rounded-md" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <aside>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-px w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};
