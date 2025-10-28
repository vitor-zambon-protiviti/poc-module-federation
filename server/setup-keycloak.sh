#!/bin/sh

# ==============================
# Script: setup-keycloak.sh
# ==============================

# ==============================
# Função para atualizar ou adicionar variável no .env
# ==============================
update_env_var() {
    ENV_FILE=$1   # caminho do arquivo .env
    VAR_NAME=$2   # nome da variável
    VAR_VALUE=$3  # valor da variável

    awk -v key="$VAR_NAME" -v val="$VAR_VALUE" '
    BEGIN {found=0}
    {
      if ($0 ~ "^" key "=") {
        print key "=" val
        found=1
      } else {
        print $0
      }
    }
    END {
      if (found == 0) print key "=" val
    }' "$ENV_FILE" > "${ENV_FILE}.tmp" && mv "${ENV_FILE}.tmp" "$ENV_FILE"
}


# Configurações
KEYCLOAK_SERVER="http://localhost:8080"
ADMIN_USER="admin"
ADMIN_PASS="password"

DOCKER_CMD="docker compose -f docker-compose.yml exec -T keycloak_auxiliar"

#  Login no admin-cli
$DOCKER_CMD /opt/keycloak/bin/kcadm.sh config credentials \
    --server "$KEYCLOAK_SERVER" \
    --realm master \
    --user "$ADMIN_USER" \
    --password "$ADMIN_PASS"

# ==============================
# Criar Realm Protiviti
# ==============================
REALM_NAME='protiviti'

REALM_EXISTS=$($DOCKER_CMD /opt/keycloak/bin/kcadm.sh get realms | sed -n "/\"realm\" *: *\"$REALM_NAME\"/p")

if [ -n "$REALM_EXISTS" ]; then
  echo "Realm '$REALM_NAME' já existe"
else
  echo "Criando realm '$REALM_NAME'..."
  $DOCKER_CMD /opt/keycloak/bin/kcadm.sh create realms \
  -s realm="$REALM_NAME" \
  -s enabled=true \
  -s accessTokenLifespan=86400 \
  -s ssoSessionIdleTimeout=86400 \
  -s ssoSessionMaxLifespan=86400 \
  -s loginWithEmailAllowed=true \
  -s registrationEmailAsUsername=true
fi

# ==============================
# Criar client client-admin (service accounts + direct access)
# ==============================
CLIENT_ID_ADMIN="client-admin"
CLIENT_UUID_ADMIN=$($DOCKER_CMD /opt/keycloak/bin/kcadm.sh get clients -r "$REALM_NAME" -q clientId="$CLIENT_ID_ADMIN" | sed -n 's/.*"id" *: *"\([^"]*\)".*/\1/p')

if [ -n "$CLIENT_UUID_ADMIN" ]; then
  echo "Client '$CLIENT_ID_ADMIN' já existe"
else
  echo "Criando client '$CLIENT_ID_ADMIN'..."
  $DOCKER_CMD /opt/keycloak/bin/kcadm.sh create clients \
    -r "$REALM_NAME" \
    -s clientId="$CLIENT_ID_ADMIN" \
    -s enabled=true \
    -s publicClient=false \
    -s serviceAccountsEnabled=true \
    -s directAccessGrantsEnabled=true \
    -s standardFlowEnabled=false

  # Atualiza o UUID após criação
  CLIENT_UUID_ADMIN=$($DOCKER_CMD /opt/keycloak/bin/kcadm.sh get clients -r "$REALM_NAME" -q clientId="$CLIENT_ID_ADMIN" | sed -n 's/.*"id" *: *"\([^"]*\)".*/\1/p')

  # ==============================
  # Atribuir roles ao client client-admin
  # ==============================
  SERVICE_ACCOUNT_ID=$($DOCKER_CMD /opt/keycloak/bin/kcadm.sh get clients/$CLIENT_UUID_ADMIN/service-account-user -r "$REALM_NAME" | sed -n 's/.*"id" *: *"\([^"]*\)".*/\1/p')
  echo "Service account ID do client $CLIENT_ID_ADMIN: $SERVICE_ACCOUNT_ID"

  $DOCKER_CMD /opt/keycloak/bin/kcadm.sh add-roles -r "$REALM_NAME" \
    --uid $SERVICE_ACCOUNT_ID \
    --cclientid realm-management \
    --rolename manage-realm \
    --rolename manage-users \
    --rolename query-users

  echo "✅ Roles 'manage-realm', 'manage-users' e 'query-users' atribuídas ao client '$CLIENT_ID_ADMIN'"
fi

# ==============================
# Obter UUID e secret do client client-admin
# ==============================
CLIENT_SECRET_JSON_ADMIN=$($DOCKER_CMD /opt/keycloak/bin/kcadm.sh get clients/$CLIENT_UUID_ADMIN/client-secret -r "$REALM_NAME")
CLIENT_SECRET_ADMIN=$(echo "$CLIENT_SECRET_JSON_ADMIN" | sed -n 's/.*"value" *: *"\([^"]*\)".*/\1/p')

echo "Client '$CLIENT_ID_ADMIN' UUID: $CLIENT_UUID_ADMIN"
echo "Client '$CLIENT_ID_ADMIN' Secret: $CLIENT_SECRET_ADMIN"

# ==============================
# Atualizar variáveis no .env
# ==============================
ENV_FILE=".env"

update_env_var "$ENV_FILE" "KEYCLOAK_CLIENT_UUID" "$CLIENT_UUID_ADMIN"
update_env_var "$ENV_FILE" "KEYCLOAK_CLIENT_SECRET" "$CLIENT_SECRET_ADMIN"

echo "✅ Variáveis KEYCLOAK_CLIENT_UUID e KEYCLOAK_CLIENT_SECRET atualizadas no .env"

# ==============================
# Criar client auth-app (standard flow)
# ==============================
CLIENT_ID_APP="auth-app"
CLIENT_UUID_APP=$($DOCKER_CMD /opt/keycloak/bin/kcadm.sh get clients -r "$REALM_NAME" -q clientId="$CLIENT_ID_APP" | sed -n 's/.*"id" *: *"\([^"]*\)".*/\1/p')

if [ -n "$CLIENT_UUID_APP" ]; then
  echo "Client '$CLIENT_ID_APP' já existe"
else
  echo "Criando client '$CLIENT_ID_APP'..."
  $DOCKER_CMD /opt/keycloak/bin/kcadm.sh create clients \
    -r "$REALM_NAME" \
    -s clientId="$CLIENT_ID_APP" \
    -s enabled=true \
    -s publicClient=true \
    -s standardFlowEnabled=true \
    -s directAccessGrantsEnabled=false \
    -s serviceAccountsEnabled=false \
    -s "redirectUris=[\"$(echo "$KEYCLOAK_REDIRECT_URIS" | sed 's/,/","/g')\"]"
fi
