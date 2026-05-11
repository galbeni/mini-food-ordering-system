"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import {
  useCreateOrderMutation,
  useGetRestaurantQuery,
} from "@/features/api/apiSlice";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RestaurantDetailSkeleton } from "@/components/skeletons/restaurant-detail-skeleton";
import { skipToken } from "@reduxjs/toolkit/query";
import { t } from "@/i18n";

type Cart = Record<string, number>;

export default function RestaurantDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const restaurantSlug = params.slug;

  const {
    data: restaurant,
    isLoading,
    isError,
  } = useGetRestaurantQuery(restaurantSlug ?? skipToken);

  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();

  const [cart, setCart] = useState<Cart>({});
  const [error, setError] = useState<string | null>(null);

  const cartItems = useMemo(() => {
    if (!restaurant) {
      return [];
    }

    return restaurant.menuItems
      .map((menuItem) => ({
        menuItem,
        quantity: cart[menuItem.id] ?? 0,
      }))
      .filter((item) => item.quantity > 0);
  }, [cart, restaurant]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0,
  );

  const increase = (menuItemId: string) => {
    setCart((currentCart) => ({
      ...currentCart,
      [menuItemId]: (currentCart[menuItemId] ?? 0) + 1,
    }));
  };

  const decrease = (menuItemId: string) => {
    setCart((currentCart) => {
      const nextQuantity = (currentCart[menuItemId] ?? 0) - 1;

      if (nextQuantity <= 0) {
        const nextCart = { ...currentCart };
        delete nextCart[menuItemId];
        return nextCart;
      }

      return {
        ...currentCart,
        [menuItemId]: nextQuantity,
      };
    });
  };

  const handlePlaceOrder = async () => {
    setError(null);

    if (!restaurant || cartItems.length === 0) {
      return;
    }

    try {
      const order = await createOrder({
        restaurantId: restaurant.id,
        items: cartItems.map((item) => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity,
        })),
      }).unwrap();

      router.push(`/orders/${order.id}`);
    } catch {
      setError(t.restaurantDetail.cart.error);
    }
  };

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl w-full px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/restaurants">{t.restaurantDetail.back}</Link>
        </Button>
        {isLoading ? <RestaurantDetailSkeleton /> : null}
        {isError ? (
          <p className="text-red-600">{t.restaurantDetail.error}</p>
        ) : null}
        {!isLoading && restaurant ? (
          <>
            <section className="mb-8 overflow-hidden rounded-2xl border bg-white">
              {restaurant.imageUrl ? (
                <div
                  className="h-56 bg-cover bg-center"
                  style={{ backgroundImage: `url(${restaurant.imageUrl})` }}
                />
              ) : null}
              <div className="p-6">
                <p className="text-sm font-medium text-slate-500">
                  {t.restaurantDetail.eyebrow}
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight">
                  {restaurant.name}
                </h1>
                <p className="mt-2 max-w-2xl text-slate-600">
                  {restaurant.description}
                </p>
              </div>
            </section>
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <section>
                <h2 className="mb-4 text-xl font-semibold">
                  {t.restaurantDetail.menu}
                </h2>
                <div className="grid gap-4">
                  {restaurant.menuItems.map((menuItem) => (
                    <Card key={menuItem.id}>
                      <CardContent className="flex gap-4 p-4">
                        {menuItem.imageUrl ? (
                          <div
                            className="h-24 w-24 shrink-0 rounded-xl bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${menuItem.imageUrl})`,
                            }}
                          />
                        ) : null}
                        <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row">
                          <div>
                            <h3 className="font-semibold">{menuItem.name}</h3>
                            <p className="mt-1 text-sm text-slate-600">
                              {menuItem.description}
                            </p>
                            <p className="mt-2 font-medium">
                              {formatPrice(menuItem.price)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => decrease(menuItem.id)}
                              disabled={!cart[menuItem.id]}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-6 text-center font-medium">
                              {cart[menuItem.id] ?? 0}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => increase(menuItem.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
              <aside>
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>{t.restaurantDetail.cart.title}</CardTitle>
                    <CardDescription>
                      {t.restaurantDetail.cart.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.length === 0 ? (
                      <p className="text-sm text-slate-600">
                        {t.restaurantDetail.cart.empty}
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div
                            key={item.menuItem.id}
                            className="flex justify-between gap-4 text-sm"
                          >
                            <span>
                              {item.quantity} × {item.menuItem.name}
                            </span>
                            <span className="font-medium">
                              {formatPrice(item.menuItem.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold">
                        <span>{t.restaurantDetail.cart.total}</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                    </div>
                    {error ? (
                      <p className="text-sm text-red-600">{error}</p>
                    ) : null}
                    <Button
                      className="w-full"
                      disabled={cartItems.length === 0 || isCreatingOrder}
                      onClick={handlePlaceOrder}
                    >
                      {isCreatingOrder
                        ? t.restaurantDetail.cart.placingOrder
                        : t.restaurantDetail.cart.placeOrder}
                    </Button>
                    <p className="text-xs text-slate-500">
                      {t.restaurantDetail.cart.loginHint}
                    </p>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </>
        ) : null}
      </main>
    </>
  );
}
