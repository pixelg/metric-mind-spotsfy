export type AuthFlowType = "PKCE" | "Implicit" | "Authorization Code";

export type AuthState = {
  isAuthenticated: boolean;
  shouldRefresh: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
};
