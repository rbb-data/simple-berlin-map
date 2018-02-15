import { h } from 'preact'
import colors from '@shared/styles/colors.sass'
import _ from './BalanceGauge.styles.sass'

/**
 * Renders an info gauge that's useful for visualizing balances between two dimesions:
 * You can imagine it like this:
 *
 *        ⌄
 *     --------   {{here comes a user defined text}}
 *
 * @param {Number}    ratio Number between 0 and 1
 * @param {Function}  text  Function that gets passed the current ratio and
 *                          should return descriptive text.
 */

const BalanceGauge = ({ class: className, ratio, text, barColors }) => {
  barColors = barColors || [colors.red, colors.lightGrey]

  return <div class={`${_.balanceGauge} ${className}`}>
    <span class={_.text}>{text(ratio)}</span>
    <div class={_.bar} aria-hidden='true'>
      <div class={_.leftBarPart}
        style={{ width: `${ratio * 100}%`, background: barColors[0] }} />
      <div class={_.rightBarPart}
        style={{ width: `${(1 - ratio) * 100}%`, background: barColors[1] }} />
      {/* <div class={style.caret} style={{ left: `${ratio * 100}%` }} /> */}
    </div>
  </div>
}

export default BalanceGauge
