import HomeHeader from '../HomeDemoScreen/HomeHeader'
import HomeIcon from '../HomeDemoScreen/HomeIcon'
import { homeVariables } from '../HomeDemoScreen/homeTokens'
import FinanceNavigation from './FinanceNavigation'
import { financeCategories, financeHero, financePayments, financeTabs } from './financeData'
import '../HomeDemoScreen/home-screen.css'
import './finance-screen.css'

export default function FinanceDemoScreen() {
  return (
    <div className="home-demo-screen finance-demo-screen" style={homeVariables} aria-label="Finanzas HomePlus">
      <HomeHeader showJuli />
      <div className="finance-workspace">
        <header className="finance-heading"><h1>Finanzas</h1></header>
        <div className="finance-scope"><span>Familia García</span><HomeIcon name="down" size={12} /></div>
        <div className="finance-tabs" role="tablist" aria-label="Secciones de Finanzas">
          {financeTabs.map(tab => (
            <span key={tab} className="finance-tab" role="tab" aria-selected={tab === 'Resumen'}>{tab}</span>
          ))}
        </div>
        <div className="finance-hero">
          <p className="finance-hero-scope">{financeHero.scope}</p>
          <p className="finance-hero-balance">{financeHero.balance}</p>
          <p className="finance-hero-baseline">{financeHero.baseline}</p>
        </div>
        <h2 className="finance-section-label">Pagos próximos</h2>
        <div className="finance-card">
          {financePayments.map(payment => (
            <div key={payment.id} className="finance-payment-row">
              <div className="finance-row-copy">
                <p className="finance-row-title">{payment.title}</p>
                <p className="finance-row-meta" data-overdue={!!payment.overdue} data-paid={!!payment.paid}>{payment.dueLabel}</p>
              </div>
              <p className="finance-amount">{payment.amount}</p>
            </div>
          ))}
        </div>
        <h2 className="finance-section-label">Por categoría</h2>
        <div className="finance-categories">
          {financeCategories.map(category => (
            <div key={category.id} className="finance-category">
              <div className="finance-category-head">
                <p className="finance-row-title">{category.name}</p>
                <p className="finance-amount">{category.amount}</p>
              </div>
              <div className="finance-bar" aria-hidden="true">
                <span style={{ width: `${category.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <FinanceNavigation />
      <div className="home-system-indicator" aria-hidden="true" />
    </div>
  )
}
