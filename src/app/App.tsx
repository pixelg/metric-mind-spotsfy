import { AppProvider } from "@/app/AppProvider.tsx";
import { AppRouter } from "@/app/AppRouter.tsx";

/**
 * The top-level component for the application.
 *
 * This component wraps the entire app with the {@link AppProvider} and {@link AppRouter}
 * components. It provides the global state and routing configuration for the app.
 *
 * Note that the {@link AppRouter} component is responsible for rendering the routes defined
 * in the {@link AppRouter} component. The routes are defined in the {@link AppRouter} component
 * as a list of {@link Route} components.
 *
 * @returns The rendered app component tree.
 */
export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
