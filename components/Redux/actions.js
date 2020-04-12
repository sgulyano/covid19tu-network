/**
 * Action Types
 *
 * all action
 */

// Action Types
import actionTypes from './actionTypes'

const updateGraph = graph => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.UPDATE_GRAPH,
    payload: {
      graph: graph,
    },
  })
}

const changeAPI = api => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.CHANGE_API,
    payload: {
      api: api,
    },
  })
}

const updatePatients = patients => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.UPDATE_PATIENTS,
    payload: {
      patients: patients,
    },
  })
}

const selectPatient = patient => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.SELECT_PATIENT,
    payload: patient,
  })
}

const selectEdge = edge => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.SELECT_EDGE,
    payload: edge,
  })
}


const selectFilter = filter => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.SELECT_FILTER,
    payload: {
      filter: filter,
    },
  })
}

const setSearchTerm = term => (dispatch, getState) => {
  dispatch({
    type: actionTypes.SEARCH,
    payload: {
      term,
    },
  })
}

// Export the actions.
export { updateGraph, changeAPI, updatePatients, selectPatient, selectEdge, selectFilter, setSearchTerm }
