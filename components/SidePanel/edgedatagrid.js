import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const Container = styled.div`
  font-size: 16px;
  display: grid;
  grid-row-gap: 10px;
  overflow: auto;
`

const DoubleCell = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
`

const A = styled.a`
  display: inline-block;
  padding-bottom: 10px;
`

function Cell({ name, children }) {
  const CellContainer = styled.div`
    font-family: 'Lato', sans-serif;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #e7e7e7;
    padding: 15px 20px;
  `

  const Name = styled.div`
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 10px;
  `

  return (
    <CellContainer>
      <Name>{name}</Name>
      <div>{children}</div>
    </CellContainer>
  )
}

export default function EdgeDataGrid(edge) {
  const {
    start,
    end,
  } = edge;

  
  return (
    <Container>
      <Cell name="Start At">{start ? start : '-'}</Cell>
      <Cell name="End At">{end ? end : '-'}</Cell>
    </Container>
  )
  
  // const {
  //   notes,
  //   gender,
  //   ageEstimate,
  //   state,
  //   city,
  //   district,
  //   status,
  //   reportedOn,
  //   sources,
  // } = patient;

  // const genderInitCap = gender.charAt(0).toUpperCase() + gender.slice(1);

  // return (
  //   <Container>
  //     <DoubleCell>
  //       <Cell name="Gender">{gender ? genderInitCap : '-'}</Cell>
  //       <Cell name="Age">{ageEstimate ? ageEstimate : '-'}</Cell>
  //     </DoubleCell>
  //     <DoubleCell>
  //       <Cell name="State">{state ? state : '-'}</Cell>
  //       <Cell name="District/City">{city ? city : district}</Cell>
  //     </DoubleCell>
  //     <Cell name="Status">{status}</Cell>
  //     <Cell name="Reported On">{reportedOn}</Cell>
  //     <Cell name="Notes">{notes}</Cell>
  //   </Container>
  // )
}
