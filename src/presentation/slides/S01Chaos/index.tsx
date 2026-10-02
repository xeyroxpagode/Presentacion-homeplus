import AttentionElement from '../../components/AttentionElement'
import MessageBubble from '../../components/MessageBubble'
import SpokenFragment from '../../components/SpokenFragment'
import document from '../../assets/illustrations/insurance-document.svg'
import groceries from '../../assets/illustrations/grocery-bag.svg'
import fragments from '../../assets/illustrations/information-fragments.svg'
import type { SlideProps } from '../../presentationTypes'

export default function S01Chaos({ stepIndex, active = true }: SlideProps & { active?: boolean }) {
  const saturated = stepIndex === 10
  return (
    <div className="chaos-scene opening-layer" data-active={active} data-step={stepIndex} aria-hidden={!active}>
      <AttentionElement id="insurance" present={stepIndex === 1} x={488} y={158} width={304}
        rotation={-6} fall departed={stepIndex > 1} motion="ENTER">
        <div className="insurance-document">
          <img src={document} alt="" width={304} height={370} draggable={false} />
          <div className="insurance-copy"><span>FACTURA</span><p>Seguro<br />del auto</p></div>
        </div>
      </AttentionElement>
      <AttentionElement id="groceries" present={stepIndex === 2} x={495} y={168} width={290}
        rotation={5} fall departed={stepIndex > 2} motion="REPLACE">
        <img className="grocery-illustration" src={groceries} alt="Bolsa de compras" width={290} height={352} draggable={false} />
      </AttentionElement>
      <AttentionElement id="appointment" present={stepIndex >= 3} x={154} y={152} width={466}
        rotation={-3} secondary={saturated}>
        <MessageBubble>¿A qué hora era el turno?</MessageBubble>
      </AttentionElement>
      <AttentionElement id="dinner" present={stepIndex >= 4} x={754} y={222} width={376} rotation={3}>
        <MessageBubble>¿Hay algo para cenar?</MessageBubble>
      </AttentionElement>
      <AttentionElement id="reminder" present={stepIndex >= 5} x={716} y={72} width={358}
        rotation={-2} secondary={saturated}>
        <SpokenFragment>Después haceme acordar</SpokenFragment>
      </AttentionElement>
      <AttentionElement id="electricity" present={stepIndex >= 6} x={105} y={378} width={366} rotation={2}>
        <MessageBubble>¿Alguien pagó la luz?</MessageBubble>
      </AttentionElement>
      <AttentionElement id="shopping" present={stepIndex >= 7} x={580} y={518} width={444} rotation={-2}>
        <MessageBubble>¿Quién compra lo que falta?</MessageBubble>
      </AttentionElement>
      <AttentionElement id="warranty" present={stepIndex >= 8} x={514} y={352} width={596} rotation={-1}>
        <MessageBubble emphasis>Se rompió la heladera.<br />¿Dónde está la garantía?</MessageBubble>
      </AttentionElement>
      <AttentionElement id="already-done" present={stepIndex >= 9} x={150} y={556} width={324}
        rotation={3} secondary={saturated}>
        <SpokenFragment>Ya lo hice yo</SpokenFragment>
      </AttentionElement>
      <AttentionElement id="fragments" present={saturated} x={88} y={62} width={1104} motion="ACCUMULATE">
        <img className="information-fragments" src={fragments} alt="" aria-hidden="true" width={1104} height={580} draggable={false} />
      </AttentionElement>
    </div>
  )
}
