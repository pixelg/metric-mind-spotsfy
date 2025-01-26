import {useQuery} from "@tanstack/react-query";
import {RecentlyPlayedItem, RecentlyPlayedResponse, SpotifyArtist} from "@/components/spotify/types/SpotifyTypes.ts";
import BaseLayout from "@/components/BaseLayout.tsx";
import {SpotifyAuth} from "@/components/spotify/SpotifyAuth.tsx";
import {useAuthFlow} from "@/components/auth/hooks/useAuthFlow.tsx";

const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played';

async function getRecentlyPlayed(token: string) {
  const response = await fetch(RECENTLY_PLAYED_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 401) {
    // check for refresh token and use it if available
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch recently played tracks');
  }

  return response.json();
}

export function AppContent() {
  const { authState } = useAuthFlow();

  const recentlyPlayedQuery = useQuery<RecentlyPlayedResponse>({
    queryKey: ['recentlyPlayed'],
    queryFn: () => getRecentlyPlayed(authState.accessToken),
    enabled: authState.isAuthenticated,
  });

  if (!authState.isAuthenticated) {
    return (
      <SpotifyAuth />
    );
  }

  return (
    <BaseLayout>
      <h1 className={'text-3xl text-center font-bold w-screen mb-8'}>Your Recently Played Tracks</h1>

      {recentlyPlayedQuery.isPending && (
        <div className="text-center">Loading your recently played tracks...</div>
      )}

      {recentlyPlayedQuery.isError && (
        <div className="text-red-500 text-center mt-4">
          Error fetching your recently played tracks!
        </div>
      )}

      {recentlyPlayedQuery.data && (
        <div className="max-w-4xl max-h-4xl mx-auto px-4">
          <div className="space-y-4">
            {recentlyPlayedQuery.data.items.map((item: RecentlyPlayedItem) => (
              <div key={item.played_at} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="flex items-center space-x-4">
                  {item.track.album.images[0] && (
                    <img
                      src={item.track.album.images[0].url}
                      alt={item.track.album.name}
                      className="w-16 h-16 rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{item.track.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.track.artists.map((artist: SpotifyArtist) => artist.name).join(', ')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {new Date(item.played_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </BaseLayout>
  );
}