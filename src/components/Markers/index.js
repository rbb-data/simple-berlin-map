import { h, Component } from 'preact'

import { Pane } from 'react-leaflet'
import L from 'leaflet'

import { featureToLatLng } from '@shared/lib/geoJsonCompat'
import SelectableMarker from '@shared/components/MapSelectableMarker'

export default class Markers extends Component {
  constructor (props) {
    super(props)
    this.state = { mapZoom: null }
  }

  handleMarkerSelect = (index) => (e) => {
    this.context.actions.selectMarker({ byIndex: index })
    L.DomEvent.stopPropagation(e)
  }

  handleMarkerDeselect = () => {
    this.context.actions.selectMarker({ marker: null })
  }

  updateMapZoom = () => { this.setState({ mapZoom: this.context.map.getZoom() }) }

  buildMarkers = () => this.props.markers.map((marker, i) => {
    const { isTouchEnabled, selectedMarkerIndex } = this.props
    const isSelected = i === selectedMarkerIndex
    const selectHandler = this.handleMarkerSelect(i)

    const markerProps = {
      key: marker.properties.id,
      isSelected: isSelected,
      onClick: e => {
        if (!isTouchEnabled) return e.originalEvent.preventDefault()
        selectHandler(e)
      },
      onMouseover: e => {
        if (isTouchEnabled) return e.originalEvent.preventDefault()
        selectHandler(e)
      },
      position: featureToLatLng(marker),
      pane: isSelected ? 'selectedMarkerPane' : 'markerPane',
      optimizeForTouch: isTouchEnabled
    }

    return {
      isSelected,
      component: <SelectableMarker {...markerProps} />
    }
  })

  componentDidMount () {
    this.updateMapZoom()
    this.context.map.on('zoom', this.updateMapZoom)
    this.context.map.on('click', this.handleMarkerDeselect)
  }

  componentWillUnmount () {
    this.context.map.off('zoom', this.updateMapZoom)
    this.context.map.off('click', this.handleMarkerDeselect)
  }

  render (props) {
    const markers = this.buildMarkers()
    const selectedMarker = (markers.find(marker => marker.isSelected) || {}).component

    return <div>
      { markers.filter(marker => !marker.isSelected).map(marker => marker.component)}
      {/*  linePane has zIndex: 620 and TooltipPane has zIndex: 650 */}
      <Pane name='selectedMarkerPane' style={{ zIndex: 630 }}>{selectedMarker}</Pane>
    </div>
  }
}
