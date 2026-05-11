"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AppHeader } from "@/components/layout/app-header";
import { OrdersPageSkeleton } from "@/components/skeletons/orders-page-skeleton";
import { useGetOrdersQuery } from "@/features/api/apiSlice";
import { formatPrice } from "@/lib/format";
import { t } from "@/i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RootState } from "@/store/store";

export default function OrdersPage() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const {
    data: orders,
    isLoading,
    isError,
  } = useGetOrdersQuery(undefined, {
    skip: !accessToken,
  });

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            {t.orders.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {t.orders.title}
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            {t.orders.description}
          </p>
        </div>
        {!accessToken ? (
          <Card>
            <CardHeader>
              <CardTitle>{t.orders.loginRequiredTitle}</CardTitle>
              <CardDescription>
                {t.orders.loginRequiredDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/login">{t.nav.login}</Link>
              </Button>
            </CardContent>
          </Card>
        ) : null}
        {accessToken && isLoading ? <OrdersPageSkeleton /> : null}
        {accessToken && isError ? (
          <p className="text-red-600">{t.orders.error}</p>
        ) : null}
        {accessToken && !isLoading && orders?.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>{t.orders.empty}</CardTitle>
              <CardDescription>{t.orders.emptyDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/restaurants">{t.orders.browseRestaurants}</Link>
              </Button>
            </CardContent>
          </Card>
        ) : null}
        {accessToken && !isLoading && orders && orders.length > 0 ? (
          <div className="grid gap-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <h2 className="font-semibold">{order.restaurant.name}</h2>
                      <Badge>{order.status}</Badge>
                    </div>
                    <p className="text-sm text-slate-600">
                      {order.items.length}{" "}
                      {order.items.length > 1 ? t.orders.items : t.orders.item}{" "}
                      · {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p className="mt-2 font-medium">
                      {t.orders.total}: {formatPrice(order.totalPrice)}
                    </p>
                  </div>
                  <Button asChild>
                    <Link href={`/orders/${order.id}`}>
                      {t.orders.viewDetails}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}
      </main>
    </>
  );
}
