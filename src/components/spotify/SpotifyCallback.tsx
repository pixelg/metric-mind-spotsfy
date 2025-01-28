import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {useAuthHook} from "@/components/auth/hooks/useAuthHook.tsx";

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

interface SpotifyCallbackProps {
  onAuthSuccess: (token: string) => void;
}

export function SpotifyCallback({ onAuthSuccess }: SpotifyCallbackProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { authState } = useAuthHook();

  useEffect(() => {
    async function handleCallback() {
      const code = searchParams.get('code');
      const errorMessage = searchParams.get('error');

      if (shouldNavigateToHome(errorMessage, code)) {
        navigateToHome();
        return;
      }

      try {
        const tokenResponse = await fetchSpotifyToken(code || '');
        const tokenData = await parseTokenResponse(tokenResponse);

        if (tokenData) {
          updateAuthState(tokenData);
          onAuthSuccess(tokenData.access_token);
        }

        navigateToHome();
      } catch (err) {
        console.error('Error exchanging code for token:', err);
        navigateToHome();
      }
    }

    const SPOTIFY_TOKEN_BODY = {
      redirect_uri: 'http://localhost:5173/callback',
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      code_verifier: localStorage.getItem('code_verifier') || '',
    };

    function shouldNavigateToHome(errorMessage: string | null, code: string | null): boolean {
      if (errorMessage) {
        console.error('Authorization error:', errorMessage);
        return true;
      }

      if (!code) {
        console.error('No authorization code received');
        return true;
      }

      return authState.isAuthenticated && !authState.shouldRefresh;
    }

    function navigateToHome(): void {
      navigate('/');
    }

    async function fetchSpotifyToken(code: string): Promise<Response> {
      return fetch(SPOTIFY_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          ...SPOTIFY_TOKEN_BODY,
        }),
      });
    }

    async function parseTokenResponse(response: Response): Promise<null | {
      access_token: string;
      refresh_token: string
    }> {
      if (!response.ok) {
        throw new Error('Token exchange failed');
      }

      return response.json();
    }

    function updateAuthState(data: { access_token: string; refresh_token: string }): void {
      authState.setAccessToken(data.access_token);
      authState.setRefreshToken(data.refresh_token);
    }

    handleCallback();
  }, [searchParams, navigate, onAuthSuccess, authState]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
}
