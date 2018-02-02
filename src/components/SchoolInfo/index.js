import { h, Component } from 'preact'

import BalanceGauge from '@components/BalanceGauge/BalanceGauge.jsx'
import _ from './styles.sass'
import colors from '@shared/styles/colors.sass'

export default class SchoolInfo extends Component {

  render (props) {
    const {
      type,
      legal_status,
      address,
      statistics
    } = props.properties

    if (!statistics.Jahrgangsstufen) {

    }

    const {
      'Nichtdeutsche Herkunftssprache': language,
      'Jahrgangsstufen': pupils,
      'Vertretungsunterricht': substitution,
      'Fehlzeiten': misses
    } = statistics

    return <div>
      {type} { legal_status && <span>({legal_status}), </span>}{
        address.street &&
        <span>{address.street}, {address.postcode} {address.city}
          </span>
      }<br />
      {
        pupils &&
        <div>
          {pupils.values.Insgesamt} Schülerinnen und Schüler ({pupils.year})<br />
        </div>
      }
      {
        language &&
        <div>
          <BalanceGauge
            ratio={language.values.Insgesamt / 100}
            text={() => `${language.values.Insgesamt}% nicht-deutscher Herkunftssprache (${language.year})`}/> <br />
        </div>
      }
      {
        misses &&
        <div>
          <BalanceGauge
            ratio={misses.values/100}
            text={()=>`${misses.values}% unentschuldigte Fehlzeiten (${misses.year})`} /><br />
        </div>
      }
      {
        substitution &&
        <div>
          <BalanceGauge
            ratio={substitution.values['Vertretung von Unterricht']/100}
            text={()=>`${substitution.values['Vertretung von Unterricht']}% vertretener Unterricht (${substitution.year})`} /><br />
          <BalanceGauge
            ratio={substitution.values['Ausfall von Unterricht']/100}
            text={()=>`${substitution.values['Ausfall von Unterricht']}% ausgefallener Unterricht (${substitution.year})`} /><br />
        </div>
      }
    </div>
  }
}
