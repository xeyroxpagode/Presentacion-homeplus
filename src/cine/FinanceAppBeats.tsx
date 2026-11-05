import type { CSSProperties, ReactNode } from 'react'
import { financeTabs } from '../presentation/app-screens/FinanceDemoScreen/financeData'
import { financeStory } from '../presentation/app-screens/FinanceDemoScreen/financeStoryData'
import './finance-app-beats.css'

function Card({ title, children, hidden }: { title: string; children: ReactNode; hidden?: boolean }) {
  return <article className="s09-app-card" aria-hidden={hidden}><h2>{title}</h2>{children}</article>
}

function Row({ title, detail, value }: { title: string; detail?: string; value: string }) {
  return <div className="s09-app-row"><div><strong>{title}</strong>{detail && <small>{detail}</small>}</div><b>{value}</b></div>
}

export default function FinanceAppBeats({ beat, onAdvance }: { beat: number; onAdvance?: () => void }) {
  const tab = beat <= 2 ? 'Movimientos' : beat === 3 ? 'Pagos' : 'Resumen'
  const { purchase, recent, summary } = financeStory
  return (
    <div className="s09-app" data-beat={beat}>
      <header><h1>Finanzas</h1><span><em>Hogar</em> · Familia García <i aria-hidden="true">⌄</i></span></header>
      <div className="s09-app-tabs" aria-label="Secciones de Finanzas" style={{ '--tab-index': financeTabs.indexOf(tab) } as CSSProperties}>
        {financeTabs.map(item => <span key={item} aria-current={item === tab ? 'page' : undefined}>{item}</span>)}
      </div>
      <div className="s09-app-content" key={tab}>
        {beat <= 2 && <>
          <div className="s09-app-tools"><span className="s09-period">Octubre 2026</span><div><b>Todos</b><span>Gastos</span><span>Ingresos</span><span>Transferencias</span></div></div>
          <div className="s09-app-grid s09-app-movements" data-split={beat === 2}>
            <Card title="Movimientos recientes">
              <div className="s09-app-selected"><small className="s09-app-date">Hoy</small><Row title={purchase.title} detail="Compras · Mercado Pago" value={purchase.movementAmount} /></div>
              {recent.slice(1).map(row => <Row key={row.id} title={row.title} detail={row.meta} value={row.amount} />)}
            </Card>
            <Card title="Detalle del movimiento" hidden={beat !== 2}>
              <Row title={purchase.title} value={purchase.movementAmount} />
              <Row title="Cuenta o tarjeta" value="Mercado Pago" />
              <Row title="Categoría" value="Compras" />
            </Card>
          </div>
        </>}
        {beat === 3 && <div className="s09-app-grid s09-app-payments" data-split="true">
          <Card title="Próximos"><Row title="Luz" detail="Vence en 5 días" value="Pendiente" /></Card>
          <Card title="Pagados"><Row title="Internet" detail="Pago registrado" value="Pagado" /></Card>
        </div>}
        {beat === 4 && <>
          <div className="s09-app-tools"><span className="s09-period">Octubre 2026</span><span>Resumen › Límites de gasto</span></div>
          <Card title="Límites de gasto">
            <Row title="Compras" detail={`${summary.featuredLabel} de $30.000 · Mensual`} value={`${Math.round(purchase.total / 30000 * 100)}% usado`} />
            <progress aria-label="Límite mensual de compras" max={30000} value={purchase.total} />
          </Card>
        </>}
        {beat >= 5 && <>
          <div className="s09-app-tools"><span className="s09-period">Octubre 2026</span>{beat === 6 && <span>Resumen › Análisis</span>}</div>
            <Card title="Gastos del mes">
              <div className="s09-analysis" data-expanded={beat === 6}>
              <div>
              <p className="s09-app-total">{summary.totalLabel}</p>
              {beat === 5 ? <button type="button" className="s09-app-hint" onClick={onAdvance}>Ver análisis →</button> : <p className="s09-app-hint">Total de todas las categorías</p>}
              </div>
              <section className="s09-analysis-detail" aria-hidden={beat !== 6}>
                <h3>Gastos por categoría</h3>
              {summary.categories.map(category => (
                <div key={category.id} className="s09-app-category" data-featured={category.id === 'compras'}>
                  <Row title={category.name} value={category.label} />
                  <progress aria-label={category.name} max={summary.total} value={category.amount} />
                </div>
              ))}
              </section>
              </div>
            </Card>
        </>}
      </div>
      <p className="s09-app-note">{financeStory.note}</p>
    </div>
  )
}
