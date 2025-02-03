import {useQuery} from "@tanstack/react-query";
import {
  RecentlyPlayedItem,
  RecentlyPlayedResponse,
  SpotifyArtist,
} from "@/components/spotify/types/SpotifyTypes.ts";
import BaseLayout from "@/components/BaseLayout.tsx";
import { AuthContextProps } from "@/components/auth/contexts/AuthContext.tsx";
import {useAuthHook} from "@/components/auth/hooks/useAuthHook.tsx";
import {Login} from "@/components/Login.tsx";

const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played";

async function getRecentlyPlayed(
  authContextProps: AuthContextProps,
) {
  const response = await fetch(RECENTLY_PLAYED_URL, {
    headers: {
      Authorization: `Bearer ${authContextProps.authState.accessToken}`,
    },
  });

  if (response.status === 401) {
    authContextProps.setAuthState({...authContextProps.authState, isAuthenticated: false});
    throw new Error("Access token expired");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch recently played tracks");
  }

  return response.json();
}

export function RecentlyPlayed() {
  const authContextProps = useAuthHook();

  const recentlyPlayedQuery = useQuery<RecentlyPlayedResponse>({
    queryKey: ['recentlyPlayed'],
    queryFn: () => getRecentlyPlayed(authContextProps),
    enabled: authContextProps.authState.isAuthenticated,
  });

  if (!authContextProps.authState || !authContextProps.authState.isAuthenticated) {
    return (
      <Login />
    );
  }

  return (
    <BaseLayout>
      {/* Full-screen background with muted blue */}
      <div className="w-screen min-h-screen opacity-2 bg-gray-100 dark:bg-gray-800 flex flex-col items-start p-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-zinc-800 dark:text-zinc-200">
          Your Recently Played Tracks
        </h1>

        {/* Display loading, error, or the recently played tracks */}
        {recentlyPlayedQuery.isPending && (
          <div className="text-center">Loading your recently played tracks...</div>
        )}

        {recentlyPlayedQuery.isError && (
          <div className="text-red-500 text-center mt-4">
            Error fetching your recently played tracks!
          </div>
        )}

        {recentlyPlayedQuery.data && (
          <div className="w-11/12 md:w-3/4 lg:w-2/3 space-y-4">
            {recentlyPlayedQuery.data.items.map((item: RecentlyPlayedItem) => (
              <div key={item.played_at} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-lg flex items-center space-x-4">
                {/* Album Cover */}
                {item.track.album.images[0] && (
                  <img
                    src={item.track.album.images[0].url}
                    alt={item.track.album.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded"
                  />
                )}

                {/* Track and Artist Info */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-500 dark:text-amber-100 opacity-70">{item.track.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {item.track.artists.map((artist: SpotifyArtist) => artist.name).join(", ")}
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    {new Date(item.played_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseLayout>
  );

}

export default RecentlyPlayed;