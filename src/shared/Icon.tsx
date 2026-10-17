import type { ReactNode } from 'react'

export type IconName = 'grid' | 'code' | 'briefcase' | 'layers' | 'bookmark' | 'settings' | 'search' | 'bell' | 'arrow' | 'clock' | 'chevron'

const paths: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  code: <><path d="m8 9-3 3 3 3" /><path d="m16 9 3 3-3 3" /><path d="m14 5-4 14" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  bookmark: <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4V4Z" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19 15a2 2 0 0 0 0 2l-1 1a2 2 0 0 0-2 0 2 2 0 0 0-1 2h-2a2 2 0 0 0-1-2 2 2 0 0 0-2 0l-1-1a2 2 0 0 0 0-2 2 2 0 0 0-2-1v-2a2 2 0 0 0 2-1 2 2 0 0 0 0-2l1-1a2 2 0 0 0 2 0 2 2 0 0 0 1-2h2a2 2 0 0 0 1 2 2 2 0 0 0 2 0l1 1a2 2 0 0 0 0 2 2 2 0 0 0 2 1v2a2 2 0 0 0-2 1Z" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
}

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}
