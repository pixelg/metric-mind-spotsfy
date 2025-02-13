import { useEffect } from "react";
import { useNavigate } from "react-router";
import { exchangeCodeForToken } from "@/lib/spotify-auth.ts";

/**
 * Handles the Spotify authorization callback route.
 *
 * This component is responsible for exchanging the authorization code given
 * by Spotify in the URL for an access token and refresh token, and then
 * redirecting the user to the dashboard.
 *
 * @returns A component that renders a "Loading..." message.
 */
const SpotifyAuthCallbackRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      exchangeCodeForToken(code)
        .then(() => {
          navigate("/app/dashboard");
        })
        .catch((error) => {
          console.error("Error exchanging code for token", error);
        });
    } else {
      console.error("No code found in URL");
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <p>Exchanging code for token from Spotify...</p>
    </div>
  );
};

export default SpotifyAuthCallbackRoute;
