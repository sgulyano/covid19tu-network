/**
 * Graph Reducer
 *
 * Creates a Redux reducer for populating the graph.
 */

// Action Types
import actionTypes from './actionTypes'

// Setup initial state with an fleet info object.
const initialState = {
  filter: 'Places',
  selected: null,
  graph: null,
  patients: null,
  searchTerm: '' 
}

// Export the Device Reducer.
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_FILTER: {
      const { filter } = action.payload
      return { ...state, filter: filter }
    }
    case actionTypes.SEARCH: {
      const { term } = action.payload
      return { ...state, searchTerm: term }
    }
    case actionTypes.UPDATE_GRAPH: {
      const { graph } = action.payload
      return { ...state, graph: graph }
    }
    case actionTypes.UPDATE_PATIENTS: {
      const { patients } = action.payload
      return { ...state, patients: patients, patient: patients.byId[0] } // `P1` in code
    }
    case actionTypes.SELECT_PATIENT: {
      const { id, coords } = action.payload
      const { patients } = state
      const existingPatient = patients.byId[id]
      const patient = {
        ...patients.byId[id],
        coords
      }
      return existingPatient ? { ...state, patient, selected:'NODE' } : state
    }
    case actionTypes.SELECT_EDGE: {
      const { selectedge, coords } = action.payload
      const edge = {
        selectedge,
        coords
      }
      return edge ? { ...state, edge, selected:'EDGE' } : state
    }
    default:
      return state
  }
}
