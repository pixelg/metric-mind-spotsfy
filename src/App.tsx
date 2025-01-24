import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "@/components/BaseLayout";
import { Button } from "./components/ui/button";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { SpotifyCallback } from "./components/SpotifyCallback";
import { RecentlyPlayedResponse, RecentlyPlayedItem } from "./types/SpotifyTypes";

const queryClient = new QueryClient();

const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:5173/callback";
const SCOPES = ["user-read-recently-played", "user-top-read", "user-read-playback-state", "user-modify-playback-state"];

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

// async function exchangeCodeForToken(code: string) {
//   const codeVerifier = localStorage.getItem('code_verifier');
  
//   const params = new URLSearchParams({
//     client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
//     grant_type: 'authorization_code',
//     code,
//     redirect_uri: REDIRECT_URI,
//     code_verifier: codeVerifier!
//   });

//   const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: params
//   });

//   if (!response.ok) {
//     throw new Error('Failed to exchange code for token');
//   }

//   const data = await response.json();
//   return data.access_token;
// }

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState('');
  
  const handleLogin = async () => {
    const authUrl = await getAuthUrl();
    window.location.href = authUrl;
  };

  // const handleAuthSuccess = (newToken: string) => {
  //   setToken(newToken);
  // };

  const recentlyPlayedQuery = useQuery<RecentlyPlayedResponse>({
    queryKey: ['recentlyPlayed'],
    queryFn: () => getRecentlyPlayed(token),
    enabled: !!token,
  });

  return (
    <BaseLayout>
      <div className="container mx-auto py-8">
        {!token ? (
          <div className="text-center">
            <Button onClick={handleLogin}>
              Connect with Spotify
            </Button>
          </div>
        ) : (
          <div>
            {recentlyPlayedQuery.isLoading && (
              <div>Loading...</div>
            )}

            {recentlyPlayedQuery.error && (
              <div>Error: {(recentlyPlayedQuery.error as Error).message}</div>
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
                            {item.track.artists.map(artist => artist.name).join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </BaseLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/callback" element={<SpotifyCallback onAuthSuccess={(token) => window.location.href = `/?token=${token}`} />} />
          <Route path="/" element={<AppContent />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
