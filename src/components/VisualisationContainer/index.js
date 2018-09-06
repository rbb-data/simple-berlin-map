import { h, Component } from 'preact'

import Map from '@components/Map'
import Detail from '@components/Detail'
import _ from './styles.sass'

// ready, set, GO!
export default class VisualisationContainer extends Component {
  render (props) {
    return <div class={_.app}>
      <Detail class={_.detail} {...props} />
      <Map class={_.map} {...props} />
    </div>
  }
}
