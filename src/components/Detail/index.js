import { h, Component } from 'preact'
import _ from './styles.sass'

export default class Detail extends Component {
  render (props) {
    const { selectedMarker, isOnSmallScreen } = props
    const hasMarker = selectedMarker !== null
    const selectedMarkerProperties = hasMarker ? selectedMarker.properties : {}

    const className = `${_.detail} ${props.class} ${hasMarker && _.hasMarker}`

    return <div class={className}>
      { hasMarker
        ? <div>
          <h2 class={_.title}>{selectedMarkerProperties.title}</h2>
          <p class={_.description}>{selectedMarkerProperties.description}</p>
        </div>
        : <p class={_.helpText}>
          { isOnSmallScreen
            ? 'Klicken Sie auf einen Punkt, '
            : 'Fahren Sie mit der Maus über einzelne Punkte, '
          }
          um mehr Informationen angezeigt zu bekommen.
        </p>
      }
    </div>
  }
}
