import { Button } from "@/components/ui/button.tsx";
import { login } from "@/lib/spotify-auth.ts";

export const LandingRoute = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Metric Mind Jams Login</h1>
      <Button
        variant="outline"
        className="bg-green-500 hover:bg-green-600 text-white"
        onClick={async () => (window.location.href = await login())}
      >
        Login with Spotify
      </Button>
    </div>
  );
};
