# Session 8 production-integrity preflight / final check.
# READ-ONLY over production. Writes only under audit/runtime/session-08/_integrity/.
# Scope rule identical to audit/01_RUNTIME_BASELINE.md 14.5 and session-07 tooling:
# every file under package root except node_modules/, audit/, .agents/.

param(
  [string]$Phase = 'preflight'
)

$ErrorActionPreference = 'Stop'
$root   = 'C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL'
$outDir = Join-Path $root 'audit\runtime\session-08\_integrity'
$base   = Join-Path $root 'audit\runtime\session-01\_integrity\manifest-after.csv'

if (-not (Test-Path -LiteralPath $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }

$excludeDirs = @('node_modules', 'audit', '.agents')

$files = Get-ChildItem -LiteralPath $root -Recurse -File -Force | Where-Object {
  $rel = $_.FullName.Substring($root.Length + 1)
  $parts = $rel -split '\\'
  -not ($parts | Where-Object { $excludeDirs -contains $_ })
}

$rows = foreach ($f in $files) {
  $rel = $f.FullName.Substring($root.Length + 1)
  [pscustomobject]@{
    path          = $rel
    length        = $f.Length
    lastWriteUtc  = $f.LastWriteTimeUtc.ToString('o')
    sha256        = (Get-FileHash -LiteralPath $f.FullName -Algorithm SHA256).Hash
  }
}
$rows = $rows | Sort-Object path

$manifest = Join-Path $outDir "manifest-$Phase.csv"
$rows | Export-Csv -LiteralPath $manifest -NoTypeInformation -Encoding UTF8

$totalBytes = ($rows | Measure-Object -Property length -Sum).Sum

Write-Output "PHASE            : $Phase"
Write-Output "FILES            : $($rows.Count)"
Write-Output "BYTES            : $totalBytes"

$baseline = Import-Csv -LiteralPath $base
Write-Output "BASELINE FILES   : $($baseline.Count)"
$bBytes = ($baseline | Measure-Object -Property length -Sum).Sum
Write-Output "BASELINE BYTES   : $bBytes"

$added    = @()
$removed  = @()
$changed  = @()
$lenOnly  = @()
$timeOnly = @()
$identical = 0

$curMap  = @{}
foreach ($r in $rows) { $curMap[$r.path] = $r }
$baseMap = @{}
foreach ($r in $baseline) { $baseMap[$r.path] = $r }

foreach ($p in $curMap.Keys) {
  if (-not $baseMap.ContainsKey($p)) { $added += $p; continue }
  $c = $curMap[$p]; $b = $baseMap[$p]
  if ($c.sha256 -ne $b.sha256) { $changed += $p }
  elseif ([int64]$c.length -ne [int64]$b.length) { $lenOnly += $p }
  if ($c.sha256 -eq $b.sha256 -and $c.lastWriteUtc -eq $b.lastWriteUtc) { $identical++ }
  if ($c.sha256 -eq $b.sha256 -and $c.lastWriteUtc -ne $b.lastWriteUtc) { $timeOnly += $p }
}
foreach ($p in $baseMap.Keys) { if (-not $curMap.ContainsKey($p)) { $removed += $p } }

Write-Output "ADDED            : $($added.Count)"
Write-Output "REMOVED          : $($removed.Count)"
Write-Output "SHA256 CHANGED   : $($changed.Count)"
Write-Output "LENGTH ONLY      : $($lenOnly.Count)"
Write-Output "MTIME ONLY       : $($timeOnly.Count)"
Write-Output "BYTE+MTIME IDENT : $identical / $($rows.Count)"

$verdict = 'PASS'
if ($rows.Count -ne 159 -or $totalBytes -ne 2572474) { $verdict = 'FAIL-BASELINE-MISMATCH' }
if ($added.Count -or $removed.Count -or $changed.Count -or $lenOnly.Count) { $verdict = 'FAIL-CONTENT-DRIFT' }
Write-Output "VERDICT          : $verdict"

if ($added.Count)    { Write-Output "--- ADDED ---";    $added    | ForEach-Object { Write-Output "  $_" } }
if ($removed.Count)  { Write-Output "--- REMOVED ---";  $removed  | ForEach-Object { Write-Output "  $_" } }
if ($changed.Count)  { Write-Output "--- CHANGED ---";  $changed  | ForEach-Object { Write-Output "  $_" } }
if ($lenOnly.Count)  { Write-Output "--- LENONLY ---";  $lenOnly  | ForEach-Object { Write-Output "  $_" } }
if ($timeOnly.Count) { Write-Output "--- TIMEONLY ---"; ($timeOnly | Sort-Object) | ForEach-Object { Write-Output "  $_" } }