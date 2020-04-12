// const graph = {
//   nodes: [
//     {
//       id: 1,
//       label: 'Node 1',
//       title: 'node 1 tootip text',
//       shape: 'circularImage',
//       image: 'https://avatars2.githubusercontent.com/u/14039437?v=4',
//     },
//     { id: 2, label: 'Node 2', title: 'node 2 tootip text' },
//     { id: 3, label: 'Node 3', title: 'node 3 tootip text' },
//     { id: 4, label: 'Node 4', title: 'node 4 tootip text' },
//     { id: 5, label: 'Node 5', title: 'node 5 tootip text' },
//     { id: 6, label: 'Node 6', title: 'node 6 tootip text' },
//   ],
//   edges: [
//     { from: 1, to: 2 },
//     { from: 1, to: 3 },
//     { from: 2, to: 4 },
//     { from: 2, to: 5 },
//   ],
// }

// OLD, don't use this schema
// const row = {
//       patientId: 'P' + rawRow['Patient number'],
//       dateAnnounced: rawRow['Date Announced'],
//       ageEstimate: rawRow['Age Bracket'],
//       gender: rawRow['Gender'],
//       city: rawRow['Detected City'],
//       district: rawRow['Detected District'],
//       state: rawRow['Detected State'],
//       status: rawRow['Current Status'],
//       notes: rawRow['Notes'],
//       contractedFrom: rawRow['Contracted from which Patient (Suspected)'],
//       sources: [rawRow['Source_1'], rawRow['Source_2'], rawRow['Source_3']],
//     }

// New schema
// const row = {
//       patientId: parseInt(rawRow['Patient number']), // Change in frontend, used to be 'P' + rawRow['Patient Number']
//       reportedOn: rawRow['Date Announced'],
//       onsetEstimate: '',
//       ageEstimate: rawRow['Age Bracket'],
//       gender: processGender(rawRow['Gender']), // Change in frontend, used to be 'M'/'F'
//       city: rawRow['Detected City'],
//       state: rawRow['Detected State'],
//       district: rawRow['Detected District'],
//       status: rawRow['Current Status'],
//       notes: rawRow['Notes'],
//       contractedFrom: rawRow['Contracted from which Patient (Suspected)'],
//       sources: processSources([
//         rawRow['Source_1'],
//         rawRow['Source_2'],
//         rawRow['Source_3'],
//       ]),
//     }

import {
  male_purple,
  male_red,
  male_orange,
  male_green,
  male_yellow,
  male_blue,
  male_none,
  female_purple,
  female_red,
  female_orange,
  female_green,
  female_yellow,
  female_blue,
  female_none,
  city_node,
} from '../images/index'
import dotProp from 'dot-prop-immutable'

export function letterToCode(str) {
  const letterPos = parseInt(str[0], 36)
  return parseInt(letterPos.toString() + str.substring(1))
}

export function getIcon_json(patient) {
  if (patient.group === 'Person') {
    if (patient.gender === 'ชาย') {
      if (patient.color === 'สีม่วง') {
        return male_purple
      } else if (patient.color === 'สีแดง') {
        return male_red
      } else if (patient.color === 'สีส้ม') {
        return male_orange
      } else if (patient.color === 'สีน้ำเงิน') {
        return male_blue
      } else if (patient.color === 'สีเหลือง') {
        return male_yellow
      } else if (patient.color === 'สีเขียว') {
        return male_green
      } else {
        return male_none
      }
    } else {
      if (patient.color === 'สีม่วง') {
        return female_purple
      } else if (patient.color === 'สีแดง') {
        return female_red
      } else if (patient.color === 'สีส้ม') {
        return female_orange
      } else if (patient.color === 'สีน้ำเงิน') {
        return female_blue
      } else if (patient.color === 'สีเหลือง') {
        return female_yellow
      } else if (patient.color === 'สีเขียว') {
        return female_green
      } else {
        return female_none
      }
    }
  } else {
    return city_node
  }
}

export function getIcon(patient) {
  if (patient.gender === 'male') {
    if (patient.status === 'Recovered') {
      return male_cured
    } else if (patient.status === 'Hospitalized') {
      return male_hosp
    } else if (patient.status === 'Deceased') {
      return male_dead
    } else {
      return male_hosp
    }
  } else if (patient.gender === 'female') {
    if (patient.status === 'Recovered') {
      return female_cured
    } else if (patient.status === 'Hospitalized') {
      return female_hosp
    } else if (patient.status === 'Deceased') {
      return female_dead
    } else {
      return female_hosp
    }
  } else {
    return female_hosp
  }
}

export const codeToLetter = (code) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const codeStr = code.toString()

  const letterPos = parseInt(codeStr[0] + codeStr[1])

  return letters[letterPos - 10] + codeStr.substring(2)
}

export const rowsToGraph = rows => {
  let graph = {
    nodes: [],
    edges: [],
  }

  rows.forEach(row => {
    const patientCode = letterToCode('P' + row.patientId)
    let node = {
      id: patientCode,
      label: 'P' + row.patientId,
      shape: 'image',
      image: getIcon(row),
      group: 'patient'
    }

    graph = dotProp.set(graph, 'nodes', list => [...list, node])

    if (row.contractedFrom) {
      let edge = {
        from: letterToCode(row.contractedFrom),
        to: patientCode,
      }

      graph = dotProp.set(graph, 'edges', list => [...list, edge])
    }
  })
  return graph
}

export const jsonToGraph = (nodes, edges, timestamp) => {
  let graph = {
    nodes: [],
    edges: [],
    timestamp: ''
  }

  nodes.forEach(row => {
    if (row.group == 'Person') {
      let node = {
        id: row.id,
        label: row.label.toString(),
        shape: 'image',
        image: getIcon_json(row),
        group: row.group,
        color: row.color,
        type: row.type,
        age: row.age,
        org: row.org,
        emptype: row.emptype,
        gender: row.gender,
        blood: row.blood,
        ismedstaff: row.ismedstaff,
        bloodres: row.bloodres,
        province: row.province
      }
      graph = dotProp.set(graph, 'nodes', list => [...list, node])
    } else if (row.group == 'Location') {
      let node = {
        id: row.id,
        label: row.label,
        shape: 'image',
        image: getIcon_json(row),
        group: row.group,
        lon: row.lon,
        lat: row.lat,
      }
      graph = dotProp.set(graph, 'nodes', list => [...list, node])
    } else {
      console.error('Unknown group');
    }
    
  })
  
  edges.forEach(row => {
    let edge = {
      from: row.from,
      to: row.to,
      label: row.label,
      start: row.start,
      end: row.end
    }

    graph = dotProp.set(graph, 'edges', list => [...list, edge])
  })

  graph = dotProp.set(graph, 'timestamp', timestamp)
  return graph
}

// console.log(letterToCode('P699999'))
// console.log(codeToLetter(letterToCode('P6')))

// console.log(jsonToGraph(dumpedRows))
