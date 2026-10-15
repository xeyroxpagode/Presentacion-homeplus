import HomeIcon from './HomeIcon'

export default function HomeHeader({ showJuli }: { showJuli: boolean }) {
  return (
    <>
      <div className="home-status-bar" aria-hidden="true">
        <span>9:41</span>
        <span className="home-camera" />
        <svg width="42" height="12" viewBox="0 0 42 12" fill="currentColor">
          <rect x="0" y="7" width="2" height="5" rx="0.5" /><rect x="4" y="5" width="2" height="7" rx="0.5" />
          <rect x="8" y="3" width="2" height="9" rx="0.5" /><rect x="12" y="1" width="2" height="11" rx="0.5" />
          <rect x="20" y="1" width="18" height="10" rx="3" fill="none" stroke="currentColor" opacity=".35" />
          <rect x="22" y="3" width="13" height="6" rx="1.5" /><path d="M40 4v4a2 2 0 0 0 0-4Z" opacity=".4" />
        </svg>
      </div>
      <header className="home-top-bar">
        <div className="home-account" data-person-focus={showJuli} aria-label="Perfil de Juli">
          <span className="home-user-avatar" aria-hidden="true">J</span>
          <span className="home-user-name">Juli</span>
        </div>
        <div className="home-household"><span>Familia García</span><HomeIcon name="down" size={14} /></div>
        <span className="home-shell-action" role="img" aria-label="Buscar"><HomeIcon name="search" size={22} /></span>
        <span className="home-shell-action" role="img" aria-label="Avisos"><HomeIcon name="bell" size={22} /></span>
      </header>
    </>
  )
}
