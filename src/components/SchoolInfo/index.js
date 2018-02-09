import { h, Component } from 'preact'

import BalanceGauge from '@components/BalanceGauge/BalanceGauge.jsx'
import _ from './styles.sass'

export default class SchoolInfo extends Component {
  render (props) {
    const {
      name,
      type,
      legal_status: legalStatus,
      address,
      statistics,
      entryURL
    } = props.properties

    const {
      // 'Nichtdeutsche Herkunftssprache': language,
      // 'Jahrgangsstufen': pupils,
      'Vertretungsunterricht': substitution
      // 'Fehlzeiten': misses
    } = statistics

    return <div class={_.schoolInfo}>
      <div class={_.titleWrapper}>
        <div>
          <h2 class={_.title}>{name}</h2>
          <p class={_.schooltype}>
            {type}
            { legalStatus && <span> {legalStatus}</span> }
          </p>
          <p class={_.address}>
            { address.street && `${address.street}, ${address.postcode} ${address.city}` }
          </p>
        </div>
        <dl class={_.source}>
          <dt>Quelle:</dt>
          <dd><a href={entryURL}>berlin.de</a></dd>
        </dl>
      </div>

      <div class={_.metrics}>
        {/* <dl class={_.metric}>
          <dt>Schülerinnen und Schüler:</dt>
          <dd>{pupils ? pupils.values.Insgesamt : 'n.a.'}</dd>
        </dl> */}
        <dl class={_.metric}>
          <dt>Vetretungsunterricht:</dt>
          <dd>
            { substitution
              ? <BalanceGauge ratio={substitution.values['Vertretung von Unterricht'] / 100}
                text={() => `${substitution.values['Vertretung von Unterricht']}%`} />
              : 'n.a.'
            }
          </dd>
        </dl>
        <dl class={_.metric}>
          <dt>Ausgefallener Unterricht:</dt>
          <dd>
            { substitution
              ? <BalanceGauge ratio={substitution.values['Ausfall von Unterricht'] / 100}
                text={() => `${substitution.values['Ausfall von Unterricht']}%`} />
              : 'n.a.'
            }
          </dd>
        </dl>
        {/* <dl class={_.metric}>
          <dt>Anteil der Schüler, die zu Hause nicht Deutsch sprechen:</dt>
          <dd>
            { language
              ? <BalanceGauge ratio={language.values.Insgesamt / 100}
                text={() => `${language.values.Insgesamt}%`} />
              : 'n.a.'
            }
          </dd>
        </dl> */}
        {/* <dl class={_.metric}>
          <dt>Unentschuldigte Fehlstunden (Quote):</dt>
          <dd>
            { misses
              ? <BalanceGauge ratio={misses.values / 100} text={() => `${misses.values}%`} />
              : 'n.a.'
            }
          </dd>
        </dl> */}
      </div>
    </div>
  }
}
