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

    const className = `${_.sidebar} ${props.class} ${hasMarker && _.hasMarker}`
    const styles = hasMarker &&
      { borderColor: selectedMarker.properties.type === 'Gymnasien'
        ? colors.sGym
        : colors.sInt
      }

    return <div class={className}>
      <div class={_.content} style={styles}>
        { hasMarker
          ? <SchoolInfo properties={selectedMarkerProperties} />
          : <div>
            <h2 class={_.title}>Weiterführende Schulen in Berlin</h2>
            <p class={_.helpText}>
              { isOnSmallScreen
                ? 'Klicken Sie auf einen Punkt, '
                : 'Fahren Sie mit der Maus über einzelne Punkte, '
              }
              Details zu den Schulen angezeigt zu bekommen.
            </p>
          </div>
        }
      </div>
    </div>
  }
}
