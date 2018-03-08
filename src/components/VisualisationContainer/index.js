import { h, Component } from 'preact'

import Map from '@components/Map'
import Detail from '@components/Detail'
import TabBar from '@shared/components/TabBar'
import _ from './styles.sass'

// ready, set, GO!
export default class VisualisationContainer extends Component {
  handleSelectSchoolType = ({ selectedValue }) => {
    this.context.actions.setVisibleSchoolType(selectedValue)
  }

  render (props) {
    const tabBarProps = {
      id: 'school-type-filter',
      title: 'nach Schultyp filtern',
      selectedValue: props.visibleSchoolType,
      className: _.schoolTypeFilter,
      options: [
        { value: 'all', display: 'Alle Schultypen' },
        { value: 'Gymnasien', display: 'Gymnasium' },
        { value: 'Integrierte Sekundarschule', display: 'Integrierte Sekundarschule' }
      ]
    }

    return <div class={_.app}>
      <div class={_.mapWithDetail}>
        <Map class={_.map} {...props} />
        <Detail class={_.detail} {...props} />
      </div>
      <TabBar {...tabBarProps} onChange={this.handleSelectSchoolType} />
    </div>
  }
}
