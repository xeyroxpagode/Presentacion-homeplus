$ErrorActionPreference = 'Stop'
$root = 'C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL'
$map  = Import-Csv -LiteralPath (Join-Path $root 'audit\08_CINEMATIC_ENHANCEMENT_MAP.csv')

# ---------- canonical registry: CN -> RC ----------
$reg = 'C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\audit\00_CANONICAL_ISSUE_REGISTRY.md'
$cn2rc = @{}
foreach ($l in (Get-Content -LiteralPath $reg)) {
  $c = ($l -replace '\s+',' ').Trim()
  if ($c.StartsWith('| CN-')) {
    $f = $c -split '\|'
    $id = ($f[2] -replace '\*','').Trim()
    $sev= ($f[5] -replace '\*','').Trim()
    $st = ($f[6] -replace '\*','').Trim()
    $rc = ($f[7] -replace '\*','').Trim()
    if ($sev -eq 'BLOCKER' -and $st -eq 'ACTIVE') { $cn2rc[$id] = $rc }
  }
}
"ACTIVE BLOCKERS parsed: $($cn2rc.Count)"

# ---------- beat -> canonical ID (one-to-many) ----------
$beatCn = @{
  'B04'=@('B-01'); 'B05'=@('B-01'); 'B06'=@('B-01')
  'A12'=@('A-02')
  'A08'=@('A-03'); 'A09'=@('A-03'); 'A10'=@('A-03'); 'A11'=@('A-03')
  'D01'=@('D-01')
  'C06'=@('C-01')
  'C01'=@('C-02'); 'C02'=@('C-02'); 'C07'=@('C-02')
  'E06'=@('E-04')
  'D06'=@('D-09')
  'C05'=@('C-11/D-10'); 'D05'=@('C-11/D-10')
  'H01'=@('H-01'); 'H04'=@('H-01')
  'G01'=@('G-01'); 'G02'=@('G-01'); 'G03'=@('G-01'); 'G04'=@('G-01')
  'G05'=@('G-01'); 'G06'=@('G-01'); 'G07'=@('G-01'); 'G08'=@('G-01'); 'G09'=@('G-01')
  'F01'=@('F-01'); 'F02'=@('F-01'); 'F03'=@('F-01')
  'H02'=@('H-02'); 'H03'=@('H-02')
  'G05x'=@()
  'H05'=@('H-04')
  'H06'=@('H-04')
  'G05b'=@()
  'G03v'=@()
  'G08x'=@('G-12')
  'G09x'=@('G-15')
  'J02'=@('J-01'); 'J03'=@('J-01'); 'J04'=@('J-01'); 'J05'=@('J-01')
  'J06'=@('J-01'); 'J07'=@('J-01'); 'J08'=@('J-01'); 'J09'=@('J-01')
  'J10'=@('J-01'); 'J11'=@('J-01'); 'J12'=@('J-01'); 'J13'=@('J-01')
  'I04'=@('I-01'); 'I05'=@('I-01')
  'I06'=@('I-02')
  'I08'=@('I-03'); 'I15'=@('I-03')
  'I14'=@('I-04'); 'I16'=@('I-04')
  'I13'=@('I-05')
  'I11'=@('I-06'); 'I12'=@('I-06')
}
$beatCn.Remove('G05x'); $beatCn.Remove('G05b'); $beatCn.Remove('G03v'); $beatCn.Remove('G08x'); $beatCn.Remove('G09x')

# G-12 = the unsafe AI sentence -> G08 ; G-15 = recomposition -> G09
$beatCn['G08'] = @('G-01','G-12')
$beatCn['G09'] = @('G-01','G-15')
# G-02 = five logos before naming -> G05,G06,G07 ; G-03 = frontend explained with no frontend -> G02
foreach ($b in @('G05','G06','G07')) { $beatCn[$b] = @('G-01','G-02') }
foreach ($b in @('G03','G04')) { $beatCn[$b] = @('G-01','G-04') }
$beatCn['G02'] = @('G-01','G-03')
$beatCn['G04'] = @('G-01','G-04','G-05')
$beatCn['H03'] = @('H-02','H-05')
$beatCn['H02'] = @('H-02','H-05')

"beats mapped to blockers: $($beatCn.Keys.Count)"

# ---------- family-level (global) tests ----------
# id | family | requirement | method | pass_criteria | phase | automation | evidence | beats
$global = @(
@('T-VIS-01','VISUAL','All 111 target beats exist and are reachable in press order','Walk S01 to S18 forward; count reachable stable states','count === 111 and press order matches map column start_beat','10','AUTOMATED','state-count log + 111 screenshots',''),
@('T-VIS-02','VISUAL','The expected subject is the immediate top salience of every beat','Per beat: compare subject exposure against every other painted element','subject exposure is strictly the maximum; no competing headline in the stage band','10','AUTOMATED','per-beat exposure ledger','A01-A17 B01-B22 C01-C07 D01-D06 E01-E07 F01-F05 G01-G09 H01-H07 I01-I17 J01-J14'),
@('T-VIS-03','VISUAL','No narration is duplicated on stage','Per beat: text census against the script line for that beat','0 beats where the spoken line appears verbatim as stage text','10','AUTOMATED','text-diff log','A06 D02 D03 D04 D05 F03 F04 B17 I07 I12 I13'),
@('T-VIS-04','VISUAL','Device anatomy is unchanged while a shared element travels','Sample .phone-frame / .phone-frame-screen rects at 0/160/320/640 ms','all three rects byte-identical across every sample','8','AUTOMATED','rect transcript',''),
@('T-VIS-05','VISUAL','No beat paints a brand mark before the A14 reveal','Sweep A01 to A13 for any third-party or HomePlus logo element','0 logo nodes found','3','AUTOMATED','DOM node census','A01-A13'),
@('T-VIS-06','VISUAL','Brand orange on stage is exactly #E7643F','Computed-style sweep of every coloured element','every orange resolves to rgb(231,100,63); zero occurrences of #E65C1B','10','AUTOMATED','computed-style dump',''),
@('T-NAV-01','OPERABILITY','A repeated keydown cannot skip a protected HOLD','Hold ArrowRight at 30 presses/s for 10 s at each of the 12 protected beats','the beat does not change while the key is held','11','AUTOMATED','event log with timestamps',''),
@('T-NAV-02','OPERABILITY','A mis-press inside the 600 ms guard is a no-op','Press ArrowRight 50 ms after arrival at each of the 12 protected beats','state object identity is unchanged; no visual delta','11','AUTOMATED','state-identity log',''),
@('T-NAV-03','OPERABILITY','A press after the guard advances normally','Wait 700 ms then press ArrowRight at each of the 12 protected beats','exactly one advance','11','AUTOMATED','state log',''),
@('T-NAV-04','OPERABILITY','navigate() is pure with an injected clock','Unit test: call navigate() with a fixed now; assert no Date.now inside','all rules unit-testable; 0 Date.now references in navigate','1','AUTOMATED','unit test report','T-NAV-04 T-NAV-05 T-NAV-06 T-NAV-07'),
@('T-NAV-05','OPERABILITY','No AUTO sequence can orphan the deck','Fire ArrowRight mid-flight on each of the 31 AUTO beats','sequence lands on its final stable state; deck remains navigable','11','AUTOMATED','flight log',''),
@('T-NAV-06','OPERABILITY','Esc recovers from any beat','Press Escape from a random beat, 30 repetitions','each press restores lastManual and cancels any flight','11','AUTOMATED','state log',''),
@('T-NAV-07','OPERABILITY','At most one advance is queued during a flight','Fire 3 rapid presses during one AUTO flight','exactly one queued advance consumed; the following press is ignored','11','AUTOMATED','event log',''),
@('T-NAV-08','OPERABILITY','ArrowLeft at a boundary is a no-op','Press ArrowLeft at the first beat of each of the 18 scenes','state unchanged; no animation starts','11','AUTOMATED','state log',''),
@('T-NAV-09','OPERABILITY','Terminal state holds indefinitely','Navigate to the final beat and wait 60 s','no advance, no animation, no drift','11','AUTOMATED','state log',''),
@('T-BAK-01','BACK','ArrowLeft restores the prior stable beat index','Backward walk S18 to S01','all 110 transitions restore the previous beat','9','AUTOMATED','backward state log',''),
@('T-BAK-02','BACK','ArrowLeft restores every painted element to its prior geometry','Rect census of all painted elements before and after each backward transition','max delta 0 px on all axes','9','AUTOMATED','rect transcript',''),
@('T-BAK-03','BACK','ArrowLeft leaves zero residual inline transforms','Computed inline-style census of every hidden subtree after each backward transition','0 elements with a residual inline transform','9','AUTOMATED','inline-style census',''),
@('T-BAK-04','BACK','ArrowLeft never reverse-plays a forward animation','Inspect the animation direction flag at every backward transition','0 animations with a negative playbackRate or reverse()','9','AUTOMATED','animation-direction log',''),
@('T-BAK-05','BACK','ArrowLeft during a shared flight re-attaches the object to its ORIGIN','Cancel a shared flight mid-travel with ArrowLeft, for all 13 crossings','object is re-attached at the origin; 0 detached copies','9','AUTOMATED','DOM census',''),
@('T-BAK-06','BACK','The S18 residue defect (07 18.5) is closed','Backward walk, inline-transform census at every step','0 residual inline transforms; this is the currently-failing requirement','9','AUTOMATED','census + defect report',''),
@('T-BAK-07','BACK','ArrowLeft never leaves a duplicate device','Device census at every backward transition','exactly 1 device except at I06 and I13, where it is exactly 2','9','AUTOMATED','device census',''),
@('T-BAK-08','BACK','Backward and forward settled frames are identical','Diff the settled screenshot of every beat reached forward vs backward','0 differing pixels','9','AUTOMATED','111-pair pixel diff',''),
@('T-PER-01','PERFORMANCE','Every one of the 31 AUTO sequences holds 60 FPS','Profile each sequence 3x under 4x CPU throttle','no frame exceeds 16.7 ms; no visible dropped frame','11','AUTOMATED','frame-time transcripts',''),
@('T-PER-02','PERFORMANCE','No transition triggers an avoidable layout','Layout-count census during all 110 transitions','0 layouts caused by width/height/margin/padding/font-size','11','AUTOMATED','layout-count log',''),
@('T-PER-03','PERFORMANCE','No large-area paint beyond the animated rect','Paint-area census during all 110 transitions','painted area <= animated bounding rect + 20%','11','AUTOMATED','paint-area log',''),
@('T-PER-04','PERFORMANCE','No animation-iteration-count: infinite anywhere','Computed-style sweep at all 111 settled states','0 infinite iterations','11','AUTOMATED','computed-style dump',''),
@('T-PER-05','PERFORMANCE','will-change is absent at every settled state','Computed-style sweep at all 111 settled states','0 will-change declarations','11','AUTOMATED','computed-style dump',''),
@('T-PER-06','PERFORMANCE','No transition: all remains in the codebase','Source grep','0 occurrences','1','AUTOMATED','grep transcript',''),
@('T-PER-07','PERFORMANCE','@property --phone-scale interpolates','Toggle --phone-scale 1.00 to 1.08 and sample the computed value mid-transition','computed value is strictly between 1.00 and 1.08','1','AUTOMATED','sampled values',''),
@('T-PER-08','PERFORMANCE','120 Hz headroom is measured, not assumed','Profile the 1400 ms sequences at 120 Hz','report the measured outcome; no claim without a transcript','11','MANUAL','120 Hz transcript',''),
@('T-PER-09','PERFORMANCE','Scene memory does not grow across a full film run','Heap snapshot at S01 and at J14','no unbounded growth attributable to presentation state','11','AUTOMATED','heap diff',''),
@('T-RMO-01','REDUCED MOTION','Reduced motion produces the same semantic state with no time-based motion','Enable prefers-reduced-motion:reduce; walk all 111 beats','0 animations created; every beat still readable and semantically equivalent','11','AUTOMATED','reduced-motion walk log',''),
@('T-RMO-02','REDUCED MOTION','No blanket !important duration override survives','Source grep of index.css','0 blanket animation/transition !important blocks','1','AUTOMATED','grep transcript',''),
@('T-RMO-03','REDUCED MOTION','I06 still shows the task inside Planner','Reduced-motion walk of I05 to I07','the landed task is visible; execution is still proven','11','AUTOMATED','screenshot',''),
@('T-RMO-04','REDUCED MOTION','I13 shows both surfaces simultaneously','Reduced-motion walk of I12 to I14','HomePlus surface and Homi surface both visible','11','AUTOMATED','screenshot',''),
@('T-RMO-05','REDUCED MOTION','A12 and J01 still hold','Reduced-motion arrival at A12 and J01','both remain black and hold; the hold is not time-dependent','11','AUTOMATED','state log',''),
@('T-RMO-06','REDUCED MOTION','J11 still leaves the family unmoved','Reduced-motion walk of J10 to J12','family geometry signature unchanged','11','AUTOMATED','geometry signature',''),
@('T-ENG-01','STATE ENGINE','Every stable state is unchanged after 10 s','Snapshot at t0 and t10 s at all 111 beats','0 differing pixels','9','AUTOMATED','111-pair pixel diff',''),
@('T-ENG-02','STATE ENGINE','Every stable state is unchanged after 30 s','Snapshot at t0 and t30 s at all 111 beats','0 differing pixels','9','AUTOMATED','111-pair pixel diff',''),
@('T-ENG-03','STATE ENGINE','Zero running animations at every settled state','getAnimations() census at all 111 settled states','0 running animations at each of the 111 beats','9','AUTOMATED','animation census',''),
@('T-ENG-04','STATE ENGINE','No stable state is driven by a timer','Source inspection of every beat definition','0 setTimeout or setInterval in beat sequencing','9','AUTOMATED','source grep',''),
@('T-ENG-05','STATE ENGINE','The 12 protected beats hold with no automatic advance','Wait 60 s at each of the 12 protected beats','no advance; state identical','9','AUTOMATED','state log',''),
@('T-ENG-06','STATE ENGINE','HOLD length is the speaker, not the clock','Compare observed hold duration with the mapped spoken length','no auto-advance; hold ends only on press','9','AUTOMATED','state log',''),
@('T-ENG-07','STATE ENGINE','All 18 scenes are permanently mounted','DOM census of .scene-layer children','exactly 18 children present at every beat','1','AUTOMATED','DOM census',''),
@('T-ENG-08','STATE ENGINE','No scene is keyed or unmounted on change','Source inspection of the scene section','0 key props; 0 unmount events','1','AUTOMATED','source grep',''),
@('T-ENG-09','STATE ENGINE','Exactly one veil element exists','DOM census of veil-layer','exactly 1 element; it is never re-mounted','1','AUTOMATED','DOM census',''),
@('T-ENG-10','STATE ENGINE','shared-layer holds at most 2 objects','Census of shared-layer children at every sampled instant','count <= 2','9','AUTOMATED','DOM census',''),
@('T-ENG-11','STATE ENGINE','Derived state is consistent after any action sequence','Property-based test over 1000 random action sequences','no invariant violation','11','AUTOMATED','property test report',''),
@('T-ENG-12','STATE ENGINE','stepCount always equals beats.length','Unit test over every SlideDefinition','equality holds for all 18 scenes','1','AUTOMATED','unit test report',''),
@('T-ENG-13','STATE ENGINE','No scene branches on a raw stepIndex number','Source inspection of all 18 scenes','0 comparisons against a numeric stepIndex','1','AUTOMATED','source grep',''),
@('T-MOT-01','MOTION','Global motion budget: no transition exceeds the section 2.3 mover count','Dev-mode assertion during all 110 transitions','0 violations of ordinary<=2 shared<=3 device<=2 reset=1 J11=3','2','AUTOMATED','budget assertion log',''),
@('T-MOT-X01','MOTION GLOBAL','Micro emphasis: out and back inside one token','Frame-sample 5 micro beats','scale returns to 1.00; total duration = micro token','10','AUTOMATED','frame samples',''),
@('T-MOT-X02','MOTION GLOBAL','Enter/exit primitives travel exactly 12 px','Frame-sample all enter and exit beats','|translateY| === 12 px at the start frame','10','AUTOMATED','frame samples',''),
@('T-MOT-X03','MOTION GLOBAL','Exposure shifts change opacity only','Computed-property diff across every exposure beat','only opacity changed; no layout-affecting property','10','AUTOMATED','property diff',''),
@('T-MOT-X04','MOTION GLOBAL','Device moves change transform only','Computed-property diff across every spatial beat','only transform on the slot changed','10','AUTOMATED','property diff',''),
@('T-MOT-X05','MOTION GLOBAL','Scene F shows at most 3 relation links','Census of link elements at F02','link count <= 3','4','AUTOMATED','link census','F02'),
@('T-MOT-X06','MOTION GLOBAL','Scene G holds a real device in all 9 states','Device census at G01 to G09','phoneCount >= 1 in every state','5','AUTOMATED','device census','G01-G09'),
@('T-MOT-X07','MOTION GLOBAL','The S13 to S14 boundary replays nothing','Animation census across the boundary','0 entering and 0 exiting; 0 replayed entrances','5','AUTOMATED','animation census',''),
@('T-MOT-X08','MOTION GLOBAL','Token durations are within +/- 1 frame','Frame-sample every beat against its map duration_ms','observed duration within 16.7 ms of the declared value','10','AUTOMATED','frame samples',''),
@('T-MOT-X09','MOTION GLOBAL','Curve direction is correct','Compare the measured easing against the token curve','no overshoot beyond the declared curve family','10','AUTOMATED','curve samples',''),
@('T-MOT-X10','MOTION GLOBAL','Stagger is inside the 30-90 ms band','Census of stagger_ms across all beats','every non-zero stagger is within 30-90 ms','10','AUTOMATED','map audit',''),
@('T-MOT-X11','MOTION GLOBAL','No AUTO sequence exceeds the 1400 ms envelope','Frame-sample all 31 AUTO sequences','max observed duration <= 1400 ms','10','AUTOMATED','frame samples',''),
@('T-MOT-X12','MOTION GLOBAL','Micro-settle window is present and bounded','Frame-sample the micro-settle on shared arrivals','settle window between 400 and 640 ms','10','AUTOMATED','frame samples','')
)

# ---------- root causes with no ACTIVE BLOCKER row: attach to explicit tests ----------
# RC-id -> extra acceptance test ids that must carry it
$rcExtra = @{
  'RC-03' = @('T-VIS-03','T-TRU-37','T-TRU-38','T-TRU-39','T-TRU-40','T-TRU-41','T-TRU-42','T-TRU-43')
  'RC-08' = @('T-MOT-X07','T-ENG-04','T-BAK-04')
  'RC-10' = @('T-VIS-06','T-TRU-01','T-TRU-02','T-ENG-06')
  'RC-11' = @('T-TRU-20','T-TRU-21','T-TRU-39','T-TRU-40','T-TRU-41')
  'RC-12' = @('T-SEM-15','T-SEM-16','T-SEM-17','T-SEM-18')
  'RC-15' = @('T-ENG-08','T-ENG-09','T-BAK-03')
  'RC-17' = @('T-TRU-24','T-TRU-25','T-TRU-26','T-TRU-27')
}

$famOf = @{
  'T-VIS'='VISUAL'; 'T-NAV'='OPERABILITY'; 'T-BAK'='BACK'; 'T-PER'='PERFORMANCE'
  'T-RMO'='REDUCED MOTION'; 'T-MOT'='MOTION'; 'T-STA'='STATE'
  'T-GEO'='GEOMETRY'; 'T-SEM'='SHARED ELEMENT'; 'T-TRU'='PRODUCT TRUTH'
}

# ---------- beat-level tests derived from the map ----------
$byTest = @{}
foreach ($r in $map) {
  $t = $r.acceptance_test
  if (-not $byTest.ContainsKey($t)) { $byTest[$t] = New-Object System.Collections.Generic.List[object] }
  $byTest[$t].Add($r)
}

$rows = New-Object System.Collections.Generic.List[object]

# global rows first
foreach ($g in $global) {
  $rows.Add([pscustomobject]@{
    test_id=$g[0]; family=$g[1]; requirement=$g[2]; method=$g[3]
    pass_criteria=$g[4]; phase=$g[5]; automation=$g[6]; evidence=$g[7]
    beat_scope=$g[8]; scene_scope=''; root_cause_ids=''; canonical_blockers=''; map_row_ref=''
  })
}

# beat-level rows
foreach ($t in ($byTest.Keys | Sort-Object)) {
  $rs = $byTest[$t]
  $beats = ($rs | ForEach-Object { $_.beat_id })
  $scenes = ($rs | ForEach-Object { $_.scene } | Sort-Object -Unique)
  $cns = @(); $rcs = @()
  foreach ($b in $beats) {
    if ($beatCn.ContainsKey($b)) {
      foreach ($cn in $beatCn[$b]) {
        if ($cn2rc.ContainsKey($cn)) {
          $cns += $cn
          $rcs += $cn2rc[$cn]
        }
      }
    }
  }
  $r0 = $rs[0]
  $pref = ($t -split '-')[1]
  $fam = $famOf["T-$pref"]
  $rows.Add([pscustomobject]@{
    test_id = $t
    family = $fam
    requirement = ("[" + $r0.scene + "] " + $r0.semantic_purpose + " | ATTENTION: " + $r0.primary_attention + " | HARD LIMIT: " + $r0.hard_limit)
    method = "Navigate to the beat and compare against the map row: geometry '$($r0.start_geometry)' -> '$($r0.end_geometry)'; token $($r0.base_motion_token) $($r0.duration_ms) ms; trigger $($r0.trigger)"
    pass_criteria = "map stable_hold='$($r0.stable_hold)'; reduced='$($r0.reduced_motion_fallback)'; back='$($r0.back_restore)' all hold; composition matches the blueprint scene spec"
    phase = (& { switch -Regex ($t) { '^T-TRU' {10} '^T-SEM' {8} '^T-GEO' {10} '^T-MOT' {10} '^T-STA' {9} default {10} } })
    automation = 'AUTOMATED'
    evidence = "screenshot pair + rect transcript + animation census at $($beats -join ',')"
    beat_scope = ($beats -join ' ')
    scene_scope = ($scenes -join ' ')
    root_cause_ids = (($rcs | Sort-Object -Unique) -join ' ')
    canonical_blockers = (($cns | Sort-Object -Unique) -join ' ')
    map_row_ref = ("08_CINEMATIC_ENHANCEMENT_MAP.csv rows: " + ($rs | ForEach-Object { $_.beat_id }))
  })
}

foreach ($rc in $rcExtra.Keys) {
  foreach ($t in $rcExtra[$rc]) {
    $row = $rows | Where-Object { $_.test_id -eq $t } | Select-Object -First 1
    if ($null -eq $row) { Write-Warning "rcExtra: no such test $t for $rc"; continue }
    $cur = @()
    if ($row.root_cause_ids) { $cur = $row.root_cause_ids -split ' ' }
    if ($cur -notcontains $rc) { $cur += $rc }
    $row.root_cause_ids = (($cur | Sort-Object -Unique) -join ' ')
  }
}

$cols = @('test_id','family','requirement','beat_scope','scene_scope','root_cause_ids','canonical_blockers','method','pass_criteria','evidence','phase','automation','map_row_ref')
$rows = $rows | Sort-Object @{Expression={ ($_.test_id -split '-')[0] }}, @{Expression={ $s=($_.test_id -split '-')[-1]; $n=($s -replace '\D',''); if($n){[int]$n}else{9999} }}, @{Expression={ ($_.test_id -split '-')[-1] }}

$out = Join-Path $root 'audit\08_ACCEPTANCE_TEST_MATRIX.csv'
$rows | Select-Object $cols | Export-Csv -LiteralPath $out -NoTypeInformation -Encoding UTF8

"rows written: $($rows.Count)"
$out