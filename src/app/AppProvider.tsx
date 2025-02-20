import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
// import { ErrorBoundary } from "react-error-boundary";
import { queryConfig } from "@/lib/react-query.ts";
// import { AuthLoader } from "@/lib/spotify-auth.ts";

type AppProviderProps = {
  children: React.ReactNode;
};

/**
 * AppProvider is a component that sets up the context for the application.
 * It initializes a QueryClient using default options from the queryConfig,
 * and provides it via the QueryClientProvider. It also wraps the children
 * components with a Suspense boundary to show a loading indicator while loading.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 *
 * @returns {React.ReactNode} The rendered component tree wrapped with necessary providers.
 */
export const AppProvider = ({
  children,
}: AppProviderProps): React.ReactNode => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </React.Suspense>
  );
};
