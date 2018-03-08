import { h, Component } from 'preact'

import Map from '@components/Map'
import Detail from '@components/Detail'
import _ from './styles.sass'

// ready, set, GO!
export default class VisualisationContainer extends Component {
  render (props) {
    return <div class={_.app}>
      <Map class={_.map} {...props} />
      <Detail class={_.detail} {...props} />
    </div>
  }
}
