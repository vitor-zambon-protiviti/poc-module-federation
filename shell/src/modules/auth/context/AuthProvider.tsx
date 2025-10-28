// src/context/AuthProvider.tsx
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { initKeycloak, keycloak } from "../services/keycloak";
import type { KeycloakUser } from "../types";

// Tipagem para as opções do AuthProvider
interface AuthProviderProps {
  children: React.ReactNode;
  onLoad?: "check-sso" | "login-required"; // valor padrão será check-sso
}

let initializing = false;

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  onLoad = "check-sso", // padrão
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [profile, setProfile] = useState<KeycloakUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initializing) return;
    initializing = true;

    (async () => {
      try {
        await initKeycloak(onLoad); // passa o tipo recebido como prop

        const isAuthenticated = keycloak.authenticated ?? false;
        setAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          const userInfo = await keycloak.loadUserInfo();
          setProfile(userInfo as KeycloakUser);
        }

        keycloak.onTokenExpired = async () => {
          try {
            await keycloak.updateToken(30);
          } catch {
            keycloak.logout();
          }
        };
      } catch (err) {
        console.error("Erro ao inicializar Keycloak:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [onLoad]);

  const login = () => keycloak.login();
  const logout = () => keycloak.logout();
  const refreshToken = async () => {
    try {
      return await keycloak.updateToken(30);
    } catch {
      keycloak.logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        keycloak,
        authenticated,
        profile,
        login,
        logout,
        refreshToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
