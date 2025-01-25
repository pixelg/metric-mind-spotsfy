import { createContext } from "react";

type AuthProfileProps = {
  userName: string;
  accessToken?: string;
  refreshToken?: string;
  profilePhoto?: string
}

const initialValues: AuthProfileProps = {
  userName: 'Brent',
  accessToken: null!,
  refreshToken: null!,
  profilePhoto: null!,
}

export const AuthProfileContext = createContext<AuthProfileProps>(initialValues)