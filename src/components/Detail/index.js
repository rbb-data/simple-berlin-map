import { h, Component } from 'preact'
import _ from './styles.sass'
import RadioFilter from '@components/RadioFilter'
import SchoolInfo from '@components/SchoolInfo'
import colors from '@shared/styles/colors.sass'

export default class Detail extends Component {
  handleSelectSchoolType = ({ selectedValue }) => {
    this.context.actions.setVisibleSchoolType(selectedValue)
  }

  render (props) {
    const { selectedMarker, visibleSchoolType, isOnSmallScreen } = props
    // const isOnSmallScreen = props.isOnSmallScreen
    const hasMarker = selectedMarker !== null
    const selectedMarkerProperties = hasMarker ? selectedMarker.properties : {}

    const className = `${_.sidebar} ${props.class} ${hasMarker && _.hasMarker}`
    const styles = hasMarker &&
      { borderColor: selectedMarker.properties.type === 'Gymnasien'
        ? colors.sGym
        : colors.sInt
      }

    const { name } = selectedMarkerProperties

    const radioProps = {
      id: 'school-type-filter',
      title: 'nach Schultyp filtern',
      selectedValue: visibleSchoolType,
      className: _.schoolTypeFilter,
      options: [
        { value: 'all', display: 'Alle Schultypen' },
        { value: 'Gymnasien', display: 'Gymnasien' },
        { value: 'Integrierte Sekundarschule', display: 'Integrierte Sekundarschulen' }
      ]
    }
    return <div class={className}>
      <div class={_.content} style={styles}>
        <h2 class={_.title}>{ hasMarker ? name : 'Weiterführende Schulen in Berlin' }</h2>

        { hasMarker
          ? <SchoolInfo properties={selectedMarkerProperties} />
          : <p class={_.helpText}>
            { isOnSmallScreen
              ? 'Klicken Sie auf einen Punkt, '
              : 'Fahren Sie mit der Maus über einzelne Punkte, '
            }
            Details zu den Schulen angezeigt zu bekommen.
          </p>
        }
      </div>

      <div class={_.controlls}>
        <RadioFilter {...radioProps} onChange={this.handleSelectSchoolType} />
      </div>
    </div>
  }
}
