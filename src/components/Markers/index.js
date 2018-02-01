import { h, Component } from 'preact'

import { CircleMarker, Pane } from 'react-leaflet'
import L from 'leaflet'

import { featureToLatLng } from '@shared/lib/geoJsonCompat'
import colors from '@shared/styles/colors.sass'
import c from './styles.sass'

export default class StationsLayer extends Component {
  constructor (props) {
    super(props)
    this.markers = []
    this.state = { mapMinEdge: null, mapZoom: null }
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
    const radius = (zoom * zoom * zoom * zoom) / 3000
    return radius
  }

  buildMarkers = () => this.props.markers.map((marker, i) => {
    const { isTouchEnabled } = this.props
    const isSelected = marker === this.props.selectedMarker
    const radius = this.getCircleSize(this.state.mapZoom)
    const selectHandler = this.handleMarkerSelect(marker)

    const markerProps = {
      key: marker.properties.station_id,
      className: c.circleMarker,
      ref: ref => { this.markers[i] = ref },
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

  componentDidUpdate () {
    // react leaflet does not unbind tooltips when they are removed by react so
    // we have to do it ourselfs

    if (!this.props.isTouchEnabled && !this.props.isOnSmallScreen) return
    this.markers.filter(m => m !== null).forEach(marker => {
      marker.leafletElement.unbindTooltip()
    })
  }

  componentWillUnmount () {
    this.context.map.off('zoom', this.updateMapZoom)
    this.context.map.off('click', this.handleMarkerDeselect)
  }

  render (props) {
    const markers = this.buildMarkers()
    const selectedMarker = (markers.find(marker => marker.isSelected) || {}).component

    return <div ref={ref => { this.container = ref }}>
      { markers.filter(marker => !marker.isSelected).map(marker => marker.component)}
      {/*  linePane has zIndex: 620 and TooltipPane has zIndex: 650 */}
      <Pane name='selectedMarkerPane' style={{ zIndex: 640 }}>{selectedMarker}</Pane>
    </div>
  }
}
