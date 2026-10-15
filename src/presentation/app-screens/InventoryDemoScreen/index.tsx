import HomeHeader from '../HomeDemoScreen/HomeHeader'
import { homeVariables } from '../HomeDemoScreen/homeTokens'
import InventoryNavigation from './InventoryNavigation'
import { inventoryFilters, inventoryProducts, shoppingSummary } from './inventoryData'
import '../HomeDemoScreen/home-screen.css'
import './inventory-screen.css'

export default function InventoryDemoScreen({ focusShortages = false }: { focusShortages?: boolean }) {
  return (
    <div className="home-demo-screen inventory-demo-screen" style={homeVariables}
      data-focus-shortages={focusShortages} aria-label="Inventario HomePlus">
      <HomeHeader showJuli />
      <div className="inventory-workspace">
        <header className="inventory-heading"><h1>Inventario</h1></header>
        <div className="inventory-filters" role="tablist" aria-label="Filtros de inventario">
          {inventoryFilters.map(filter => (
            <span key={filter} className="inventory-filter" role="tab"
              aria-selected={filter === 'Todos'}>{filter}</span>
          ))}
        </div>
        <div className="inventory-card">
          {inventoryProducts.map(product => (
            <div key={product.id} className="inventory-row" data-shortage={product.status !== 'ok'} data-highlight={!!product.spotlight} data-dim={!product.spotlight}>
              <span className="inventory-tile" aria-hidden="true">{product.name.charAt(0)}</span>
              <div className="inventory-row-copy">
                <p className="inventory-row-title">{product.name}</p>
                <p className="inventory-row-meta">{product.place} · {product.qty}</p>
              </div>
              {product.statusLabel && (
                <span className={`inventory-status inventory-status-${product.status}`}>{product.statusLabel}</span>
              )}
            </div>
          ))}
        </div>
        <div className="inventory-shopping">
          <div className="inventory-row-copy">
            <p className="inventory-row-title">{shoppingSummary.title}</p>
            <p className="inventory-row-meta">{shoppingSummary.subtitle}</p>
          </div>
          <span className="inventory-count" aria-label={`${shoppingSummary.count} productos`}>{shoppingSummary.count}</span>
        </div>
      </div>
      <InventoryNavigation />
      <div className="home-system-indicator" aria-hidden="true" />
    </div>
  )
}
