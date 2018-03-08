import { h, Component } from 'preact'

import { CircleMarker, Pane } from 'react-leaflet'
import L from 'leaflet'

import { featureToLatLng } from '@shared/lib/geoJsonCompat'
import colors from '@shared/styles/colors.sass'
import _ from './styles.sass'

export default class Markers extends Component {
  constructor (props) {
    super(props)
    this.state = { mapZoom: null }
  }

  handleMarkerSelect = (marker) => (e) => {
    this.context.actions.selectMarker({ marker })
    L.DomEvent.stopPropagation(e)
  }

  handleMarkerDeselect = () => {
    this.context.actions.selectMarker({ marker: null })
  }

  updateMapZoom = () => { this.setState({ mapZoom: this.context.map.getZoom() }) }

  getCircleSize = (zoomLevel) => {
    const zoom = +zoomLevel
    let radius = (zoom * zoom * zoom * zoom) / 3000
    if (radius > 10) radius = 10
    return radius
  }

  buildMarkers = () => this.props.markers.map((marker, i) => {
    const { isTouchEnabled } = this.props
    const isSelected = marker === this.props.selectedMarker
    const radius = this.getCircleSize(this.state.mapZoom)
    const selectHandler = this.handleMarkerSelect(marker)

    const markerProps = {
      key: marker.properties.id,
      className: _.circleMarker,
      onClick: e => {
        if (!isTouchEnabled) return e.originalEvent.preventDefault()
        selectHandler(e)
      },
      onMouseover: e => {
        if (isTouchEnabled) return e.originalEvent.preventDefault()
        selectHandler(e)
      },
      center: featureToLatLng(marker),
      fillOpacity: 1,
      radius: isSelected ? radius + 3 : radius,
      fillColor: colors.red,
      stroke: isSelected || isTouchEnabled,
      weight: isSelected ? 1.5 : 20 - radius,
      color: isSelected ? 'white' : 'transparent',
      pane: !isSelected && 'markerPane'
    }

    return {
      isSelected,
      component: <CircleMarker {...markerProps} />
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
