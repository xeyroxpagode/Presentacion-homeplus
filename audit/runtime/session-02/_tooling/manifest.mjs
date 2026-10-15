import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

// Integrity manifest for the presentation package.
// Scope: every file under the package root EXCEPT node_modules/, audit/, .agents/
// (same scope Session 1 used, so the two manifests are comparable).
const ROOT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL'
const OUT = process.argv[2]
const EXCLUDE_DIRS = new Set(['node_modules', 'audit', '.agents'])

const rows = []
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue
      walk(path.join(dir, entry.name))
    } else if (entry.isFile()) {
      const full = path.join(dir, entry.name)
      const st = fs.statSync(full)
      const hash = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex')
      rows.push([path.relative(ROOT, full).replace(/\\/g, '/'), st.size, st.mtime.toISOString(), hash].join(','))
    }
  }
}
walk(ROOT)
const header = 'path,bytes,mtimeUtc,sha256'
fs.writeFileSync(OUT, `${header}\n${rows.join('\n')}\n`, 'utf8')
console.log(`MANIFEST=${OUT} FILES=${rows.length} BYTES=${rows.reduce((a, r) => a + Number(r.split(',')[1]), 0)}`)