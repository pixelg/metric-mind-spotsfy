import {useQuery} from "@tanstack/react-query";
import {
  SpotifyTrack,
  PlayerQueueResponse,
  SpotifyArtist,
} from "@/types/spotify-types.ts";
import BaseLayout from "@/components/BaseLayout.tsx";
import { AuthContextProps } from "@/components/auth/contexts/AuthContext.tsx";
import {useAuthHook} from "@/components/auth/hooks/useAuthHook.tsx";
import {Login} from "@/components/Login.tsx";

const PLAYER_QUEUE_URL =
  "https://api.spotify.com/v1/me/player/queue";

async function getPlayerQueue(
  authContextProps: AuthContextProps,
) {
  const response = await fetch(PLAYER_QUEUE_URL, {
    headers: {
      Authorization: `Bearer ${authContextProps.authState.accessToken}`,
    },
  });

  if (response.status === 401) {
    authContextProps.setAuthState({...authContextProps.authState, isAuthenticated: false});
    throw new Error("Access token expired");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch player queue");
  }

  return response.json();
}

export function PlayerQueue() {
  const authContextProps = useAuthHook();

  const playerQueueQuery = useQuery<PlayerQueueResponse>({
    queryKey: ['playerQueue'],
    queryFn: () => getPlayerQueue(authContextProps),
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
          Your Queue
        </h1>

        {/* Display loading, error, or the recently played tracks */}
        {playerQueueQuery.isPending && (
          <div className="text-center">Loading your queue...</div>
        )}

        {playerQueueQuery.isError && (
          <div className="text-red-500 text-center mt-4">
            Error fetching your queue!
          </div>
        )}

        {playerQueueQuery.data && (
          <div className="w-11/12 md:w-3/4 lg:w-2/3 space-y-4">
            {playerQueueQuery.data.queue.map((item: SpotifyTrack, index: number) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-lg flex items-center space-x-4">
                {/* Album Cover */}
                {item.album.images[0] && (
                  <img
                    src={item.album.images[0].url}
                    alt={item.album.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded"
                  />
                )}

                {/* Track and Artist Info */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-500 dark:text-amber-100 opacity-70">{item.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {item.artists.map((artist: SpotifyArtist) => artist.name).join(", ")}
                  </p>
                  {/*<p className="text-sm text-gray-400 dark:text-gray-500">*/}
                  {/*  {new Date(item.played_at).toLocaleString()}*/}
                  {/*</p>*/}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseLayout>
  );

}

export default PlayerQueue;