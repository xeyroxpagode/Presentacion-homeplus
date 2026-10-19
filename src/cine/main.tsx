import React from 'react'
import ReactDOM from 'react-dom/client'
import CineApp from './CineApp'
import '../index.css'
import './cine.css'
import { themeVariables } from '../presentation/design-system/tokens'
import { motionVariables } from '../presentation/motion/motionTokens'

for (const [name, value] of Object.entries({ ...themeVariables, ...motionVariables })) {
  document.documentElement.style.setProperty(name, value)
}

document.documentElement.lang = 'es'
document.title = 'HOMePLUS — Apertura cinematográfica'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CineApp />
  </React.StrictMode>,
)
