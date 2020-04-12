import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Header from './header'
import EdgeHeader from './edgeheader'
import DataGrid from './datagrid'
import EdgeDataGrid from './edgedatagrid'

const Container = styled.div`
  background-color: #fafafa;
  padding: 15px;
  overflow: auto;
`

const SidePanel = ({ graph, patient, edge, selected }) => {
  if (selected === 'NODE') {
    return (
      <Container>
        {patient ? <Header patient={patient} graph = {graph}/> : null}
        {patient ? <DataGrid {...patient} /> : null}
      </Container>
    )
  } else if (selected === 'EDGE') {
    return (
      <Container>
        {edge ? <EdgeHeader edge={edge} graph = {graph} /> : null}
        {edge ? <EdgeDataGrid {...edge} /> : null}
      </Container>
    )
  } else {
    return null
  }
}

const mapStateToProps = state => {
  const { graph, patient, edge, selected } = state
  return { graph, patient, edge, selected }
}

export default connect(mapStateToProps, null)(SidePanel)
