import axios from "axios";
import { refreshAccessToken } from "@/lib/spotify-auth.ts";

const SPOTIFY_API_URL = "https://api.spotify.com/v1";

/**
 * Creates an axios instance with a base URL pointing to the Spotify Web API.
 *
 * All requests made with this instance will have a JSON content type and will
 * include an Authorization header with a Bearer token from local storage if
 * available.
 *
 * @remarks
 * This instance is meant to be used for making requests to the Spotify Web API.
 * It will automatically add an Authorization header with a Bearer token to each
 * outgoing request if a token is available in local storage.
 */
export const spotifyApi = axios.create({
  baseURL: SPOTIFY_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * This interceptor adds an Authorization header with a Bearer token from local storage
 * to each outgoing request made by the spotifyApi axios instance.
 *
 * @param config - The axios request configuration object to be modified.
 * @returns The modified config object with an Authorization header if a token is available.
 */
spotifyApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 *
 * This interceptor catches any errors that occur while making a request to the Spotify Web API
 * and refreshes the access token if the error is a 401 Unauthorized, then retries the request.
 *
 *
 */
spotifyApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    // if token expired
    if (error.response?.status === 401) {
      const newAccessToken = await refreshAccessToken();
      error.config.headers.Authorization = `Bearer ${newAccessToken}`;
      return axios.request(error.config);
    }
    return Promise.reject(error);
  },
);
