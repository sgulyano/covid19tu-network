import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { SearchInput } from '../UI/search-input'
import { setSearchTerm } from '../Redux/actions'

const Container = styled.div`
  font-family: 'Lato', sans-serif;
  user-select: none;
`

const Title = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: #858383;
`

const Dot = styled.div`
  color: #eb5757;
  font-size: 28px;
  transform: translateY(3px);
  display: inline-block;
  font-weight: bold;
`

const PatientContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  height: 10vh;
  padding: 15px;
  padding-left: 0;
  user-select: text;
`
const Name = styled.div`
  display: flex;
  align-items: center;
  font-size: 40px;
`

function EdgeHeader({ edge, graph, setSearchTerm }) {

  const onSearch = (term) => {
    setSearchTerm(term)
  }

  const { selectedge } = edge
  const { timestamp } = graph
  
  return (
    <Container>
      <Title>
        Covid19 TU Tracker <br/>
        Updated at <Dot>&nbsp;&middot;&nbsp;</Dot> {timestamp} <Dot>&nbsp;&middot;&nbsp;</Dot>
      </Title>
      <SearchInput searchTerm={onSearch} />
      <PatientContainer>
        <Name>{selectedge.label}</Name>
      </PatientContainer>
    </Container>
  )
}

export default connect(null, {
  setSearchTerm
})(EdgeHeader)