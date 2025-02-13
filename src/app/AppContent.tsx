import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router";
import BaseLayout from "@/components/BaseLayout.tsx";

/**
 * The root content component for the app.
 *
 * This component provides a root-level `<BaseLayout>` component, which
 * contains a `<Suspense>` component. The `<Suspense>` component wraps the
 * Outlet, which contains the actual content of the page. The fallback of
 * the `<Suspense>` component is a loading indicator.
 *
 * Additionally, the `<Suspense>` component is wrapped with an `<ErrorBoundary>`
 * component, which will display an error message if any component in the
 * subtree throws an error.
 *
 * @returns The root content component for the app.
 */
export const AppContent = () => {
  const location = useLocation();
  return (
    <BaseLayout>
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            Loading...
          </div>
        }
      >
        <ErrorBoundary key={location.pathname} fallback={<div>Error</div>}>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </BaseLayout>
  );
};
