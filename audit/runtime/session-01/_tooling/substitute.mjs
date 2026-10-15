import fs from 'node:fs/promises'
const R='C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit'
const rep=await fs.readFile(R+'/runtime/session-01/data/index-table.md','utf8')
let t=await fs.readFile(R+'/01_RUNTIME_BASELINE.md','utf8')
t=t.replace('{{INDEX_TABLE}}',rep.trim())
if(t.includes('{{')) throw new Error('unsubstituted placeholder remains')
await fs.writeFile(R+'/01_RUNTIME_BASELINE.md',t,'utf8')
console.log('substituted. length='+t.length)