
import { SpotifyAuth } from "@/components/spotify/SpotifyAuth.tsx";
import { useAuthHook } from "@/components/auth/hooks/useAuthHook.tsx";
import Welcome from "@/components/spotify/Welcome.tsx";

export function AppContent() {
  const authContextProps = useAuthHook();

  if (!authContextProps.authState || !authContextProps.authState.isAuthenticated) {
    return (
      <SpotifyAuth />
    );
  }

  return (
    <Welcome />
  );
}