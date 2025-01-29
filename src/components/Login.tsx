import BaseLayout from "@/components/BaseLayout.tsx";
import {Button} from "@/components/ui/button.tsx";

const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
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

export function Login() {
  const handleLogin = async () => {
    window.location.href = await getAuthUrl();
  }

  return <BaseLayout>
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Metric Mind Jams Login</h1>
      <Button
        variant="outline"
        className="bg-green-500 hover:bg-green-600 text-white"
        onClick={handleLogin}
      >
        Login with Spotify
      </Button>
    </div>
  </BaseLayout>;
}