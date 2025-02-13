import { spotifyApi } from "@/lib/spotify-api";
import { useNavigate, useLocation } from "react-router";
// import { z } from "zod";
import axios from "axios";
import { generateCodeChallenge, generateCodeVerifier } from "@/utils/pkce.ts";
import { SpotifyUser, Tokens } from "@/types/spotify-auth-types.ts";
// import { configureAuth } from "react-query-auth";
import React from "react";

// const userSchema = z.object({
//   id: z.string(),
//   display_name: z.string(),
//   email: z.string(),
//   images: z.array(z.object({ url: z.string() })),
// });

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const AUTH_URL = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const scope =
  "user-read-email user-read-private user-read-recently-played user-read-currently-playing user-read-playback-state";

/**
 * Initiates the authorization flow with Spotify by redirecting the user to an authorization URL.
 *
 * The authorization URL is generated with the client ID, redirect URI, scopes, code challenge, and code challenge method.
 * The user will be redirected back to the redirect URI with an authorization code as a query parameter.
 *
 * @returns A promise that resolves with the authorization code response from Spotify.
 */
export const login = async () => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Store code verifier in localStorage to use it when exchanging code for token
  localStorage.setItem("code_verifier", codeVerifier);

  const authUrl = new URL(AUTH_URL);
  const params = {
    response_type: "code",
    client_id: CLIENT_ID,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: REDIRECT_URI,
  };

  authUrl.search = new URLSearchParams(params).toString();
  // const authUrl = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}
  // &scope=${SCOPES.join("%20")}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
  return authUrl.toString();
  // return spotifyApi.get(authUrl);
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

/**
 * Exchanges the given authorization code for an access token and refresh token.
 *
 * Posts a request to the Spotify token endpoint with the authorization code,
 * redirect URI, client ID, and code verifier. The response is stored in local
 * storage and returned.
 *
 * @param code - The authorization code to exchange for an access token and
 *               refresh token.
 * @returns A promise that resolves to an object containing the access token and
 *          refresh token.
 */
export const exchangeCodeForToken = async (code: string): Promise<Tokens> => {
  const { data } = await axios.post(
    TOKEN_ENDPOINT,
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: localStorage.getItem("code_verifier")!,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );

  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  return data;
};

/**
 * Fetches the current user from Spotify's Web API.
 *
 * @returns A `Promise` that resolves with the current user's data.
 */
export const getSpotifyUser = async (): Promise<SpotifyUser> => {
  const { data } = await spotifyApi.get<SpotifyUser>("/me");
  return data;
};

export const useSpotifyUser = () => {
  const navigate = useNavigate();
  const spotifyUser = React.useMemo(async () => await getSpotifyUser(), []);
  if (!spotifyUser) {
    navigate("/");
  }

  return spotifyUser;
};

/**
 * Refreshes the Spotify access token using the refresh token stored in local storage.
 *
 * This function sends a POST request to the Spotify token endpoint with the refresh token
 * to obtain a new access token. The new access token is then stored in local storage.
 *
 * @returns A promise that resolves to the new access token string.
 * @throws An error if no refresh token is found in local storage.
 */
export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const { data } = await axios.post(
    TOKEN_ENDPOINT,
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );

  localStorage.setItem("access_token", data.access_token);
  return data.access_token;
};

// const authConfig = {
//   userFn: getSpotifyUser, // Fetch Spotify user from "/me"
//   loginFn: async () => {
//     const authCodeResponse = await loginWithRedirect();
//     const authTokenResponse = await exchangeCodeForToken(authCodeResponse.code);
//     console.log({ authTokenResponse });
//     return getSpotifyUser();
//   },
//   /**
//    * Registers a new user with the Spotify API. This is a placeholder,
//    * as Spotify does not support user registration.
//    *
//    * @returns A mock user object.
//    */
//   registerFn: async (): Promise<SpotifyUser> => {
//     // Placeholder: Spotify does not use registration
//     return {
//       country: "",
//       display_name: "",
//       email: "",
//       href: "",
//       id: "",
//       images: [{ url: "mock", width: 0, height: 0 }],
//       product: "",
//       type: "",
//       uri: "",
//     };
//   },
//   /**
//    * Logout function that clears tokens and redirects to a logged-out state.
//    *
//    * This function is called by `useLogout` when the user logs out.
//    *
//    * @returns A promise that resolves when the logout is complete.
//    */
//   logoutFn: async () => {
//     // Clear tokens and redirect to a logged-out state
//     localStorage.clear();
//     window.location.href = "/";
//     return Promise.resolve();
//   },
// };

/**
 * Configures authentication using the `configureAuth` function from `react-query-auth`.
 *
 * @param {Object} authConfig - The authentication configuration object.
 * @returns An object containing the `useUser`, `useLogin`, `useLogout`, `useRegister`, and `AuthLoader` functions.
 */
// export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
//   configureAuth(authConfig);

/**
 * A component that protects routes by checking if a user is authenticated.
 * If the user is not authenticated, they are redirected to the login page with
 * the current location encoded as a redirect parameter.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render if the user is authenticated.
 * @returns {React.ReactNode} The children components if the user is authenticated, otherwise navigates to the login page.
 */
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSpotifyUser();
  const location = useLocation();
  const navigate = useNavigate();

  !user &&
    navigate(
      encodeURIComponent(`/?redirect=${location.pathname} ${location.search}`),
      {
        replace: true,
      },
    );

  return children;
};
