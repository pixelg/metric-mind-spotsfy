
import { Login } from "@/components/Login.tsx";
import { useAuthHook } from "@/components/auth/hooks/useAuthHook.tsx";
import Welcome from "@/components/spotify/Welcome.tsx";

export function AppContent() {
  const authContextProps = useAuthHook();

  if (!authContextProps.authState || !authContextProps.authState.isAuthenticated) {
    return (
      <Login />
    );
  }

  return (
    <Welcome />
  );
}