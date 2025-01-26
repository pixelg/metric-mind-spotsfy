import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {useAuthFlow} from "@/components/auth/hooks/useAuthFlow.tsx";

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

interface SpotifyCallbackProps {
  onAuthSuccess: (token: string) => void;
}

export function SpotifyCallback({ onAuthSuccess }: SpotifyCallbackProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuthState } = useAuthFlow();

  useEffect(() => {
    async function handleCallback() {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        console.error('Authorization error:', error);
        navigate('/');
        return;
      }

      if (!code) {
        console.error('No code received');
        navigate('/');
        return;
      }

      try {
        const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'http://localhost:5173/callback',
            client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
            code_verifier: localStorage.getItem('code_verifier') || '',
          }),
        });

        if (!response.ok) {
          throw new Error('Token exchange failed');
        }

        const data = await response.json();
        if (data.access_token){
          setAuthState({
            isAuthenticated: true,
            shouldRefresh: !!data.refresh_token,
            accessToken: data.access_token,
            refreshToken: data.refresh_token || ""
          });

          onAuthSuccess(data.access_token);
        }

        navigate('/');
      } catch (err) {
        console.error('Error exchanging code for token:', err);
        navigate('/');
      }
    }

    handleCallback();
  }, [searchParams, setAuthState, navigate, onAuthSuccess]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
}
