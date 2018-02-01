/* global fetch */

import { h, render, Component } from 'preact'
import Hover from 'hover'
import storeDescriptor from '@root/store.js'

import Map from '@components/Map'
import Sidebar from '@components/Detail'
import c from './styles.sass'

// ready, set, GO!
export default class MapWithDetail extends Component {
  render (props) {
    return <div class={c.app}>
      <Map class={c.map} {...props} />
      <Sidebar className={c.sidebar} {...props} />
    </div>
  }
}
