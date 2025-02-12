import React from "react";

export type SpotifyAuthCodeResponse = {
  code: string;
  state: string;
};

export interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  href: string;
  images: Array<{
    url: string;
    height: number | null; // Optional, considering some images may not have height
    width: number | null; // Optional, considering some images may not have width
  }>;
  country: string;
  product: string;
  type: string;
  uri: string;
}

export type Tokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export interface AuthProviderProps {
  children: React.ReactNode;
}
