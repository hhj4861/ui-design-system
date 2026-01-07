#!/bin/bash
# ============================================================
# 종목 데이터 관리 스크립트
# 
# 사용법:
#   ./scripts/admin-stock-data.sh [command] [args...]
#
# 명령어:
#   list              - 전체 데이터 조회
#   init              - 기본값으로 초기화
#   add-sector        - 섹터 추가
#   add-alias         - 섹터 유사어 추가
#   add-korean        - 한글→티커 매핑 추가
#   add-etf           - 레버리지 ETF 추가
#   delete-sector     - 섹터 삭제
#   delete-alias      - 섹터 유사어 삭제
#   clear             - 캐시 삭제
#   clear-all         - 전체 캐시 삭제
# ============================================================

set -e

# 프로젝트 루트 경로
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# 환경변수는 python-dotenv에서 로드

# Python 실행 함수
run_python() {
    python3 -c "
import sys
sys.path.insert(0, 'backend')
from dotenv import load_dotenv
load_dotenv('.env.local')
$1
"
}

# 명령어 처리
case "$1" in
    # ===== 조회 =====
    list|ls)
        echo "📊 종목 데이터 조회"
        echo "================================"
        run_python "
from infra.cache import (
    get_leveraged_etf_map,
    get_korean_to_ticker,
    get_popular_stocks,
    get_predefined_sectors,
    get_sector_aliases,
    REDIS_ENABLED,
)

print(f'Redis 활성화: {REDIS_ENABLED}')
print()

etf_map = get_leveraged_etf_map()
print(f'✅ 레버리지 ETF 매핑: {len(etf_map)}개 종목')

kr_map = get_korean_to_ticker()
print(f'✅ 한글→티커 매핑: {len(kr_map)}개 항목')

popular = get_popular_stocks()
print(f'✅ 인기 종목: {len(popular)}개 종목')

sectors = get_predefined_sectors()
print(f'✅ 미리 정의된 섹터: {len(sectors)}개 섹터')
for name in sectors.keys():
    print(f'   - {name}')

aliases = get_sector_aliases()
print(f'✅ 섹터 유사어: {len(aliases)}개 항목')
"
        ;;
    
    # ===== 초기화 =====
    init)
        echo "🔄 기본값으로 초기화"
        run_python "
from infra.cache import initialize_stock_data_cache
result = initialize_stock_data_cache()
print('✅ 초기화 완료!' if result else '❌ 초기화 실패')
"
        ;;
    
    # ===== 섹터 추가 =====
    add-sector)
        if [ -z "$2" ]; then
            echo "사용법: $0 add-sector <섹터명>"
            echo "예: $0 add-sector 원자력"
            exit 1
        fi
        SECTOR_NAME="$2"
        echo "➕ 섹터 추가: $SECTOR_NAME"
        echo "종목 정보를 입력하세요 (완료 시 빈 줄 입력):"
        echo "형식: 티커,이름,시장(KR/US),이유"
        echo "예: OKLO,오클로,US,SMR 선두"
        
        RESULTS="["
        while true; do
            read -p "> " LINE
            [ -z "$LINE" ] && break
            IFS=',' read -r TICKER NAME MARKET REASON <<< "$LINE"
            RESULTS="${RESULTS}{\"ticker\":\"$TICKER\",\"name\":\"$NAME\",\"market\":\"$MARKET\",\"reason\":\"$REASON\"},"
        done
        RESULTS="${RESULTS%,}]"
        
        run_python "
from infra.cache import get_predefined_sectors, set_predefined_sectors
import json

sectors = get_predefined_sectors()
sectors['$SECTOR_NAME'] = {
    'type': 'THEME',
    'query_analysis': '$SECTOR_NAME 테마 관련 주요 종목',
    'results': json.loads('$RESULTS')
}
result = set_predefined_sectors(sectors)
print('✅ 섹터 추가 완료!' if result else '❌ 추가 실패')
"
        ;;
    
    # ===== 섹터 유사어 추가 =====
    add-alias)
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo "사용법: $0 add-alias <유사어> <섹터명>"
            echo "예: $0 add-alias 원전 원자력"
            exit 1
        fi
        ALIAS="$2"
        SECTOR="$3"
        echo "➕ 섹터 유사어 추가: $ALIAS → $SECTOR"
        run_python "
from infra.cache import get_sector_aliases, set_sector_aliases

aliases = get_sector_aliases()
aliases['$ALIAS'] = '$SECTOR'
result = set_sector_aliases(aliases)
print('✅ 유사어 추가 완료!' if result else '❌ 추가 실패')
"
        ;;
    
    # ===== 한글→티커 추가 =====
    add-korean)
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo "사용법: $0 add-korean <한글명> <티커>"
            echo "예: $0 add-korean 팔란티어 PLTR"
            exit 1
        fi
        KOREAN="$2"
        TICKER="$3"
        echo "➕ 한글→티커 추가: $KOREAN → $TICKER"
        run_python "
from infra.cache import add_korean_ticker

result = add_korean_ticker('$KOREAN', '$TICKER')
print('✅ 추가 완료!' if result else '❌ 추가 실패')
"
        ;;
    
    # ===== 레버리지 ETF 추가 =====
    add-etf)
        if [ -z "$2" ]; then
            echo "사용법: $0 add-etf <원본티커>"
            echo "예: $0 add-etf PLTR"
            exit 1
        fi
        BASE_TICKER="$2"
        echo "➕ 레버리지 ETF 추가: $BASE_TICKER"
        echo "ETF 정보를 입력하세요 (완료 시 빈 줄 입력):"
        echo "형식: 티커,이름,타입(2x Long/2x Short)"
        echo "예: PTIR,Defiance 2X Long PLTR ETF,2x Long"
        
        ETFS="["
        while true; do
            read -p "> " LINE
            [ -z "$LINE" ] && break
            IFS=',' read -r TICKER NAME TYPE <<< "$LINE"
            ETFS="${ETFS}{\"ticker\":\"$TICKER\",\"name\":\"$NAME\",\"type\":\"$TYPE\"},"
        done
        ETFS="${ETFS%,}]"
        
        run_python "
from infra.cache import add_leveraged_etf
import json

result = add_leveraged_etf('$BASE_TICKER', json.loads('$ETFS'))
print('✅ ETF 추가 완료!' if result else '❌ 추가 실패')
"
        ;;
    
    # ===== 섹터 삭제 =====
    delete-sector)
        if [ -z "$2" ]; then
            echo "사용법: $0 delete-sector <섹터명>"
            exit 1
        fi
        SECTOR="$2"
        echo "🗑️ 섹터 삭제: $SECTOR"
        run_python "
from infra.cache import get_predefined_sectors, set_predefined_sectors

sectors = get_predefined_sectors()
if '$SECTOR' in sectors:
    del sectors['$SECTOR']
    result = set_predefined_sectors(sectors)
    print('✅ 삭제 완료!' if result else '❌ 삭제 실패')
else:
    print('❌ 섹터를 찾을 수 없습니다: $SECTOR')
"
        ;;
    
    # ===== 유사어 삭제 =====
    delete-alias)
        if [ -z "$2" ]; then
            echo "사용법: $0 delete-alias <유사어>"
            exit 1
        fi
        ALIAS="$2"
        echo "🗑️ 유사어 삭제: $ALIAS"
        run_python "
from infra.cache import get_sector_aliases, set_sector_aliases

aliases = get_sector_aliases()
if '$ALIAS' in aliases:
    del aliases['$ALIAS']
    result = set_sector_aliases(aliases)
    print('✅ 삭제 완료!' if result else '❌ 삭제 실패')
else:
    print('❌ 유사어를 찾을 수 없습니다: $ALIAS')
"
        ;;
    
    # ===== 캐시 삭제 (타입별) =====
    clear)
        echo "🗑️ 캐시 삭제"
        echo ""
        echo "삭제할 캐시 타입 선택:"
        echo "  1) 레버리지 ETF 매핑"
        echo "  2) 한글→티커 매핑"
        echo "  3) 인기 종목"
        echo "  4) 미리 정의된 섹터"
        echo "  5) 섹터 유사어"
        echo "  6) 전체 삭제"
        echo "  0) 취소"
        echo ""
        read -p "선택 (0-6): " CHOICE
        
        case "$CHOICE" in
            1) KEY="leveraged_etf_map"; NAME="레버리지 ETF 매핑" ;;
            2) KEY="korean_to_ticker"; NAME="한글→티커 매핑" ;;
            3) KEY="popular_stocks"; NAME="인기 종목" ;;
            4) KEY="predefined_sectors"; NAME="미리 정의된 섹터" ;;
            5) KEY="sector_aliases"; NAME="섹터 유사어" ;;
            6)
                echo "⚠️ 전체 캐시를 삭제하시겠습니까? (y/N)"
                read -p "> " CONFIRM
                if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
                    run_python "
from infra.cache import clear_stock_data_cache

result = clear_stock_data_cache()
print('✅ 전체 캐시 삭제 완료!' if result else '❌ 삭제 실패')
"
                else
                    echo "취소됨"
                fi
                exit 0
                ;;
            0)
                echo "취소됨"
                exit 0
                ;;
            *)
                echo "❌ 잘못된 선택입니다"
                exit 1
                ;;
        esac
        
        echo "⚠️ '$NAME' 캐시를 삭제하시겠습니까? (y/N)"
        read -p "> " CONFIRM
        if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
            run_python "
from infra.cache import delete_stock_data_cache

result = delete_stock_data_cache('$KEY')
print('✅ 삭제 완료!' if result else '❌ 삭제 실패')
"
        else
            echo "취소됨"
        fi
        ;;
    
    # ===== 전체 캐시 삭제 =====
    clear-all)
        echo "⚠️ 전체 종목 데이터 캐시를 삭제하시겠습니까?"
        echo "   (삭제 후 첫 요청 시 기본값으로 자동 복구됩니다)"
        read -p "진행하려면 'yes' 입력: " CONFIRM
        
        if [ "$CONFIRM" = "yes" ]; then
            run_python "
from infra.cache import clear_stock_data_cache

result = clear_stock_data_cache()
print('✅ 전체 캐시 삭제 완료!' if result else '❌ 삭제 실패')
print('   다음 요청 시 기본값으로 자동 초기화됩니다.')
"
        else
            echo "취소됨"
        fi
        ;;
    
    # ===== 도움말 =====
    help|--help|-h|*)
        echo "📋 종목 데이터 관리 스크립트"
        echo ""
        echo "사용법: $0 [command] [args...]"
        echo ""
        echo "명령어:"
        echo "  list                        전체 데이터 조회"
        echo "  init                        기본값으로 초기화"
        echo "  add-sector <섹터명>          섹터 추가 (대화형)"
        echo "  add-alias <유사어> <섹터명>   섹터 유사어 추가"
        echo "  add-korean <한글명> <티커>   한글→티커 매핑 추가"
        echo "  add-etf <원본티커>           레버리지 ETF 추가 (대화형)"
        echo "  delete-sector <섹터명>       섹터 삭제"
        echo "  delete-alias <유사어>        섹터 유사어 삭제"
        echo "  clear                       캐시 삭제 (대화형)"
        echo "  clear-all                   전체 캐시 삭제"
        echo ""
        echo "예시:"
        echo "  $0 list"
        echo "  $0 init"
        echo "  $0 add-alias 원전 원자력"
        echo "  $0 add-korean 팔란티어 PLTR"
        echo "  $0 clear-all"
        ;;
esac

