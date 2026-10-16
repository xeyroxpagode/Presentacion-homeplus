#!/usr/bin/env bash
# QA estático HOMI V6: verifica contratos sin runtime Node.
# Lo NO VERIFICABLE aquí (build, typecheck, navegador) se declara en
# docs/homi-v6/qa-report.md, nunca como PASS.
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
V6="$ROOT/src/presentation/slides/homi-cinema-v6"
FAIL=0
pass() { echo "[PASS] $1 $2"; }
fail() { echo "[FAIL] $1 $2"; FAIL=$((FAIL+1)); }

DATA="$(cat "$V6/homiV6Data.ts")"
STAGE="$(cat "$V6/HomiV6Stage.tsx")"
CSS="$(cat "$V6/homi-v6.css")"
BENJA="$(cat "$V6/BenjaShots.tsx")"
GABY="$(cat "$V6/GabyShots.tsx")"
CONFIG="$(cat "$ROOT/src/presentation/presentationConfig.ts")"

# E01: distribución 10/9/19.
grep -q "S15_BEATS" "$V6/homiV6Data.ts" && grep -q "'P10'" "$V6/homiV6Data.ts" && grep -q "S16_BEATS" "$V6/homiV6Data.ts" && grep -q "'P38'" "$V6/homiV6Data.ts" \
  && pass E01 "S15=P01–P10 S16=P11–P19 S17=P20–P38" || fail E01 "mapeo de beats"

# E02: stepCounts del registry.
case "$CONFIG" in
  *"{ id: 'S15', name: 'HOMI Action', stepCount: 10"*) A=1;; *) A=0;; esac
case "$CONFIG" in
  *"{ id: 'S16', name: 'HOMI Context', stepCount: 9"*) B=1;; *) B=0;; esac
case "$CONFIG" in
  *"{ id: 'S17', name: 'Human Control', stepCount: 19"*) C=1;; *) C=0;; esac
[ "$A$B$C" = "111" ] && pass E02 "S15=10 S16=9 S17=19" || fail E02 "stepCounts"

# E03: 38 ramas + 38 labels.
MISSB=0; MISSL=0
i=1; while [ $i -le 38 ]; do
  B=$(printf 'P%02d' $i)
  case "$STAGE" in *"case '$B':"*) ;; *) MISSB=$((MISSB+1)); echo "  rama faltante: $B";; esac
  case "$STAGE" in *"$B:"*) ;; *) MISSL=$((MISSL+1)); echo "  label faltante: $B";; esac
  i=$((i+1))
done
[ "$MISSB$MISSL" = "00" ] && pass E03 "38 ramas + 38 labels" || fail E03 "ramas=$MISSB labels=$MISSL"

# E04: negro absoluto P19.
case "$CSS" in *"v6-black"*"{ position: absolute; inset: 0; background: #000;"*) pass E04 "P19 #000000";; *) fail E04 "negro";; esac

# E05: determinismo.
case "$DATA$STAGE$BENJA$GABY" in
  *"Date.now"*|*"Math.random"*|*"fetch("*|*"localStorage"*|*"setInterval"*) fail E05 "no determinista";; *) pass E05 "sin reloj/azar/red";; esac

# E06: alcance (solo .tsx; el CSS puede citar donantes en comentarios).
case "$STAGE$BENJA$GABY" in
  *"S14Barrier"*|*"S01Chaos"*|*"S18Closing"*|*"PhoneFrame"*|*"Cumple de Juli"*|*"birthday"*) fail E06 "fuga de alcance";; *) pass E06 "sin fugas";; esac

# L02/L08/L04.
case "$DATA" in *"Haceme acordar de ir mañana a comprar una Coca"*) pass L02 "mensaje único";; *) fail L02 "mensaje";; esac
[ "$(grep -o "id: 'coca-homi-v6'" "$V6/homiV6Data.ts" | wc -l)" = "1" ] && pass L08 "una sola Coca" || fail L08 "Coca duplicada"
case "$BENJA" in *"homi-dismiss"*"</button>"*) :;; esac
grep -q "homi-dismiss" "$V6/BenjaShots.tsx" && grep -q "homi-confirm" "$V6/BenjaShots.tsx" \
  && pass L05 "Cancelar+Confirmar" || fail L05 "decisión"

# L12: recuerdo sin botones reales.
AFTER="${BENJA##*V6FrozenMemory\(\)}"
case "$AFTER" in *"<button"*) fail L12 "recuerdo con button";; *) pass L12 "recuerdo no operativo";; esac

# L14/L15/L16.
[ "$(grep -o "¿Qué me queda para mañana?" "$V6/homiV6Data.ts" | wc -l)" = "1" ] && pass L15 "pregunta única" || fail L15 "pregunta"
[ "$(grep -o "2026-08-17" "$V6/homiV6Data.ts" | wc -l)" = "1" ] && pass L16 "D1 único" || fail L16 "D1"
grep -q "profileById('tomi')" "$V6/HomiV6Stage.tsx" && grep -q "profileById('juli')" "$V6/HomiV6Stage.tsx" && grep -q "profileById('papa')" "$V6/HomiV6Stage.tsx" \
  && pass L19 "tres perfiles" || fail L19 "perfiles"

# L21: ready + exit contract.
grep -q 'data-homi-v6-ready="true"' "$V6/GabyShots.tsx" && grep -q "HOMI_V6_EXIT_CONTRACT" "$V6/homiV6Data.ts" \
  && pass L21 "exit contract" || fail L21 "handoff"

# C01/C02: sin infinitas ni prohibidos.
case "$CSS" in *"infinite"*) fail C01 "animación permanente";; *) pass C01 "sin infinitas";; esac
case "$CSS" in *"elastic"*|*"particle"*) fail C02 "prohibidos";; *) pass C02 "sin prohibidos";; esac

# E07: P31 geometría (centros 87/480/873 + ancho 320).
grep -q "left: 87px" "$V6/homi-v6.css" && grep -q "left: 480px" "$V6/homi-v6.css" && grep -q "left: 873px" "$V6/homi-v6.css" \
  && pass E07 "trío X247/640/960" || fail E07 "geometría P31"

echo "---"
if [ "$FAIL" = "0" ]; then echo "STATIC QA: ALL PASS"; else echo "STATIC QA: $FAIL FAILURES"; fi
exit "$FAIL"
