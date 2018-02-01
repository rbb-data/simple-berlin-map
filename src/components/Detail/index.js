import { h, Component } from 'preact'
import _ from './styles.sass'

export default class Sidebar extends Component {
  toggleLimitFilter = () => {
    this.context.actions.toggleLimitFilter()
  }

  render (props) {
    const { selectedStation, cityStationsOnlyFilterIsActive, isOnSmallScreen } = props
    const hasStation = selectedStation !== undefined
    const selectedStationProperties = hasStation ? selectedStation.properties : {}

    const className = `${_.sidebar} ${props.class} ${hasStation && _.hasStation}`
    const styles = selectedStation !== undefined &&
      { borderColor: props.colorScale(selectedStation.properties.no2_mean) }

    const {
      station_address: address,
      no2_mean: no2Mean,
      station_ort: burrow,
      quelle: source,
      quartile,
      limitdiff,
      kategorie
    } = selectedStationProperties

    return <div class={className}>
      <div class={_.content} style={styles}>
        <div>
          <div class={_.titleWrapper}>
            <h2 class={_.title}>
              { hasStation
                ? <span>{address} <span class={_.subhead}>{burrow}</span></span>
                : 'Stickstoffdioxide in Berlin'
              }
            </h2>
            { hasStation &&
              <dl class={_.source}>
                <dt>Quelle:</dt>
                <dd>{source}</dd>
              </dl>
            }
          </div>

          { hasStation
            ? <p class={_.infoText}>
              Der Messwert von <strong>{no2Mean} µg/m³</strong> liegt im {quartile} Bereich
              und {limitdiff} dem gesetzlich erlaubten Grenzwert von 40 Mikrogramm
              Stickstoffdioxid pro Kubikmeter Luft.
              Diese Messstation liegt <strong>{kategorie}</strong>.
            </p>
            : <p class={_.helpText}>
              { isOnSmallScreen
                ? 'Klicken Sie auf einen Punkt, '
                : 'Fahren Sie mit der Maus über einzelne Punkte, '
              }
              um die genaue NO₂-Belastung zu sehen.
            </p>
          }
        </div>
      </div>

      <div class={_.controlls}>
        <div class={_.filter} onClick={this.context.actions.toggleCityStationsFilter}>
          <input id='threshold-toggle' type='checkbox' checked={cityStationsOnlyFilterIsActive} />
          <label for='threshold-toggle'>Nur landeseigene Messstellen anzeigen.</label>
        </div>
      </div>
    </div>
  }
}
