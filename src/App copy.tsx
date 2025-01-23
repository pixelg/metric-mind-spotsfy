import BaseLayout from "@/components/BaseLayout";
// import Widget from "@/components/ui/Widget";
import DataPage from "@/components/payments/page";
import { Button } from "./components/ui/button";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

// Create a client
const queryClient = new QueryClient();

const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:8888/callback"; // Updated to match the dashboard
const SCOPES = ["user-read-recently-played"];

// Spotify API functions
function getAuthUrl() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  console.log('Client ID:', clientId);
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(" "),
    response_type: 'code',  // Changed from 'token' to 'code' for authorization code flow
    show_dialog: 'true'
  });
  
  const url = `${SPOTIFY_AUTH_ENDPOINT}?${params.toString()}`;
  console.log('Auth URL:', url);
  return url;
}

async function getRecentlyPlayed(token: string) {
  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch recently played tracks');
  }
  
  return response.json();
}

function AppContent() {
  const [token, setToken] = useState('');
  
  // Check for token in URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      console.log('Received authorization code:', code);
      // Here we would exchange the code for an access token
      // For now, just log it to verify the flow works
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'))?.split('=')[1];
      if (token) {
        setToken(token);
        // Clear the URL hash
        window.location.hash = '';
      }
    }
  }, []);

  // Recently played tracks query
  const recentlyPlayedQuery = useQuery({
    queryKey: ['recentlyPlayed'],
    queryFn: () => getRecentlyPlayed(token),
    enabled: !!token,
  });

  const handleLogin = () => {
    window.location.href = getAuthUrl();
  }

  if (!token) {
    return (
      <BaseLayout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold mb-8">Welcome to Spotify History</h1>
          <Button 
            variant='outline' 
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={handleLogin}
          >
            Login with Spotify
          </Button>
        </div>
      </BaseLayout>
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
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {recentlyPlayedQuery.data.items.map((item: any) => (
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
                      {item.track.artists.map((artist: any) => artist.name).join(', ')}
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

      <div className="min-w-fit lg:w-1/2 p-4 m-auto">
        <DataPage />
      </div>
    </BaseLayout>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App
