import BaseLayout from "@/components/BaseLayout";
// import Widget from "@/components/ui/Widget";
import DataPage from "@/components/payments/page";
import { Button } from "./components/ui/button";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const REDIRECT_URI = "http://localhost:5173/callback";
const SCOPES = ["user-read-recently-played"];

// PKCE Helper functions
async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Spotify API functions
async function getAuthUrl() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  
  // Store code verifier in localStorage to use it when exchanging code for token
  localStorage.setItem('code_verifier', codeVerifier);
  
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(" "),
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    show_dialog: 'true'
  });
  
  return `${SPOTIFY_AUTH_ENDPOINT}?${params.toString()}`;
}

async function exchangeCodeForToken(code: string) {
  const codeVerifier = localStorage.getItem('code_verifier');
  
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: codeVerifier!
  });

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  const data = await response.json();
  return data.access_token;
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

interface SpotifyArtist {
  name: string;
  id: string;
  uri: string;
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyAlbum {
  images: SpotifyImage[];
  name: string;
}

interface SpotifyTrack {
  id: string;
  name: string;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
}

interface RecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
}

interface RecentlyPlayedResponse {
  items: RecentlyPlayedItem[];
}

function AppContent() {
  const [token, setToken] = useState('');
  
  // Handle the OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      exchangeCodeForToken(code)
        .then(token => {
          setToken(token);
          // Clear the URL parameters
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(error => {
          console.error('Error exchanging code for token:', error);
        });
    }
  }, []);

  // Recently played tracks query
  const recentlyPlayedQuery = useQuery<RecentlyPlayedResponse>({
    queryKey: ['recentlyPlayed'],
    queryFn: () => getRecentlyPlayed(token),
    enabled: !!token,
  });

  const handleLogin = async () => {
    const url = await getAuthUrl();
    window.location.href = url;
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

      <div className="min-w-fit lg:w-1/2 p-4 m-auto">
        <DataPage />
      </div>
    </BaseLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App
