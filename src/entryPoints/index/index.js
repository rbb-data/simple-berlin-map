/* global fetch */

import { h, render, Component } from 'preact'
import Hover from 'hover'
import storeDescriptor from '@root/store.js'

import VisualisationContainer from '@components/VisualisationContainer'

// ready, set, GO!
class Main extends Component {
  constructor (props) {
    super(props)
    this.store = Hover(storeDescriptor.actions, storeDescriptor.initialState)
    this.state = this.store()
  }

  handleResize = () => {
    this.store.updateScreenType({ screenWidth: window.innerWidth })
  }

  fetchData = async () => {
    const res = await fetch(`./data/markers.geo.json`)
    const stationsCollection = await res.json()
    const markers = stationsCollection.features

    this.store.setMarkers({ markers })
  }

  componentDidMount () {
    // register change listener
    this.unsubscribeFromStore = this.store(state => this.setState(state))
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('touchstart', this.store.storeThatTouchIsEnabled)
    this.handleResize()

    this.fetchData()
  }

  componentWillUnmount () {
    this.unsubscribeFromStore()
    window.removeEventListener('resize', this.handleResize)
  }

  // provide reference to store actions to all child components
  getChildContext () { return { actions: this.store } }

  render (props, state) {
    return <VisualisationContainer {...state} />
  }
}

render(<Main />, document.body)
