import breakpoints from '@shared/styles/breakpoints.sass'

export const initialState = {
  markers: [],
  selectedMarker: null,
  searchResult: null,
  isOnSmallScreen: true,
  isTouchEnabled: false,
  visibleSchoolType: 'all'
}

export const actions = {
  setMarkers: (state, { markers }) => ({ ...state, markers }),

  selectMarker: (state, { marker }) => ({ ...state, selectedMarker: marker }),

  setSearchResult: (state, searchResult) => ({ ...state, searchResult }),

  setVisibleSchoolType: (state, visibleSchoolType) => ({ ...state, visibleSchoolType }),

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
