import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import { ProtectedRoute } from "@/lib/spotify-auth";
import { AppContent } from "./AppContent";
import SpotifyAuthCallbackRoute from "@/app/routes/spotify-auth-handler.tsx";

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/callback",
      element: <SpotifyAuthCallbackRoute />,
    },
    {
      path: "/",
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
          lazy: async () => {
            const { DashboardRoute } = await import("@/app/routes/dashboard");
            return { Component: DashboardRoute };
          },
        },
        {
          path: "recently-played",
          lazy: async () => {
            const { RecentlyPlayedRoute } = await import(
              "@/app/routes/recently-played"
            );
            return { Component: RecentlyPlayedRoute };
          },
        },
        {
          path: "player-queue",
          lazy: async () => {
            const { PlayerQueueRoute } = await import(
              "@/app/routes/player-queue"
            );
            return { Component: PlayerQueueRoute };
          },
        },
      ],
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRoute } = await import("@/app/routes/not-found");
        return { Component: NotFoundRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);
  return <RouterProvider router={router} />;
};
