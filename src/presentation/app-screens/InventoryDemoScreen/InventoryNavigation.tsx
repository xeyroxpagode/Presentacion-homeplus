import HomeIcon from '../HomeDemoScreen/HomeIcon'

export default function InventoryNavigation() {
  return (
    <nav className="home-navigation" aria-label="Navegación de HomePlus">
      <div className="home-navigation-pill">
        <span className="home-navigation-item" role="img" aria-label="Home"><HomeIcon name="home" /></span>
        <span className="home-navigation-item" role="img" aria-label="Familia"><HomeIcon name="family" /></span>
        <span className="home-navigation-add" role="img" aria-label="Crear"><HomeIcon name="add" size={22} /></span>
        <span className="home-navigation-item" role="img" aria-label="Planner"><HomeIcon name="calendar" /></span>
        <span className="home-navigation-item home-navigation-current" role="img" aria-label="Más, seleccionado"><HomeIcon name="more" /></span>
      </div>
    </nav>
  )
}
