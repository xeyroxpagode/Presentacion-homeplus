#!/usr/bin/env bash
# QA estático HOMIE V7: verifica contratos sin runtime Node.
# Lo NO VERIFICABLE aquí (build, typecheck, navegador, grabación continua)
# se declara en docs/homi-v7/qa-report.md, nunca como PASS.
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
V7="$ROOT/src/presentation/slides/homi-cinema-v7"
FAIL=0
pass() { echo "[PASS] $1 $2"; }
fail() { echo "[FAIL] $1 $2"; FAIL=$((FAIL+1)); }

DATA="$(cat "$V7/homiV7Data.ts")"
STAGE="$(cat "$V7/HomiV7Stage.tsx")"
CSS="$(cat "$V7/homi-v7.css")"
BENJA="$(cat "$V7/BenjaShots.tsx")"
GABY="$(cat "$V7/GabyShots.tsx")"
CONFIG="$(cat "$ROOT/src/presentation/presentationConfig.ts")"

# E01: distribución 7/6/14.
case "$DATA" in
  *"S15_BEATS: readonly HomiV7Beat[] = ['B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07']"*) A=1;; *) A=0;; esac
case "$DATA" in
  *"S16_BEATS: readonly HomiV7Beat[] = ['B08', 'B09', 'B10', 'B11', 'B12', 'B13']"*) B=1;; *) B=0;; esac
case "$DATA" in
  *"'G14', 'G15', 'G16', 'G17', 'G18', 'G19', 'G20',"*) C=1;; *) C=0;; esac
case "$DATA" in
  *"'G21', 'G22', 'G23', 'G24', 'G25', 'G26', 'G27',"*) D=1;; *) D=0;; esac
[ "$A$B$C$D" = "1111" ] && pass E01 "S15=B01–B07 S16=B08–B13 S17=G14–G27" || fail E01 "mapeo de beats ($A$B$C$D)"

# E02: stepCounts del registry = 7/6/14.
case "$CONFIG" in *"{ id: 'S15', name: 'HOMI Action', stepCount: 7"*) A=1;; *) A=0;; esac
case "$CONFIG" in *"{ id: 'S16', name: 'HOMI Context', stepCount: 6"*) B=1;; *) B=0;; esac
case "$CONFIG" in *"{ id: 'S17', name: 'Human Control', stepCount: 14"*) C=1;; *) C=0;; esac
[ "$A$B$C" = "111" ] && pass E02 "S15=7 S16=6 S17=14" || fail E02 "stepCounts"

# E03: 27 ramas + 27 labels.
MISSB=0; MISSL=0
for BEAT in B01 B02 B03 B04 B05 B06 B07 B08 B09 B10 B11 B12 B13 G14 G15 G16 G17 G18 G19 G20 G21 G22 G23 G24 G25 G26 G27; do
  case "$STAGE" in *"case '$BEAT':"*) ;; *) MISSB=$((MISSB+1)); echo "  rama faltante: $BEAT";; esac
  case "$STAGE" in *"$BEAT:"*) ;; *) MISSL=$((MISSL+1)); echo "  label faltante: $BEAT";; esac
done
[ "$MISSB$MISSL" = "00" ] && pass E03 "27 ramas + 27 labels" || fail E03 "ramas=$MISSB labels=$MISSL"

# E04: negro absoluto B13.
case "$CSS" in *".v7-black"*"background: #000;"*) pass E04 "B13 #000000";; *) fail E04 "negro";; esac

# E05: determinismo.
case "$DATA$STAGE$BENJA$GABY" in
  *"Date.now"*|*"Math.random"*|*"fetch("*|*"localStorage"*|*"setInterval"*) fail E05 "no determinista";; *) pass E05 "sin reloj/azar/red";; esac

# E06: alcance (stage+shots no tocan otras escenas ni inventan producto).
case "$STAGE$BENJA$GABY" in
  *"S14Barrier"*|*"S01Chaos"*|*"S18Closing"*|*"PhoneFrame"*|*"birthday"*|*"Cumple"*) fail E06 "fuga de alcance";; *) pass E06 "sin fugas";; esac

# E06b: V6 fuera del runtime (ningún slide activo la importa).
if grep -rq "homi-cinema-v6" "$ROOT/src/presentation/slides/S15HomiAction" "$ROOT/src/presentation/slides/S16HomiContext" "$ROOT/src/presentation/slides/S17HumanControl" 2>/dev/null; then
  fail E06b "V6 aún importada"
else
  pass E06b "V6 fuera del runtime"
fi

# L02: mensaje Coca único y normalizado.
case "$DATA" in *"Haceme acordar de ir mañana a comprar una Coca"*) pass L02 "mensaje único";; *) fail L02 "mensaje";; esac

# L08: una sola Coca (definición única + morph apunta al mismo id).
[ "$(grep -o "id: 'coca-homi-v7'" "$V7/homiV7Data.ts" | wc -l)" = "1" ] && pass L08 "una sola Coca" || fail L08 "Coca duplicada"
case "$STAGE" in *'coca-homi-v7'*) pass L08b "morph→misma fila";; *) fail L08b "morph sin destino";; esac

# L05: Cancelar + Confirmar visibles en propuesta.
grep -q "homi-dismiss" "$V7/BenjaShots.tsx" && grep -q "homi-confirm" "$V7/BenjaShots.tsx" \
  && pass L05 "Cancelar+Confirmar" || fail L05 "decisión"

# L12: recuerdo B12 sin botones operativos.
AFTER="${BENJA##*V7FrozenMemory\(\)}"
case "$AFTER" in *"<button"*) fail L12 "recuerdo con button";; *) pass L12 "recuerdo no operativo";; esac

# L15: pregunta única.
[ "$(grep -o "¿Qué me queda para mañana?" "$V7/homiV7Data.ts" | wc -l)" = "1" ] && pass L15 "pregunta única" || fail L15 "pregunta"

# L16: fecha demo congelada.
grep -q "D1_ISO = '2026-08-17'" "$V7/homiV7Data.ts" && pass L16 "D1 congelada" || fail L16 "D1"

# L19: tres perfiles.
grep -q "profileById('tomi')" "$V7/HomiV7Stage.tsx" && grep -q "profileById('juli')" "$V7/HomiV7Stage.tsx" && grep -q "profileById('papa')" "$V7/HomiV7Stage.tsx" \
  && pass L19 "tres perfiles" || fail L19 "perfiles"

# V7a: papá sin seguro/importe inventado como compromiso personal.
case "$DATA" in *"Seguro"*|*"62.800"*|*"62,800"*) fail V7a "papá con seguro";; *) pass V7a "papá sin seguro";; esac

# V7b: Tomi con Coca como contexto compartido (no responsabilidad asignada).
case "$DATA" in *"Hogar · Compartida · Mañana"*) pass V7b "Coca compartida en Tomi";; *) fail V7b "contexto Tomi";; esac

# V7c: un único viewport contextual (sin tres teléfonos simultáneos).
grep -q "V7ContextViewport" "$V7/GabyShots.tsx" && pass V7c "viewport único" || fail V7c "viewport"
GABY_CODE="$(sed 's|/\*.*\*/||g' "$V7/GabyShots.tsx")"
case "$GABY_CODE" in *"data-active={focus ==="*|*"V6ContextModules"*) fail V7c2 "triple simultáneo";; *) pass V7c2 "sin triple";; esac

# V7d: B07 y B08 comparten composición integrada (continuidad S15→S16).
case "$STAGE" in *"case 'B07':"*"case 'B08':"*) pass V7d "B07/B08 integrados";; *) fail V7d "continuidad";; esac

# L21: ready + exit contract.
grep -q 'data-homi-v7-ready="true"' "$V7/GabyShots.tsx" && grep -q "HOMI_V7_EXIT_CONTRACT" "$V7/homiV7Data.ts" \
  && pass L21 "exit contract" || fail L21 "handoff"

# C01/C02: sin infinitas ni prohibidos (código y reglas, no comentarios).
case "$CSS" in *"infinite"*) fail C01 "animación permanente";; *) pass C01 "sin infinitas";; esac
CSS_CODE="$(grep -v '^[[:space:]]*\*' "$V7/homi-v7.css")"
case "$CSS_CODE$STAGE" in *"elastic"*|*"particle"*|*"parallax"*|*"Three"*) fail C02 "prohibidos";; *) pass C02 "sin prohibidos";; esac

echo "---"
if [ "$FAIL" = "0" ]; then echo "STATIC QA V7: ALL PASS"; else echo "STATIC QA V7: $FAIL FAILURES"; fi
exit "$FAIL"
