import { h, Component } from 'preact'
import _ from './styles.sass'
import RadioFilter from '@components/RadioFilter'
import colors from '@shared/styles/colors.sass'

export default class Detail extends Component {
  handleSelectSchoolType = ({ selectedValue }) => {
    console.log(selectedValue)
    this.context.actions.setVisibleSchoolType(selectedValue)
  }

  render (props) {
    const { selectedMarker, visibleSchoolType, isOnSmallScreen } = props
    // const isOnSmallScreen = props.isOnSmallScreen
    const hasMarker = selectedMarker !== null
    const selectedMarkerProperties = hasMarker ? selectedMarker.properties : {}

    const className = `${_.sidebar} ${props.class} ${hasMarker && _.hasMarker}`
    const styles = hasMarker &&
      { borderColor: selectedMarker.properties.schultyp === 'Gymnasien'
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
        { value: 'Integrierte Sekundarschulen', display: 'Integrierte Sekundarschulen' }
      ]
    }

    return <div class={className}>
      <div class={_.content} style={styles}>
        <div>
          <div class={_.titleWrapper}>
            <h2 class={_.title}>
              { hasMarker ? name : 'Weiterführende Schulen in Berlin' }
            </h2>
          </div>
        </div>

        { hasMarker
          ? 'content goes here' // i think the content here is going to be complex so it might could be its own component
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
