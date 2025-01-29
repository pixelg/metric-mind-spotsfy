import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthHook } from "@/components/auth/hooks/useAuthHook.tsx";

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

interface SpotifyAuthCallbackProps {
  onAuthSuccess: (token: string) => void;
  onAuthFailure: (error: string) => void;
}

export function SpotifyAuthHandler({ onAuthSuccess, onAuthFailure }: SpotifyAuthCallbackProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {authState, setAuthState} = useAuthHook();

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
          setAuthState({
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token,
            tokenType: tokenData.token_type,
            scope: tokenData.scope,
            expiresIn: tokenData.expires_in,
            isAuthenticated: true});
          
          onAuthSuccess(tokenData.access_token);
        }

        navigateToHome();
      } catch (err) {
        setAuthState((prevState) => ({
          ...prevState,
          isAuthenticated: false,
        }));
        onAuthFailure(err instanceof Error ? err.message : 'An unknown error occurred while authenticating');
        navigateToHome();
      }
    }

    function shouldNavigateToHome(errorMessage: string | null, code: string | null): boolean {
      if (errorMessage) {
        setAuthState((prevState) => ({
          ...prevState,
          isAuthenticated: false,
        }));
        onAuthFailure(errorMessage);
        return true;
      }

      if (!code) {
        setAuthState((prevState) => ({
          ...prevState,
          isAuthenticated: false,
        }));
        onAuthFailure('No authorization code received');
        return true;
      }

      return authState.isAuthenticated;
    }

    function navigateToHome(): void {
      navigate('/');
    }

    async function fetchSpotifyToken(code: string): Promise<Response> {
      const REDIRECT_URI = 'http://localhost:5173/callback';
      const CODE_VERIFIER = localStorage.getItem('code_verifier') || '';
      const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

      const accessTokenBody = (authCode: string) => {
        return new URLSearchParams(
          {
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            code_verifier: CODE_VERIFIER,
          }
        )
      }

      const refreshTokenBody = (refreshToken: string) => {
        return new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken || '',
          client_id: CLIENT_ID
        })
      }

      const shouldRefresh = authState?.accessToken && authState?.refreshToken;

      return fetch(SPOTIFY_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: shouldRefresh ? refreshTokenBody(authState.refreshToken) : accessTokenBody(code),
      });
    }

    async function parseTokenResponse(response: Response): Promise<null | {
      access_token: string;
      token_type: string;
      scope: string;
      expires_in: number;
      refresh_token: string
    }> {
      if (!response.ok) {
        setAuthState((prevState) => ({
          ...prevState,
          isAuthenticated: false,
        }));
        throw new Error('Token exchange failed');
      }

      return response.json();
    }

    handleCallback();
  }, [searchParams, navigate, onAuthSuccess, onAuthFailure, authState, setAuthState]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
}
