import { createContext } from "react";
import Keycloak from "keycloak-js";
import type { KeycloakUser } from "../types";

export interface AuthContextType {
  keycloak: Keycloak | null;
  authenticated: boolean;
  profile: KeycloakUser | null,
  loading: boolean,
  login: () => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({
  keycloak: null,
  authenticated: false,
  profile: null,
  loading: false,
  login: () => {},
  logout: () => {},
  refreshToken: async () => false,
});
