import { h, Component } from 'preact'

import BalanceGauge from '@components/BalanceGauge/BalanceGauge.jsx'
import _ from './styles.sass'
import colors from '@shared/styles/colors.sass'

export default class SchoolInfo extends Component {

  render (props) {
    const {
      name,
      schultyp,
      straße,
      plz,
      ort,
      öffentlich_privat,
    anzahl_schüeler,
    anzahl_schueler_jahr,
    anteil_schülerinnen,
    anteil_schüler,
    anteil_geschlecht_jahr,
    anteil_nicht_deutscher_herkunftsprache,
    anteil_nicht_deutscher_herkunftsprache_jahr,
    fehlzeiten_unentschuldigt_in_prozent,
    vertretung_von_unterricht_in_prozent,
    fehlzeiten_vertretung_jahr,
    ausfall_von_unterricht_in_prozent,
    ausfall_von_unterricht_in_prozent_jahr} = props.properties

    return <div>
      {schultyp} ({öffentlich_privat}), {straße}, {plz} {ort}<br />
      {anzahl_schüeler} Schülerinnen und Schüler (20{anzahl_schueler_jahr})<br />
      {/*<BalanceGauge*/}
        {/*ratio={anteil_schülerinnen/100}*/}
        {/*text={()=>`${anteil_schülerinnen}% weiblich (Schuljahr ${anteil_geschlecht_jahr})`} /><br />*/}
      <BalanceGauge
        ratio={anteil_nicht_deutscher_herkunftsprache/100}
        text={()=>`${anteil_nicht_deutscher_herkunftsprache}% nicht deutscher Herkunftssprache (20${anteil_nicht_deutscher_herkunftsprache_jahr})`} /><br />
      <BalanceGauge
        ratio={fehlzeiten_unentschuldigt_in_prozent/100}
        text={()=>`${fehlzeiten_unentschuldigt_in_prozent}% unentschuldigte Fehlzeiten (20${fehlzeiten_vertretung_jahr})`} /><br />
      <BalanceGauge
        ratio={vertretung_von_unterricht_in_prozent/100}
        text={()=>`${vertretung_von_unterricht_in_prozent}% vertretener Unterricht (20${fehlzeiten_vertretung_jahr})`} /><br />
      <BalanceGauge
        ratio={ausfall_von_unterricht_in_prozent/100}
        text={()=>`${ausfall_von_unterricht_in_prozent}% ausgefallener Unterricht (20${ausfall_von_unterricht_in_prozent_jahr})`} /><br />
    </div>
  }
}
