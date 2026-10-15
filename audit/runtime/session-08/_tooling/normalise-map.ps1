# Session 8 tooling: normalise the cinematic enhancement map source (pipe-delimited)
# into the exact 41-column CSV. The three premium_modifier slots are allowed to
# contain extra "NONE — STILLNESS IS THE DESIGN." repeats; this collapses that
# single run back to exactly 3 fields. READ-ONLY over the source.

$ErrorActionPreference = 'Stop'
$tool = 'C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\audit\runtime\session-08\_tooling'
$src  = Join-Path $tool '08_map.psv'
$out  = 'C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\audit\08_CINEMATIC_ENHANCEMENT_MAP.csv'

$STILL = 'NONE — STILLNESS IS THE DESIGN.'
$COLS  = 41
function Is-Still([string]$v) { return $v -like '*STILLNESS IS THE DESIGN*' }

function Convert-Fields([string]$line) {
  $f = @($line -split '\|')
  if ($f.Count -eq $COLS) { return $f }
  if ($f.Count -lt $COLS) { throw "row too short: $($f[0]) has $($f.Count)" }

  # premium_modifier_1..3 occupy indices 18,19,20. Any STILL entry at index >= 21 is
  # a duplicated padding entry authored into the source; drop it until the row is exact.
  $res = @($f)
  $i = 21
  while ($res.Count -gt $COLS) {
    if (-not (Is-Still $res[$i])) { throw "row $($f[0]): overflow at index $i is not a STILL entry -> $($res[$i])" }
    $res = @($res[0..($i - 1)] + $res[($i + 1)..($res.Count - 1)])
  }
  if ($res.Count -lt $COLS) { throw "row $($f[0]): rebuilt to $($res.Count) columns" }
  return $res
}

$lines = @()
foreach ($srcFile in @($src, (Join-Path $tool '08_map_cj.psv'))) {
  $lines += [System.IO.File]::ReadAllLines($srcFile)
}
$header = @($lines[0] -split '\|')
if ($header.Count -ne $COLS) { throw "header has $($header.Count) columns" }

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine(($header | ForEach-Object { '"' + ($_ -replace '"','""') + '"' }) -join ',')

$seen = @{}
foreach ($line in $lines[1..($lines.Count - 1)]) {
  if ([string]::IsNullOrWhiteSpace($line)) { continue }
  $f = Convert-Fields $line
  if ($seen.ContainsKey($f[0])) { throw "duplicate beat_id $($f[0])" }
  $seen[$f[0]] = $true
  [void]$sb.AppendLine(($f | ForEach-Object { '"' + ($_ -replace '"','""') + '"' }) -join ',')
}

[System.IO.File]::WriteAllText($out, $sb.ToString(), (New-Object System.Text.UTF8Encoding($false)))
Write-Output "ROWS WRITTEN : $($seen.Count)"
Write-Output "OUTPUT       : $out"