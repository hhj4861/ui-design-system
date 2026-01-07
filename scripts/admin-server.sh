#!/bin/bash
# ============================================================
# Admin API 서버 실행 (FastAPI)
#
# Swagger UI: http://localhost:8000/docs
# ReDoc: http://localhost:8000/redoc
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT/backend"

# 환경변수 로드
if [ -f "../.env.local" ]; then
    export $(grep -v '^#' ../.env.local | xargs 2>/dev/null) || true
fi

# 포트 설정
PORT=${ADMIN_PORT:-8000}

echo "🚀 Admin API 서버 시작..."
echo "   Swagger UI: http://localhost:$PORT/docs"
echo "   ReDoc:      http://localhost:$PORT/redoc"
echo ""

# uvicorn 실행
exec uvicorn api.admin:app --reload --host 0.0.0.0 --port $PORT

