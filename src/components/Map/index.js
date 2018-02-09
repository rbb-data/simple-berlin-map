import { h, Component } from 'preact'

import 'leaflet/dist/leaflet.css'
import { Map as LeafletMap, ZoomControl, GeoJSON, Pane } from 'react-leaflet'
import { BingLayer } from 'react-leaflet-bing'

import Markers from '@components/Markers'
import LineFromLatLngToAbsolutePos from
  '@components/LineFromLatLngToAbsolutePos/LineFromLatLngToAbsolutePos'
import Search from '@components/Search/Search'
import MapLocationMarker from '@shared/components/MapLocationMarker'
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

  handleSearch = (result) => {
    if (!result) {
      this.context.actions.setSearchResult(undefined)
    } else {
      this.mapEl.setView(result.location, 13)
      if (result.components) { // then it is not a geojson search result
        this.context.actions.setSearchResult(result)
      } else {
        this.context.actions.setSearchResult(undefined)
        this.context.actions.selectMarker({marker: result})
      }
    }
  }

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
      maxZoom: 16,
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
      placeholder: 'Schulname oder Adresse...',
      onSelect: result => this.handleSearch(result),
      geojsonSearch: value => feature => (feature.properties.name.search(value) !== -1),
      features: props.markers.filter(marker => props.visibleSchoolType === 'all' ||
        props.visibleSchoolType === marker.properties.type)
    }

    const maskProps = {
      interactive: false,
      fillOpacity: 0.8,
      color: 'white',
      stroke: false
    }

    const lineProps = selectedMarker ? {
      latLng: { lat: selectedMarker.geometry.coordinates[1], lng: selectedMarker.geometry.coordinates[0] },
      position: { bottom: 0, left: 0.5, usePercentValues: true },
      color: selectedMarker.properties.type === 'Gymnasien' ? colors.bordeaux : colors.blue,
      weight: 2
    } : {}

    const markersProps = {
      selectedMarker: selectedMarker,
      isTouchEnabled: isTouchEnabled,
      isOnSmallScreen: isOnSmallScreen,
      markers: props.markers.filter(marker =>
        props.visibleSchoolType === 'all' || props.visibleSchoolType === marker.properties.type)
    }

    return (<div class={props.class}>
      <Search class={c.addressSearch} {...searchProps} />

      <LeafletMap className={c.map} {...mapProps} ref={(mapEl) => this.mapEl = mapEl.leafletElement}>
        <BingLayer type='CanvasGray' bingkey={BING_KEY} />
        <GeoJSON data={berlinMask} {...maskProps} />
        <ZoomControl position='bottomright' />

        <Markers {...markersProps} />
        {/*  markerPane has zIndex: 600; selectedMarkerPane has: 640 and TooltipPane has: 650 */}
        <Pane name='linePane' style={{ zIndex: 620 }}>
          { selectedMarker && <LineFromLatLngToAbsolutePos {...lineProps} /> }
        </Pane>
        <Pane name='locationMarkerPane' style={{ zIndex: 640 }}>
          {/* for some reason rendering this inside the pane is not enough we have to specify it */}
          <MapLocationMarker locationUpdate={searchResult} pane='locationMarkerPane' />
        </Pane>
      </LeafletMap>
    </div>)
  }
}
