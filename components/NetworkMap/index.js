import React, { useState, useEffect, useRef } from 'react'
import Graph from 'react-graph-vis'
import { connect, useSelector } from 'react-redux'
import { updateGraph, updatePatients, selectPatient, selectEdge } from '../Redux/actions'

import { rowsToGraph, letterToCode, jsonToGraph } from '../../util/parse'
import normalize from '../../util/normalize'
import DatePicker from '../DatePicker'

const NetworkMap = ({
  api,
  graph,
  updateGraph,
  updatePatients,
  selectPatient,
  selectEdge,
  height,
  width,
}) => {

  const graphRef = useRef()
  const [isLoading, setIsLoading] = useState(true)
  const { selected, searchTerm } = useSelector(state => ({
    searchTerm: state.searchTerm,
    selected: state.patient
  }))

  useEffect(() => {
    fetch(api)
      .then(resp => resp.json())
      .then(res => {
        // console.log(res)
        updateGraph(jsonToGraph(res.nodes, res.edges, res.timestamp))
        updatePatients(normalize(res.nodes))
        setIsLoading(false)
      })
    // fetch('https://api.rootnet.in/covid19-in/unofficial/covid19india.org', {
    //   cors: 'no-cors',
    //   method: 'GET',
    //   redirect: 'follow',
    // })
    //   .then(resp => resp.json())
    //   .then(res => {
    //     console.log(res)
    //     updateGraph(rowsToGraph(res.data.rawPatientData))
    //     updatePatients(normalize(res.data.rawPatientData))
    //     setIsLoading(false)
    //   })
      .catch(err => console.log('error', err))
  }, [isLoading, api])

  useEffect(() => {
    // TODO: Figure out a way to make this do-able with patient Id search
    if (graphRef.current && selected && selected.coords) { // Make sure the ref is ready
      const moveParams = {
        position: selected.coords,
        scale: 1.5,
        offset: { x:0, y:0 },
        animation: {
          duration: 500,
          easingFunction: 'easeInCubic'
        }
      }
      graphRef.current.Network.moveTo(moveParams)
    }
  }, [selected])

  useEffect(() => {
    // TODO: Add search by age, district, etc.
    if (graphRef.current && searchTerm) { // Make sure the ref is ready
      try {
        const nodeKey = letterToCode(`P${searchTerm}`)
        const coordsMap = graphRef.current.Network.getPositions([nodeKey])
        graphRef.current.Network.selectNodes([nodeKey])
        selectPatient({ id: nodeKey, coords: coordsMap[nodeKey] })
      } catch (e) {
        // None found. TODO: Add a UI response
      }
    }
  }, [searchTerm])

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: '#000000',
    },
    nodes: {
      chosen: {
        node: (values, id, selected, hovering) => {
          values.color = selected ? '#000' : 'green'
        }
      }
    },
    height: height,
    width: width,
  }

  const events = {
    select: function(event) {
      const selectedNodeId = event.nodes[0]
      const selectedNode = graph.nodes.find(v => v.id === selectedNodeId)
      if (selectedNode) {
        switch (selectedNode.group) {
          case 'Person':
          case 'Location':
          case 'Province':
            // As per the vis.js API, event.pointer.canvas points to the selected node within the canvas
            // which in our case is the patient. Inject this into the update logic.
            selectPatient({ id: selectedNode.id, coords: event.pointer.canvas })
            break
          default:
        }
      } else {
        const selectedEdgeId = event.edges[0]
        const selectedEdge = graph.edges.find(v => v.id === selectedEdgeId)
        if (selectedEdge) {
          selectEdge({ selectedge: selectedEdge, coords: event.pointer.canvas })
        }
      }
    },
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {isLoading ? null : (
        <>
          <Graph ref={graphRef} graph={graph} options={options} events={events} />
          {/* <DatePicker /> */}
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  let { api, graph, searchTerm } = state
  return { api, graph, searchTerm }
}

export default connect(mapStateToProps, {
  updateGraph,
  updatePatients,
  selectPatient,
  selectEdge,
})(NetworkMap)
