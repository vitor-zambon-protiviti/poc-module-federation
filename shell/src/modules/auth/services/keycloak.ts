import Keycloak from "keycloak-js";

// --- Persistência global da instância ---
declare global {
  interface Window {
    __KEYCLOAK_INSTANCE__?: Keycloak;
    __KEYCLOAK_INITIALIZED__?: boolean;
  }
}

// --- Cria ou reutiliza o singleton ---
export const keycloak =
  window.__KEYCLOAK_INSTANCE__ ??
  new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  });

// --- Salva a instância global (para HMR/Fast Refresh) ---
window.__KEYCLOAK_INSTANCE__ = keycloak;

/**
 * Inicializa o Keycloak de forma idempotente.
 * Pode ser chamada múltiplas vezes sem reinicializar a instância.
 */
export async function initKeycloak(
  onLoad: "check-sso" | "login-required" = "check-sso"
) {
  if (window.__KEYCLOAK_INITIALIZED__) return keycloak;

  try {
    await keycloak.init({
      onLoad,
      pkceMethod: "S256",
      checkLoginIframe: true,
    });
    window.__KEYCLOAK_INITIALIZED__ = true;
  } catch (err) {
    console.error("Erro ao inicializar Keycloak:", err);
  }

  return keycloak;
}
