import hash from 'object-hash'
import { state_node } from '../../images'
import _ from 'lodash'
import dotProp from 'dot-prop-immutable'

export const addProvinces = (graph, patients) => {
  let provinces = {}

  for (let patientId in patients) {
    if (patients[patientId].province !== undefined) {
      if (!provinces[hash(patients[patientId].province)]) {
        provinces[hash(patients[patientId].province)] = patients[patientId].province
      }
    }
  }
  
  for (var key in provinces) {
    let node = {
      id: key,
      label: provinces[key],
      size: 40,
      shape: 'image',
      image: state_node,
      group: 'Province',
    }
    
    graph = dotProp.set(graph, 'nodes', list => [...list, node])
  }
  
  for (let patientId in patients) {
    if (patients[patientId].province !== undefined) {
      let edge = {
        from: hash(patients[patientId].province),
        to: patients[patientId].id,
        length: 250,
        dashes: true,
        arrows: {
          to: {
            enabled: false,
          },
        },
        color: { opacity: '0.3' },
      }
      graph = dotProp.set(graph, 'edges', list => [...list, edge])
    }
  }

  return graph
}

export const removeProvinces = (graph, patients) => {
  let provinces = {}
  
  for (let patientId in patients) {
    if (patients[patientId].province !== undefined) {
      if (!provinces[hash(patients[patientId].province)]) {
        provinces[hash(patients[patientId].province)] = patients[patientId].province
      }
    }
  }

  for (var key in provinces) {
    let node = {
      id: key,
      label: provinces[key],
      size: 40,
      shape: 'image',
      image: state_node,
      group: 'Province',
    }
    let index = _.findIndex(dotProp.get(graph, 'nodes'), function(o) {
      return o.id == node.id
    })

    if (index !== -1) {
      graph = dotProp.delete(graph, `nodes.${index}`)
    }
  }

  for (let patientId in patients) {
    if (patients[patientId].province !== undefined) {
      let edge = {
        from: hash(patients[patientId].province),
        to: patients[patientId].id,
        length: 250,
        dashes: true,
        arrows: {
          to: {
            enabled: false,
          },
        },
        color: { opacity: '0.3' },
      }
      let edgeIndex = _.findIndex(graph.edges, function (o) {
        return o.to == edge.to && o.from === edge.from
      })

      graph = dotProp.delete(graph, `edges.${edgeIndex}`)
    }
  }

  return graph
}
