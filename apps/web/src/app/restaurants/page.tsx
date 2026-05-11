"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/app-header";
import { useGetRestaurantsQuery } from "@/features/api/apiSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RestaurantsPage() {
  const { data: restaurants, isLoading, isError } = useGetRestaurantsQuery();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl w-full px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            Mini Food Ordering
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Restaurants
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Browse restaurants, add menu items to your cart and place a simple
            order.
          </p>
        </div>
        {isLoading ? (
          <p className="text-slate-600">Loading restaurants...</p>
        ) : null}
        {isError ? (
          <p className="text-red-600">
            Failed to load restaurants. Please check if the API is running.
          </p>
        ) : null}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants?.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden pt-0">
              {restaurant.imageUrl ? (
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${restaurant.imageUrl})` }}
                />
              ) : null}
              <CardHeader>
                <CardTitle>{restaurant.name}</CardTitle>
                <CardDescription>{restaurant.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/restaurants/${restaurant.id}`}>View menu</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
