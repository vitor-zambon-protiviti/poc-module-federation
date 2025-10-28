
declare module 'shell/auth' {
  import type Keycloak from "keycloak-js";
  import type { ReactNode, FC } from "react";

  interface KeycloakUser {
    sub: string;
    name?: string;
    preferred_username?: string;
    given_name?: string;
    family_name?: string;
    email?: string;
    [key: string]: any;
  }

  interface AuthContextType {
    keycloak: Keycloak | null;
    authenticated: boolean;
    profile: KeycloakUser | null;
    loading: boolean;
    login: () => void;
    logout: () => void;
    refreshToken: () => Promise<boolean>;
  }

  export const AuthProvider: FC<{ children: ReactNode; onLoad?: "check-sso" | "login-required" }>;
  export const useAuth: () => AuthContextType;
}
