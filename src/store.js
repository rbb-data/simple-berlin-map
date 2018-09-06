import breakpoints from '@shared/styles/breakpoints.sass'

export const initialState = {
  markers: [],
  selectedMarkerIndex: 0,
  searchResult: null,
  isOnSmallScreen: true,
  isTouchEnabled: false,
  visibleSchoolType: 'all'
}

export const actions = {
  setMarkers: (state, { markers }) => ({ ...state, markers }),

  selectMarker: (state, { byIndex: index }) => ({ ...state, selectedMarkerIndex: index }),

  setSearchResult: (state, searchResult) => ({ ...state, searchResult }),

  updateScreenType: (state, { screenWidth }) => ({
    ...state,
    isOnSmallScreen: screenWidth <= breakpoints.small
  }),

  storeThatTouchIsEnabled: (state) => ({
    ...state,
    isTouchEnabled: true
  })
}

export default { initialState, actions }
