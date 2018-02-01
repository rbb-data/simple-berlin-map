import { h, Component } from 'preact'
import _ from './styles.sass'
import RadioFilter from '@components/RadioFilter'

export default class Detail extends Component {
  handleSelectSchoolType = ({ selectedValue }) => {
    console.log(selectedValue)
    this.context.actions.setVisibleSchoolType(selectedValue)
  }

  render (props) {
    const { selectedMarker, visibleSchoolType } = props
    // const isOnSmallScreen = props.isOnSmallScreen
    const hasMarker = selectedMarker !== null
    const selectedMarkerProperties = hasMarker ? selectedMarker.properties : {}

    const className = `${_.sidebar} ${props.class} ${hasMarker && _.hasMarker}`
    const styles = hasMarker && { borderColor: 'red' }

    const { name } = selectedMarkerProperties

    const radioProps = {
      id: 'school-type-filter',
      title: 'nach Schultyp filtern',
      selectedValue: visibleSchoolType,
      className: _.schoolTypeFilter,
      options: [
        { value: 'all', display: 'Alle Schultypen' },
        { value: 'gymnasium', display: 'Gymnasien' },
        { value: 'integrierte_sekundarschulen', display: 'Integrierte Sekundarschulen' }
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
      </div>

      <div class={_.controlls}>
        <RadioFilter {...radioProps} onChange={this.handleSelectSchoolType} />
      </div>
    </div>
  }
}
