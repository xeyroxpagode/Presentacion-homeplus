import type { ReactNode } from 'react'

type HomeIconName = 'home' | 'family' | 'add' | 'calendar' | 'more' | 'search' | 'bell' | 'down' | 'right'

// The same stroke-based icons used by the real Shell and its row chevrons.
const paths: Record<HomeIconName, ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-5H9v5H4a1 1 0 0 1-1-1V10.5Z" />,
  family: <><circle cx="9" cy="8.5" r="3.5" /><circle cx="17" cy="9.5" r="2.5" /><path d="M2.5 20c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5M17 16.5c1.66 0 3 1.34 3 3" /></>,
  add: <path d="M12 5v14M5 12h14" />,
  calendar: <><rect x="3" y="6" width="18" height="15" rx="3" /><path d="M3 11h18M8 4v4M16 4v4" /><g fill="currentColor" stroke="none"><circle cx="8.5" cy="15" r="1" /><circle cx="12" cy="15" r="1" /><circle cx="15.5" cy="15" r="1" /></g></>,
  more: <g fill="currentColor" stroke="none"><circle cx="5.5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="18.5" cy="12" r="1.5" /></g>,
  search: <><circle cx="10" cy="10" r="6.5" /><path d="m15 15 4 4" /></>,
  bell: <><path d="M12 4s-4 2.5-4 7v4l-1 2h10l-1-2v-4c0-4.5-4-7-4-7Z" /><path d="M10.5 17a1.5 1.5 0 0 0 3 0" /></>,
  down: <path d="m7 9 5 5 5-5" />,
  right: <path d="m9 6 6 6-6 6" />,
}

export default function HomeIcon({ name, size = 24 }: { name: HomeIconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={name === 'add' ? 2.1 : 1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
