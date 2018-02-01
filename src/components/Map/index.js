import { h, Component } from 'preact'

import 'leaflet/dist/leaflet.css'
import { Map as LeafletMap, ZoomControl, GeoJSON, Pane, Rectangle } from 'react-leaflet'
import { BingLayer } from 'react-leaflet-bing'

import Markers from '@components/Markers'
import LineFromLatLngToAbsolutePos from
  '@components/LineFromLatLngToAbsolutePos/LineFromLatLngToAbsolutePos'
import AddressSearch from '@components/AddressSearch/AddressSearch'
import SearchResultMarker from '@components/SearchResultMarker/SearchResultMarker'
import berlinMask from '@data/berlin.geo.json'
import colors from '@shared/styles/colors.sass'
import c from './styles.sass'

// constants
const BING_KEY = 'AsDTwD6TitCJVtFu4xIeYWq1UQKJq2KMUrj7GpQzRpgt7JDtgMWiI8Ovzw_qkz7F'

export default class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topRightPos: null
    }
  }

  handleSearch = (result) => { this.context.actions.setSearchResult(result) }

  render (props) {
    const {
      selectedMarker,
      isTouchEnabled,
      isOnSmallScreen,
      searchResult
    } = props

    // props used for initial map rendering
    const berlin = {
      center: { lat: 52.5244, lng: 13.4105 },
      bounds: {
        topleft: { lat: 52.69, lng: 13.06 },
        bottomright: { lat: 52.32, lng: 13.79 }
      },
      maxBounds: {
        topleft: { lat: 52.8, lng: 12.9 },
        bottomright: { lat: 52.2, lng: 13.9 }
      }
    }

    const mapProps = {
      animate: true,
      keyboard: false,
      minZoom: 9,
      maxZoom: 14,
      zoomControl: false,
      zoomSnap: false,
      bounds: [
        [berlin.bounds.bottomright.lat, berlin.bounds.bottomright.lng],
        [berlin.bounds.topleft.lat, berlin.bounds.topleft.lng]
      ],
      maxBounds: [
        [berlin.maxBounds.bottomright.lat, berlin.maxBounds.bottomright.lng],
        [berlin.maxBounds.topleft.lat, berlin.maxBounds.topleft.lng]
      ]
    }

    const searchProps = {
      layers: ['address'],
      isOnSmallScreen: isOnSmallScreen,
      onSelect: result => this.handleSearch(result)
    }

    const maskProps = {
      interactive: false,
      fillOpacity: 0.8,
      color: 'white',
      stroke: false
    }

    const lineProps = selectedMarker ? {
      latLng: { lat: selectedMarker.properties.lat, lng: selectedMarker.properties.lng },
      position: { bottom: 0, left: 0.5, usePercentValues: true },
      color: colors.red,
      weight: 2
    } : {}

    const markersProps = {
      selectedMarker: selectedMarker,
      isTouchEnabled: isTouchEnabled,
      isOnSmallScreen: isOnSmallScreen,
      markers: props.markers.filter(marker =>
        props.visibleSchoolType === 'all' || props.visibleSchoolType === marker.schultyp)
    }

    return (<div class={props.class}>
      <AddressSearch class={c.addressSearch} {...searchProps} />

      <LeafletMap className={c.map} {...mapProps}>
        <BingLayer type='CanvasGray' bingkey={BING_KEY} />
        <GeoJSON data={berlinMask} {...maskProps} />
        <ZoomControl position='bottomright' />
        {/* <Rectangle bounds={mapProps.maxBounds} /> */}

        <Markers {...markersProps} />
        <SearchResultMarker searchResult={searchResult} />
        {/*  markerPane has zIndex: 600 and TooltipPane has zIndex: 650 */}
        <Pane name='linePane' style={{ zIndex: 620 }}>
          { selectedMarker && <LineFromLatLngToAbsolutePos {...lineProps} /> }
        </Pane>
      </LeafletMap>
    </div>)
  }
}
