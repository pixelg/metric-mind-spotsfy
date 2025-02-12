import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import { ProtectedRoute } from "@/lib/spotify-auth";
import { AppContent } from "./AppContent";
import SpotifyAuthCallbackRoute from "@/app/routes/spotify-auth-handler.tsx";

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/callback",
      element: <SpotifyAuthCallbackRoute />,
    },
    {
      path: "/",
      /**
       * A lazy function to load the `LandingRoute` component.
       *
       * The `lazy` property is a function that returns a promise that resolves to an object with a `Component` property.
       * The `Component` property is the component to render for the route.
       *
       * In this case, the `lazy` function imports the `LandingRoute` component from the `./routes/landing` module,
       * and returns an object with the `Component` property set to the imported component.
       */
      lazy: async () => {
        const { LandingRoute } = await import("./routes/landing");
        return { Component: LandingRoute };
      },
    },
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <AppContent />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "dashboard",
          /**
           * A lazy function to dynamically load the `DashboardRoute` component.
           *
           * The `lazy` property is a function that asynchronously imports the `DashboardRoute` component
           * from the `./routes/dashboard` module and returns an object with a `Component` property
           * containing the imported component. This allows for code splitting and reduces the initial
           * bundle size by loading the component only when needed.
           */
          lazy: async () => {
            const { DashboardRoute } = await import("./routes/dashboard");
            return { Component: DashboardRoute };
          },
        },
      ],
    },
  ]);

/**
 * A convenience component that wraps the React Router `RouterProvider` with the
 * `createAppRouter` function, passing in the `useQueryClient` hook to provide the
 * `QueryClient` instance.
 *
 * @returns A `RouterProvider` component with the app router configuration.
 */
export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(queryClient), []);
  return <RouterProvider router={router} />;
};
