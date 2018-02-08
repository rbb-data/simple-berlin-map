import { h, Component } from 'preact'
import _ from './styles.sass'
import SchoolInfo from '@components/SchoolInfo'
import colors from '@shared/styles/colors.sass'

export default class Detail extends Component {
  render (props) {
    const { selectedMarker, isOnSmallScreen } = props
    // const isOnSmallScreen = props.isOnSmallScreen
    const hasMarker = selectedMarker !== null
    const selectedMarkerProperties = hasMarker ? selectedMarker.properties : {}

    const className = `${_.detail} ${props.class} ${hasMarker && _.hasMarker}`
    const styles = hasMarker &&
      { borderColor: selectedMarker.properties.type === 'Gymnasien'
        ? colors.bordeaux
        : colors.blue
      }

    return <div class={className} style={styles}>
      { hasMarker
        ? <SchoolInfo properties={selectedMarkerProperties} />
        : <p class={_.helpText}>
          { isOnSmallScreen
            ? 'Klicken Sie auf einen Punkt, '
            : 'Fahren Sie mit der Maus über einzelne Punkte, '
          }
          um Details zu den Schulen angezeigt zu bekommen.
        </p>
      }
    </div>
  }
}
