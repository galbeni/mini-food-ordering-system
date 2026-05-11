import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AuthResponse,
  CreateOrderRequest,
  CurrentUser,
  LoginRequest,
  Order,
  RegisterRequest,
  Restaurant,
  RestaurantDetail,
} from "@/types/api";
import type { RootState } from "@/store/store";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Auth", "Restaurants", "Orders"],
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    whoAmI: builder.query<CurrentUser, void>({
      query: () => "/auth/who-am-i",
      providesTags: ["Auth"],
    }),

    getRestaurants: builder.query<Restaurant[], void>({
      query: () => "/restaurants",
      providesTags: ["Restaurants"],
    }),

    getRestaurant: builder.query<RestaurantDetail, string>({
      query: (slug) => `/restaurants/${slug}`,
      providesTags: (_result, _error, slug) => [
        { type: "Restaurants", id: slug },
      ],
    }),

    createOrder: builder.mutation<Order, CreateOrderRequest>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),

    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),

    getOrder: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useWhoAmIQuery,
  useGetRestaurantsQuery,
  useGetRestaurantQuery,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
} = apiSlice;
