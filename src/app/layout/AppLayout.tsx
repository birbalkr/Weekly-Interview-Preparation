import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useState, type FormEvent } from 'react'
import { Icon, type IconName } from '../../shared/Icon'

const navigation: { label: string; icon: IconName; path: string }[] = [
  { label: 'Overview', icon: 'grid', path: '/' },
  { label: 'Question tracker', icon: 'bookmark', path: '/questions' },
]

export function AppLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const active = location.pathname === '/' ? 'Overview' : 'Question tracker'
  const [search, setSearch] = useState('')
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(`/questions${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''}`)
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><span /></div><span>Prep<span className="brand-accent">ly</span></span></div>
      <div className="workspace-label">Workspace</div>
      <nav className="main-nav" aria-label="Main navigation">
        {navigation.map((item) => <button type="button" title={item.label} className={`nav-item nav-item-${item.label.toLowerCase().replaceAll(' ', '-')} ${active === item.label ? 'active' : ''}`} key={item.label} onClick={() => navigate(item.path)}><Icon name={item.icon} /><span className="nav-label">{item.label}</span>{item.label === 'Question tracker' && <span className="nav-count">24</span>}</button>)}
      </nav>
      <div className="sidebar-bottom">
        <button type="button" title="Saved questions" className="nav-item" onClick={() => navigate('/questions?status=Saved')}><Icon name="bookmark" /><span className="nav-label">Saved questions</span></button>
        <button type="button" title="Settings" className="nav-item" onClick={() => navigate('/settings')}><Icon name="settings" /><span className="nav-label">Settings</span></button>
        <div className="sidebar-divider" />
        <div className="profile"><div className="avatar">AK</div><div><strong>Alex Kumar</strong><small>Keep going, Alex!</small></div><Icon name="chevron" size={15} /></div>
      </div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{active}</strong></div><div className="top-actions"><form className="search-box" onSubmit={submitSearch}><Icon name="search" size={17} /><input aria-label="Search questions" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search questions..." /></form><button type="button" className="icon-button notification" aria-label="Notifications" onClick={() => navigate('/questions')}><Icon name="bell" size={19} /><i /></button><button type="button" className="top-avatar" aria-label="Open profile settings" onClick={() => navigate('/settings')}>AK</button></div></header>
      {children}
    </main>
  </div>
}
