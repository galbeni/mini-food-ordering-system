"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { useGetOrderQuery } from "@/features/api/apiSlice";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;

  const { data: order, isLoading, isError } = useGetOrderQuery(orderId);

  return (
    <>
      <AppHeader />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/restaurants">← Back to restaurants</Link>
        </Button>

        {isLoading ? <p className="text-slate-600">Loading order...</p> : null}

        {isError ? (
          <Card>
            <CardHeader>
              <CardTitle>Order not available</CardTitle>
              <CardDescription>
                Please login or check whether this order belongs to your
                account.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}

        {order ? (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Order placed
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Order ID: {order.id}
                  </CardDescription>
                </div>

                <Badge>{order.status}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <section>
                <h2 className="font-semibold">Restaurant</h2>
                <p className="mt-1 text-slate-600">{order.restaurant.name}</p>
              </section>

              <section>
                <h2 className="mb-3 font-semibold">Items</h2>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-4 rounded-xl border p-3 text-sm"
                    >
                      <div>
                        <p className="font-medium">{item.menuItem.name}</p>
                        <p className="text-slate-600">
                          {item.quantity} × {formatPrice(item.unitPrice)}
                        </p>
                      </div>

                      <p className="font-semibold">
                        {formatPrice(item.quantity * item.unitPrice)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(order.totalPrice)}</span>
              </section>
            </CardContent>
          </Card>
        ) : null}
      </main>
    </>
  );
}
