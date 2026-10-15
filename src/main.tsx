import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { themeVariables } from './presentation/design-system/tokens'
import { motionVariables } from './presentation/motion/motionTokens'

for (const [name, value] of Object.entries({ ...themeVariables, ...motionVariables })) {
  document.documentElement.style.setProperty(name, value)
}

document.documentElement.lang = 'es'
document.title = 'HomePlus'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
