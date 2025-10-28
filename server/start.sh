#!/bin/sh

# ===============================================
# Script para iniciar serviços EXTERNOS 
# necessários para o ambiente de desenvolvimento
# ===============================================

set -e

echo "Starting EXTERNAL services"...

# =================================
# Navegar até o diretório do script
# =================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# ===============================
# Carregar variáveis de ambiente
# ===============================
if [ -f ./.env ]; then
    set -a
    . ./.env
    set +a
fi

# ==========================
# Iniciar containers Docker
# ==========================
CMD_DOCKER_COMPOSE="docker compose"
EXEC_CMD_DOCKER_COMPOSE="$CMD_DOCKER_COMPOSE --env-file .env up --build -d"

eval "$EXEC_CMD_DOCKER_COMPOSE"

# ====================================
# Aguardar containers ficarem prontos
# ====================================
counter=0
until $CMD_DOCKER_COMPOSE logs keycloak_auxiliar 2>&1 | grep -q "Keycloak 26.3.3 on JVM (powered by Quarkus 3.20.2.1) started"; do
    echo "Waiting for Keycloak to be fully started: ${counter}s"
    sleep 5
    counter=$((counter + 5))
done
echo "Keycloak container is ready after $counter seconds."

# ====================
# Configurar Keycloak
# ====================
echo "Configuring Keycloak..."
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
"$SCRIPT_DIR"/setup-keycloak.sh
echo "Keycloak setup completed."

echo "All EXTERNAL services started successfully."
